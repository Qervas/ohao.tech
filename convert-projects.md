# Project Conversion Guide

## Converting MDX to Modern Content Collections

This guide helps you convert the remaining MDX files from `projects/en/` to the new Content Collections format.

## 1. Image Migration

First, ensure all images are moved to the correct location:

### Current Structure (old_public):
```
old_public/images/projects/
├── aging_shader/
│   ├── rust_0.png
│   ├── rust_25.png
│   ├── rust_50.png
│   ├── rust_75.png
│   ├── rust_100.png
│   ├── paint_new.png
│   └── ...
├── global_illumination/
│   ├── cpu.png
│   ├── cuda.png
│   └── photon_mapping.png
├── lexibytes/
│   └── Banner.png
├── ai_agents/
│   └── structure.png
└── ...
```

### New Structure (public):
```
public/images/projects/
├── aging-shader/
├── monte-carlo-ray-tracer/
├── lexibytes/
├── ai-agents/
└── ...
```

## 2. Content Collections Template

For each project, create a new `.md` file in `src/content/projects/` with this template:

```markdown
---
title: "Project Title"
description: "Brief description of the project"
publishedAt: 2024-XX-XX
updatedAt: 2025-01-20  # optional
featured: true/false
status: "active" | "completed" | "paused" | "planning"
category: "graphics" | "ai" | "engine" | "research" | "web" | "tools"
technologies: ["Tech1", "Tech2", "Tech3"]
repository: "https://github.com/username/repo"  # optional
demo: "https://demo-url.com"  # optional
paper: "https://paper-url.com"  # optional
coverImage:
  src: "/images/projects/project-slug/main-image.png"
  alt: "Description of the main image"
images:
  - src: "/images/projects/project-slug/image1.png"
    alt: "Description of image 1"
    caption: "Caption for image 1"
  - src: "/images/projects/project-slug/image2.png"
    alt: "Description of image 2"
    caption: "Caption for image 2"
team:
  - name: "Shaoxuan Yin"
    role: "Developer/Researcher"
    avatar: "/images/me_snap.png"
    linkedin: "https://www.linkedin.com/in/shaoxuan-yin"
    github: "https://github.com/Qervas"
highlights:
  - "Key achievement 1"
  - "Key achievement 2"
  - "Key achievement 3"
timeline:
  start: 2024-XX-XX
  end: 2024-XX-XX  # optional
  duration: "X months"  # optional
metrics:
  performance: "40% faster rendering"  # optional
  accuracy: "80% accuracy achieved"  # optional
  citations: 1  # optional
tags: ["tag1", "tag2", "tag3"]
---

# Project Title

Write your project description here in **pure Markdown**.

## Overview

Project overview section...

## Features

- Feature 1
- Feature 2
- Feature 3

## Technical Implementation

Technical details...

## Results

Results and outcomes...
```

## 3. Existing Projects to Convert

Based on your `projects/en/` folder, here are the projects to convert:

### 1. SPH Water Simulation (`SPH_water_simulation.mdx`)
```yaml
title: "SPH Water Simulation"
category: "graphics"
technologies: ["C++", "CUDA", "OpenGL", "SPH", "Physics Simulation"]
status: "completed"
```

### 2. Agent Workflow (`agent_workflow.mdx`)
```yaml
title: "Multi-Agent Workflow System"
category: "ai"
technologies: ["Python", "AI Agents", "Workflow Management"]
status: "active"
```

### 3. Aging Shader (`aging_shader.mdx`)
```yaml
title: "Material Aging with Procedural Methods"
category: "graphics"
technologies: ["OpenGL", "Compute Shaders", "GLSL", "Procedural Generation"]
status: "completed"
```

### 4. LexiBytes (`lexibytes.mdx`)
```yaml
title: "LexiBytes"
category: "web"
technologies: ["Web Development", "UI/UX"]
status: "completed"
```

### 5. Monte Carlo Ray Tracer (`monte-carlo-ray-tracer.mdx`)
```yaml
title: "Path Tracer with Monte Carlo Integration"
category: "graphics"
technologies: ["C++", "CUDA", "Ray Tracing", "Global Illumination"]
status: "completed"
```

### 6. Robot Project (`robot.mdx`)
```yaml
title: "Robotics Project"
category: "research"
technologies: ["Robotics", "Control Systems"]
status: "completed"
```

### 7. Skiing Analysis (`skiing.mdx`)
```yaml
title: "Analysis of Skiing Action via OpenPose"
category: "ai"
technologies: ["Python", "OpenPose", "STGCN", "Computer Vision"]
status: "completed"
```

### 8. Xiangqi AI (`xiangqi_ai.mdx`)
```yaml
title: "Xiangqi AI with Deep Q-Learning"
category: "ai"
technologies: ["C++", "CUDA", "Qt", "DQN", "Game AI"]
status: "completed"
```

## 4. Conversion Steps

For each project:

1. **Create new file**: `src/content/projects/project-slug.md`
2. **Copy frontmatter**: Convert MDX frontmatter to new schema
3. **Update images**: 
   - Move images to `public/images/projects/project-slug/`
   - Update image references in frontmatter
   - Add alt text and captions
4. **Convert content**: Remove MDX components, use pure Markdown
5. **Test**: Check the project builds and displays correctly

## 5. Image Naming Conventions

Use descriptive names for images:
- `hero.png` - Main project image
- `demo.png` - Demonstration screenshot
- `architecture.png` - System architecture diagram
- `result-1.png`, `result-2.png` - Results and outputs
- `before.png`, `after.png` - Comparison images
- `interface.png` - User interface screenshots

## 6. Category Guidelines

- **graphics**: Rendering, shaders, graphics programming
- **ai**: Machine learning, neural networks, AI research
- **engine**: Game engines, frameworks, tools
- **research**: Academic research, papers, experiments
- **web**: Web applications, frontend projects
- **tools**: Utilities, development tools

## 7. Status Guidelines

- **active**: Currently working on
- **completed**: Finished project
- **paused**: Temporarily stopped
- **planning**: In planning phase

## 8. Quick Conversion Command

For bulk operations, you can use this pattern:

1. Copy MDX content
2. Replace MDX components with Markdown
3. Update frontmatter schema
4. Move and rename images
5. Test build: `npm run build`

## 9. Validation

After conversion, run:
```bash
npm run build
```

This will validate all Content Collections schemas and catch any errors.

## 10. Benefits of New System

✅ **Type Safety**: Schema validation catches errors
✅ **Performance**: Build-time optimization
✅ **Maintainability**: Easier to edit and manage
✅ **Future-proof**: Official Astro solution
✅ **SEO**: Better meta tags and structured data
✅ **Images**: Automatic optimization and responsive images
✅ **Developer Experience**: IntelliSense and auto-completion

---

*This system is much more maintainable and performant than the old MDX setup. Each project is now a simple Markdown file with structured metadata.*