# Project Page Features Documentation

This document outlines the enhanced features available for project pages in the Astro content collections system.

## Overview

Your project pages now support three major new features:
1. **PDF Embedding** - Direct in-page PDF viewing
2. **Interactive Diagrams** - Enhanced image viewing with zoom and fullscreen
3. **Anonymous Comments** - GitHub Discussions-based commenting system

## Content Schema Updates

The project content schema has been expanded to support these new features:

### PDF Support

Add PDFs to your project frontmatter:

```yaml
pdfs:
  - src: "/pdf/your-report.pdf"
    title: "Project Technical Report"
    description: "Comprehensive technical documentation"
    type: "report"  # Options: "report", "slides", "paper", "documentation"
  - src: "/pdf/your-slides.pdf"
    title: "Project Presentation"
    description: "Overview slides from conference presentation"
    type: "slides"
```

### Diagram Support

Enhanced image handling with diagram support:

```yaml
images:
  - src: "/images/projects/your-project/diagram.png"
    alt: "System architecture diagram"
    caption: "High-level system overview"
    type: "diagram"  # Options: "image", "diagram"

# Or use dedicated diagrams section
diagrams:
  - src: "/images/projects/your-project/architecture.png"
    alt: "System architecture"
    caption: "Core system components and data flow"
    type: "architecture"  # Options: "architecture", "flowchart", "sequence", "class"
```

## PDF Viewer Features

### Capabilities
- **In-page Embedding**: PDFs display directly in the page
- **Download Option**: Direct download links
- **Fullscreen Mode**: Expandable fullscreen viewing
- **Fallback Support**: Graceful degradation for unsupported browsers
- **Type Indicators**: Visual badges for different document types

### Supported PDF Types
- `report` - Technical reports and documentation
- `slides` - Presentation slides
- `paper` - Research papers and academic publications
- `documentation` - User guides and API documentation

### Usage Tips
- PDFs should be placed in `/public/pdf/` directory
- Optimal file size: Under 10MB for good loading performance
- Recommended height: 600px (configurable per PDF)

## Interactive Diagrams

### Features
- **Zoomable Interface**: Click to zoom in/out
- **Fullscreen Modal**: Click image to open in overlay
- **Zoom Controls**: Dedicated zoom in/out/reset buttons
- **Type Classification**: Visual indicators for diagram types
- **Mobile Optimized**: Touch-friendly controls on mobile devices

### Diagram Types
- `architecture` - System architecture diagrams
- `flowchart` - Process flow diagrams
- `sequence` - Sequence diagrams
- `class` - Class/UML diagrams

### Best Practices
- Use high-resolution images (at least 1920px wide)
- SVG format recommended for crisp scaling
- Include descriptive alt text and captions
- Keep diagrams focused and readable

## Anonymous Comments System

### GitHub Discussions Integration
Comments are powered by GitHub Discussions, providing:
- **Anonymous Viewing**: Anyone can read comments
- **GitHub Authentication**: Users need GitHub account to comment
- **Moderation Tools**: Full GitHub moderation capabilities
- **Threaded Discussions**: Nested reply support
- **Reaction Support**: Emoji reactions on comments

### Configuration
Comments are automatically enabled on all project pages. The system:
- Loads on scroll (performance optimization)
- Provides fallback options if loading fails
- Supports both light and dark themes
- Includes direct contact alternatives

### Fallback Options
If comments fail to load, users can:
- Visit GitHub Discussions directly
- Send email directly to you
- Access project repository for issues

## File Organization

### Recommended Structure
```
public/
├── images/
│   └── projects/
│       └── your-project/
│           ├── screenshot1.png
│           ├── diagram.png
│           └── architecture.svg
├── pdf/
│   ├── your-project-report.pdf
│   └── your-project-slides.pdf
└── ...

src/content/projects/
└── your-project.md
```

### Naming Conventions
- **Images**: Use descriptive names (e.g., `rust_formation_50_percent.png`)
- **PDFs**: Include project name (e.g., `aging_shader_report.pdf`)
- **Diagrams**: Specify type in name (e.g., `system_architecture.png`)

## Performance Considerations

### Optimizations Implemented
- **Lazy Loading**: Images and PDFs load when scrolled into view
- **Progressive Enhancement**: Core content loads first, enhancements after
- **Responsive Images**: Images scale appropriately on different devices
- **Efficient Caching**: Browser caching for static assets

### Recommendations
- Optimize images before uploading (use tools like TinyPNG)
- Keep PDF file sizes reasonable (< 10MB)
- Use WebP format for images when possible
- Compress diagrams while maintaining readability

## Example Implementation

Here's a complete example of a project with all features:

```yaml
---
title: "Advanced Ray Tracer"
description: "Monte Carlo path tracing with CUDA acceleration"
# ... other metadata ...

images:
  - src: "/images/projects/raytracer/output.png"
    alt: "Ray traced scene"
    caption: "Global illumination with caustics"
    type: "image"

diagrams:
  - src: "/images/projects/raytracer/architecture.png"
    alt: "System architecture"
    caption: "CUDA pipeline overview"
    type: "architecture"

pdfs:
  - src: "/pdf/raytracer_report.pdf"
    title: "Technical Implementation Report"
    description: "Detailed analysis of Monte Carlo methods"
    type: "report"
  - src: "/pdf/raytracer_slides.pdf"
    title: "Conference Presentation"
    description: "SIGGRAPH 2024 presentation slides"
    type: "slides"
---
```

## Troubleshooting

### Common Issues

**PDFs not displaying:**
- Verify file exists in `/public/pdf/`
- Check file permissions
- Ensure PDF is not corrupted
- Test in different browsers

**Images not zoomable:**
- Confirm `type: "diagram"` is set
- Check image file exists
- Verify image format is supported

**Comments not loading:**
- Check internet connection
- Verify GitHub repository settings
- Try refreshing the page
- Use fallback contact options

### Browser Support
- **PDF Viewing**: Modern browsers (Chrome 60+, Firefox 60+, Safari 12+)
- **Fullscreen API**: Most modern browsers
- **Comments**: All browsers with JavaScript enabled

## Future Enhancements

Planned improvements include:
- **Video Embedding**: Support for project demo videos
- **Interactive 3D Viewers**: WebGL-based 3D model viewing
- **Live Code Examples**: Embedded code playgrounds
- **Performance Metrics**: Real-time performance dashboards
- **Multiple Comment Providers**: Support for other comment systems

---

For questions or issues with these features, please refer to the main documentation or create an issue in the project repository.