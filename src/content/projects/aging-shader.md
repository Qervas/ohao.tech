---
title: "Real-time Physical Material Aging and Weathering Simulation"
description: "A real-time graphics project demonstrating advanced material aging and weathering effects using OpenGL compute shaders. Features dynamic rust formation, paint degradation, and environmental interactions with physically-based rendering."
publishedAt: 2025-01-27
featured: true
status: "completed"
category: "graphics"
technologies: ["OpenGL", "Compute Shaders", "GLSL", "C++", "PBR", "Procedural Generation", "Material Systems"]
repository: "https://github.com/Qervas/aging_shader"
coverImage:
  src: "/images/projects/aging_shader/rust_50.png"
  alt: "Material aging simulation showing 50% rust formation"
images:
  - src: "/images/projects/aging_shader/rust_0.png"
    alt: "Initial state of metal sphere"
    caption: "Fresh metal surface before aging process"
    type: "image"
  - src: "/images/projects/aging_shader/rust_25.png"
    alt: "25% rust formation"
    caption: "Early stages of rust formation"
    type: "image"
  - src: "/images/projects/aging_shader/rust_50.png"
    alt: "50% rust formation"
    caption: "Moderate rust development"
    type: "image"
  - src: "/images/projects/aging_shader/rust_75.png"
    alt: "75% rust formation"
    caption: "Advanced rust formation"
    type: "image"
  - src: "/images/projects/aging_shader/rust_100.png"
    alt: "Fully rusted sphere"
    caption: "Complete material degradation"
    type: "image"
  - src: "/images/projects/aging_shader/paint_new.png"
    alt: "Fresh painting"
    caption: "Pristine painted surface"
    type: "image"
  - src: "/images/projects/aging_shader/paint_2.png"
    alt: "Early deterioration"
    caption: "Initial paint aging effects"
    type: "image"
  - src: "/images/projects/aging_shader/paint_3.png"
    alt: "Progressive aging"
    caption: "Noticeable paint degradation"
    type: "image"
  - src: "/images/projects/aging_shader/paint_4.png"
    alt: "Advanced degradation"
    caption: "Severe paint deterioration"
    type: "image"
  - src: "/images/projects/aging_shader/paint_5.png"
    alt: "Severe aging and deterioration"
    caption: "Extreme paint degradation"
    type: "image"
  - src: "/images/projects/aging_shader/puddle_dry.png"
    alt: "Dry terrain"
    caption: "Dry ground surface"
    type: "image"
  - src: "/images/projects/aging_shader/puddle_partial.png"
    alt: "Partial puddle formation"
    caption: "Beginning of puddle formation"
    type: "image"
  - src: "/images/projects/aging_shader/puddle_wet.png"
    alt: "Full puddle formation"
    caption: "Complete water accumulation"
    type: "image"
  - src: "/images/projects/aging_shader/sky_0.png"
    alt: "Clear night sky"
    caption: "Clear atmospheric conditions"
    type: "image"
  - src: "/images/projects/aging_shader/sky_1.png"
    alt: "Partial cloud coverage"
    caption: "Developing cloud coverage"
    type: "image"
  - src: "/images/projects/aging_shader/sky_2.png"
    alt: "Heavy cloud coverage"
    caption: "Dense atmospheric conditions"
    type: "image"
pdfs:
  - src: "/pdf/aging_shader_report.pdf"
    title: "Material Aging and Weathering Simulation Report"
    description: "Comprehensive technical report covering the implementation of real-time aging and weathering effects using compute shaders"
    type: "report"
  - src: "/pdf/aging_shader_slides.pdf"
    title: "Aging Shader Presentation"
    description: "Project presentation slides demonstrating the visual effects and technical implementation"
    type: "slides"
team:
  - name: "Shaoxuan Yin"
    role: "Graphics Engineer"
    avatar: "/images/me_snap.png"
    linkedin: "https://www.linkedin.com/in/shaoxuan-yin"
    github: "https://github.com/Qervas"
highlights:
  - "Real-time material aging using OpenGL compute shaders"
  - "Dynamic rust formation with multi-scale noise functions"
  - "Progressive paint degradation with physically-based properties"
  - "Environmental weathering system with moisture interactions"
  - "Procedural cloud generation and dynamic lighting"
  - "Real-time puddle formation and water accumulation"
timeline:
  start: 2024-12-01
  end: 2025-01-27
  duration: "2 months"
metrics:
  performance: "60+ FPS real-time rendering"
tags: ["material-aging", "compute-shaders", "opengl", "pbr", "procedural", "weathering", "real-time"]
---

## Overview

Initially planned as part of my [Vulkan engine project](./ohao-engine), this real-time material aging simulation was eventually implemented using OpenGL compute shaders due to development challenges. The project demonstrates sophisticated material aging effects including rust formation, paint degradation, and environmental weathering with real-time performance.

