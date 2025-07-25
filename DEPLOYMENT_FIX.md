# Vercel Deployment Fix for Content Collections

## Problem Summary
The Astro content collections were working locally but not displaying on Vercel due to configuration issues with static vs server-side rendering.

## Root Cause
1. **Mixed Configuration**: Using `output: "static"` with Vercel adapter but trying to use server-side patterns
2. **Prerender Conflicts**: Dynamic routes had `prerender: true` which conflicts with server-side rendering
3. **Import Issues**: Using deprecated Vercel adapter import

## Solution Applied

### 1. Updated Astro Configuration (`astro.config.mjs`)
```javascript
// Changed from static to server output
output: "server",
adapter: vercel({
  webAnalytics: { enabled: true },
}),

// Fixed deprecated import
import vercel from "@astrojs/vercel"; // was "@astrojs/vercel/serverless"
```

### 2. Removed Prerender Directives
Updated all dynamic route files to use server-side rendering:
- `/src/pages/articles/[...slug].astro`
- `/src/pages/projects/[...slug].astro` 
- `/src/pages/sessions/[...slug].astro`

**Before:**
```javascript
export const prerender = true;
export async function getStaticPaths() { ... }
const { article } = Astro.props;
```

**After:**
```javascript
const { slug } = Astro.params;
const articles = await getCollection('articles');
const article = articles.find((article) => article.slug === slug);
if (!article) return Astro.redirect('/404');
```

### 3. Cleaned Up Index Page (`src/pages/index.astro`)
- Removed hardcoded fallback data
- Restored proper content collection usage:
```javascript
const allProjects = await getCollection('projects');
const allArticles = await getCollection('articles', ({ data }) => {
  return data.status === 'published';
});
```

### 4. Updated Vercel Configuration (`vercel.json`)
```json
{
  "framework": "astro",
  "buildCommand": "npm run build",
  "installCommand": "npm install",
  "devCommand": "npm run dev",
  "regions": ["arn1"],
  "functions": {
    "src/pages/**/*.astro": {
      "runtime": "nodejs18.x"
    }
  }
}
```

### 5. Cleaned .vercelignore
Ensured content files are not excluded from deployment.

## Results
- Build completes successfully with no content collection errors
- Content collections now work properly in serverless environment
- All project, article, and session pages should display correctly on Vercel

## Next Steps
1. Commit and push changes to GitHub
2. Redeploy on Vercel (automatic if connected to GitHub)
3. Verify content displays correctly on production
4. Monitor Vercel function logs for any remaining issues

## Additional Image Fix
After fixing the content collections, discovered that images weren't displaying properly due to CSS issues:
- Changed `object-cover` to `object-contain` for better SVG support
- Replaced aspect ratio classes with fixed heights for more predictable rendering
- Added background colors to improve image visibility

## Key Learnings
- Astro content collections require server-side rendering for dynamic content on Vercel
- Static generation with content collections has limitations in serverless environments
- Prerender directives must be removed when using server output mode
- Fallback patterns are not the right solution - fix the root configuration instead
- SVG images work better with `object-contain` than `object-cover`
- Fixed aspect ratios can cause display issues - fixed heights are more reliable

## File Changes Made
- `astro.config.mjs` - Updated output mode and adapter
- `src/pages/index.astro` - Removed fallbacks, restored content collections
- `src/pages/articles/[...slug].astro` - Converted to server-side rendering
- `src/pages/projects/[...slug].astro` - Converted to server-side rendering  
- `src/pages/sessions/[...slug].astro` - Converted to server-side rendering
- `src/pages/projects/index.astro` - Fixed image display with object-contain
- `src/pages/articles/index.astro` - Fixed image display with object-contain
- `src/pages/sessions/index.astro` - Fixed image display with object-contain
- `vercel.json` - Updated for serverless functions
- `.vercelignore` - Cleaned up content exclusions