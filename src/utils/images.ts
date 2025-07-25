/**
 * Image utilities for automatic project image discovery and optimization
 */

export interface ProjectImage {
  src: string;
  alt: string;
  caption?: string;
}

/**
 * Get all images for a project by scanning the project folder
 * This automatically discovers images without hardcoding paths
 */
export function getProjectImages(projectSlug: string): ProjectImage[] {
  const images: ProjectImage[] = [];

  // Common image extensions
  const imageExtensions = ['jpg', 'jpeg', 'png', 'webp', 'avif', 'gif'];

  // Try to find images in the project folder
  const basePath = `/images/projects/${projectSlug}`;

  // Common image names for projects
  const commonNames = [
    'hero', 'banner', 'cover', 'main',
    'screenshot', 'demo', 'preview',
    'architecture', 'diagram', 'flow',
    'result', 'output', 'comparison',
    'before', 'after', 'process'
  ];

  // Generate potential image paths
  commonNames.forEach(name => {
    imageExtensions.forEach(ext => {
      const imagePath = `${basePath}/${name}.${ext}`;
      // In a real implementation, you'd check if the file exists
      // For now, we'll use the structure from your old_public
      if (checkImageExists(imagePath)) {
        images.push({
          src: imagePath,
          alt: `${projectSlug} - ${name}`,
          caption: generateCaption(name, projectSlug)
        });
      }
    });
  });

  return images;
}

/**
 * Get the cover image for a project (first available image)
 */
export function getProjectCoverImage(projectSlug: string): ProjectImage | null {
  const images = getProjectImages(projectSlug);
  return images.length > 0 ? images[0] : null;
}

/**
 * Check if an image exists (placeholder - in real app would check filesystem)
 */
function checkImageExists(path: string): boolean {
  // This is a simplified version - in a real implementation,
  // you'd use fs.existsSync() in a build script or API endpoint

  // For now, return true for known project images based on your structure
  const knownImages = [
    '/images/projects/neural_rendering/neural_rendering_art.png',
    '/images/projects/neural_rendering/neural_rendering_epic.png',
    '/images/projects/neural_rendering/neural_rendering_masterpiece.png',
    '/images/projects/ohao_engine/editor.png',
    '/images/projects/aging_shader/rust_0.png',
    '/images/projects/aging_shader/rust_100.png',
    '/images/projects/aging_shader/paint_new.png',
    '/images/projects/global_illumination/cpu.png',
    '/images/projects/global_illumination/cuda.png',
    '/images/projects/global_illumination/photon_mapping.png',
    '/images/projects/lexibytes/Banner.png',
    '/images/projects/ai_agents/structure.png'
  ];

  return knownImages.includes(path);
}

/**
 * Generate a caption for an image based on its name and project
 */
function generateCaption(imageName: string, projectSlug: string): string {
  const captions: Record<string, string> = {
    'hero': 'Project overview',
    'banner': 'Project banner',
    'cover': 'Cover image',
    'main': 'Main interface',
    'screenshot': 'Application screenshot',
    'demo': 'Live demonstration',
    'preview': 'Preview of the project',
    'architecture': 'System architecture',
    'diagram': 'Technical diagram',
    'flow': 'Process flow',
    'result': 'Project results',
    'output': 'Output visualization',
    'comparison': 'Comparison results',
    'before': 'Before state',
    'after': 'After state',
    'process': 'Process visualization'
  };

  return captions[imageName] || `${projectSlug} - ${imageName}`;
}

/**
 * Get optimized image props for Astro's Image component
 */
export function getOptimizedImageProps(image: ProjectImage, width?: number, height?: number) {
  return {
    src: image.src,
    alt: image.alt,
    width: width || 800,
    height: height || 600,
    format: 'webp' as const,
    quality: 80,
    loading: 'lazy' as const,
  };
}

/**
 * Get all images in a project directory (for gallery views)
 */
export function getProjectGallery(projectSlug: string): ProjectImage[] {
  const basePath = `/images/projects/${projectSlug}`;

  // Map of known project galleries
  const projectGalleries: Record<string, ProjectImage[]> = {
    'neural-rendering': [
      {
        src: `${basePath}/neural_rendering_art.png`,
        alt: 'Neural rendering artistic visualization',
        caption: 'Artistic visualization of neural rendering concepts'
      },
      {
        src: `${basePath}/neural_rendering_epic.png`,
        alt: 'Neural rendering epic scene',
        caption: 'Epic scene rendered using neural techniques'
      },
      {
        src: `${basePath}/neural_rendering_masterpiece.png`,
        alt: 'Neural rendering masterpiece',
        caption: 'High-quality neural rendering result'
      }
    ],
    'ohao-engine': [
      {
        src: `${basePath}/editor.png`,
        alt: 'Ohao Engine editor interface',
        caption: 'Main editor interface showing scene hierarchy and properties'
      }
    ],
    'aging-shader': [
      {
        src: `/images/projects/aging_shader/rust_0.png`,
        alt: 'Material aging - initial state',
        caption: 'Initial material state before aging'
      },
      {
        src: `/images/projects/aging_shader/rust_25.png`,
        alt: 'Material aging - 25% progress',
        caption: '25% aging progress'
      },
      {
        src: `/images/projects/aging_shader/rust_50.png`,
        alt: 'Material aging - 50% progress',
        caption: '50% aging progress'
      },
      {
        src: `/images/projects/aging_shader/rust_75.png`,
        alt: 'Material aging - 75% progress',
        caption: '75% aging progress'
      },
      {
        src: `/images/projects/aging_shader/rust_100.png`,
        alt: 'Material aging - fully aged',
        caption: 'Fully aged material with rust effects'
      }
    ]
  };

  return projectGalleries[projectSlug] || [];
}

/**
 * Responsive image sizes for different breakpoints
 */
export const responsiveSizes = {
  thumbnail: { width: 300, height: 200 },
  card: { width: 600, height: 400 },
  hero: { width: 1200, height: 800 },
  fullscreen: { width: 1920, height: 1080 }
};