This project showcases advanced graphics programming techniques and physically-based material evolution, pushing the boundaries of real-time rendering for interactive applications.

## Key Features

### 🦠 **Rust Formation Process**
- **Multi-scale Noise Functions**: Complex rust patterns using layered noise
- **Edge-aware Weathering**: Realistic weathering along geometric edges
- **Moisture-influenced Oxidation**: Environmental moisture affects rust development
- **Dynamic Normal Mapping**: Real-time generation of surface detail

### 🎨 **Paint Aging System**
- **Progressive Color Fading**: Realistic color degradation over time
- **Dynamic Crack Formation**: Procedural crack generation in paint layers
- **Paint Peeling Effects**: Physically-based paint removal simulation
- **Material Property Evolution**: Dynamic changes in surface properties

### 🌦️ **Dynamic Weather System**
- **Procedural Cloud Generation**: Real-time atmospheric simulation
- **Dynamic Lighting Conditions**: Weather-responsive illumination
- **Moisture-based Effects**: Environmental humidity affecting materials
- **Real-time Weather Transitions**: Smooth atmospheric changes

### 💧 **Ground System & Puddle Formation**
- **Procedural Crater Generation**: Dynamic terrain feature creation
- **Dynamic Puddle System**: Real-time water accumulation simulation
- **Ripple Effects**: Interactive water surface dynamics
- **Weather-responsive Surfaces**: Terrain adapting to environmental conditions

## Technical Implementation

### System Architecture

The aging shader system uses a modular approach with separate compute shaders for different aging effects:

1. **Material Aging Compute Shader**: Handles rust formation and paint degradation
2. **Weather System**: Manages atmospheric conditions and moisture levels
3. **Surface Interaction**: Processes environmental effects on materials
4. **Rendering Pipeline**: Integrates aged materials with PBR workflow

### Core Algorithms

#### Rust Formation Algorithm
```glsl
// Multi-octave noise for realistic rust patterns
float rustNoise = 0.0;
for(int i = 0; i < OCTAVES; i++) {
    rustNoise += noise(uv * pow(2.0, i)) / pow(2.0, i);
}

// Edge detection for preferential rusting
float edgeFactor = length(fwidth(normal));
float rustProbability = rustNoise * edgeFactor * moistureLevel;
```

#### Paint Degradation System
```glsl
// Progressive color fading based on UV exposure and time
vec3 fadedColor = originalColor * (1.0 - fadeAmount);
fadedColor = mix(fadedColor, yellowTint, yellowingFactor);

// Crack formation using Voronoi patterns
float crackPattern = voronoi(uv * crackScale);
float crackMask = smoothstep(crackThreshold, crackThreshold + crackSoftness, crackPattern);
```

## Development Journey

The project began as part of my larger Vulkan engine initiative ([Ohao Engine](./ohao-engine)), but challenges with memory management and buffer synchronization led to a strategic pivot. Switching to OpenGL Compute Shaders proved beneficial, allowing faster development cycles while maintaining the core vision of real-time material aging simulation.

### Challenges Overcome
- **Memory Management**: Efficient GPU buffer handling for large texture arrays
- **Synchronization**: Proper compute shader synchronization with rendering pipeline
- **Performance Optimization**: Maintaining 60+ FPS with complex aging calculations
- **Visual Quality**: Balancing realism with real-time performance constraints

## Interactive Controls

- **WASD**: Camera movement
- **Mouse**: Look around
- **Space**: Jump/Fly up
- **R/F**: Adjust rust level and aging progression
- **M/N**: Control environmental moisture level
- **1-5**: Switch between different material presets
- **Tab**: Toggle debug information display

## Performance Analysis

- **Frame Rate**: 60+ FPS at 1080p resolution
- **GPU Memory**: ~200MB texture memory usage
- **Compute Performance**: Sub-millisecond aging calculations
- **Scalability**: Supports up to 4K textures with maintained performance

## Future Enhancements

- **Vulkan Implementation**: Migration to Vulkan for better performance control
- **Advanced Material Types**: Support for additional aging materials (wood, fabric, etc.)
- **Temporal Coherence**: Frame-to-frame consistency improvements
- **Multi-layer Aging**: Complex material layer interactions
- **Environmental Simulation**: More sophisticated weather patterns

## Academic Context

This project was developed as part of the TNM084 course at Linköping University, focusing on advanced real-time graphics techniques. The work demonstrates practical application of compute shaders for complex material simulation in interactive environments.

**Special Thanks**: Björn for the compute shader suggestion and Ingemar for guidance during the development pivot from Vulkan to OpenGL.

---

*This project represents a successful fusion of theoretical graphics knowledge with practical real-time implementation, showcasing the potential of compute shaders for complex material simulation in interactive applications.*