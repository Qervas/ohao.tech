---
title: "Ohao Engine - Modern Vulkan Game Engine"
description: "A modern game engine built with Vulkan, featuring real-time PBR rendering, intuitive scene management, and a robust material system. The engine provides a fully-featured editor with dockable windows, scene hierarchy management, and real-time property editing."
publishedAt: 2024-11-01
updatedAt: 2025-01-20
featured: true
status: "active"
category: "engine"
technologies: ["C++", "Vulkan", "OpenGL", "PBR", "GLSL", "ImGui", "CMake", "Physics Simulation"]
repository: "https://github.com/Qervas/ohao-engine"
coverImage:
  src: "/images/projects/ohao_engine/editor.png"
  alt: "Ohao Engine editor interface"
images:
  - src: "/images/projects/ohao_engine/editor.png"
    alt: "Ohao Engine editor interface"
    caption: "Main editor interface showing scene hierarchy and properties"
    type: "image"
diagrams:
  - title: "Engine Architecture Overview"
    description: "High-level system architecture showing core modules and data flow"
    type: "architecture"
    diagram: |
      graph TB
          A[Application Layer] --> B[Scene Manager]
          A --> C[Input System]
          A --> D[Editor Interface]
          
          B --> E[Entity-Component System]
          B --> F[Transform Hierarchy]
          
          E --> G[Rendering System]
          E --> H[Physics System]
          
          G --> I[Vulkan Backend]
          G --> J[Material System]
          G --> K[Shader Manager]
          
          I --> L[Command Buffers]
          I --> M[Memory Manager]
          I --> N[GPU Resources]
          
          D --> O[ImGui Interface]
          O --> P[Scene Hierarchy]
          O --> Q[Property Editor]
          O --> R[Asset Browser]
          
          style A fill:#e1f5fe
          style G fill:#f3e5f5
          style I fill:#fff3e0
  - title: "Vulkan Rendering Pipeline"
    description: "Detailed rendering pipeline from scene graph to frame presentation"
    type: "flowchart"
    diagram: |
      flowchart TD
          A[Scene Graph Traversal] --> B[Frustum Culling]
          B --> C[Material Batching]
          C --> D[Draw Call Generation]
          
          D --> E[Vertex Buffer Binding]
          E --> F[Index Buffer Binding]
          F --> G[Descriptor Set Binding]
          
          G --> H[Vertex Shader]
          H --> I[Primitive Assembly]
          I --> J[Rasterization]
          J --> K[Fragment Shader]
          
          K --> L[Depth Testing]
          L --> M[Blending]
          M --> N[Framebuffer Output]
          
          N --> O[Swapchain Presentation]
          
          P[Shader Hot-reload] -.-> G
          Q[Memory Management] -.-> E
          Q -.-> F
          
          style H fill:#ffeb3b
          style K fill:#ffeb3b
          style O fill:#4caf50
team:
  - name: "Shaoxuan Yin"
    role: "Engine Developer"
    avatar: "/images/me_snap.png"
    linkedin: "https://www.linkedin.com/in/shaoxuan-yin"
    github: "https://github.com/Qervas"
highlights:
  - "Custom Vulkan rendering pipeline with PBR materials"
  - "Real-time scene editing with ImGui interface"
  - "Advanced shader compilation and management system"
  - "Entity-Component System architecture"
  - "Scene serialization and asset management"
timeline:
  start: 2024-11-01
  duration: "Ongoing hobby project"
metrics:
  performance: "15% runtime efficiency improvement"
tags: ["game-engine", "vulkan", "pbr", "real-time-rendering", "cpp", "editor", "physics"]
---

## Overview

Ohao Engine is a modern game engine built from the ground up using Vulkan API. It demonstrates advanced graphics programming techniques and modern C++ design patterns, featuring a sophisticated rendering pipeline, intuitive scene management, and a fully-featured editor interface.

The engine serves as both a learning project and a foundation for future graphics research, with emphasis on performance, modularity, and ease of use.

## Core Features

### Rendering System
- **Vulkan-based Pipeline**: Modern graphics API for maximum performance and control
- **Physically-Based Rendering**: Complete PBR material system with metallic-roughness workflow
- **Real-time Lighting**: Dynamic lighting with shadow mapping and global illumination techniques
- **Advanced Shaders**: Custom GLSL shader system with hot-reloading capabilities

### Editor Interface
- **ImGui Integration**: Immediate mode GUI for responsive editor experience
- **Scene Hierarchy**: Intuitive tree-view for scene object management
- **Property Editor**: Real-time property editing with immediate visual feedback
- **Dockable Windows**: Flexible workspace customization for different workflows

### Engine Architecture
- **Entity-Component System**: Modular architecture for flexible game object composition
- **Scene Management**: Efficient scene graph with transformation hierarchies
- **Asset Pipeline**: Robust asset loading and management system
- **Serialization**: Complete scene saving/loading with JSON-based format

## Technical Implementation

### Rendering Pipeline Architecture

The engine implements a forward rendering pipeline optimized for real-time performance:

1. **Scene Culling**: Frustum and occlusion culling to reduce draw calls
2. **Material Batching**: Efficient batching of objects by material type
3. **Shader Management**: Dynamic shader compilation with caching system
4. **Resource Management**: Automatic GPU resource lifecycle management

### Material System

The PBR material system supports:
- **Albedo/Diffuse Maps**: Base color and texture information
- **Normal Mapping**: Surface detail enhancement through normal maps
- **Metallic-Roughness**: Industry-standard material property workflow
- **Emission Maps**: Self-illuminating surface support
- **Custom Properties**: Extensible material property system

### Physics Integration

Currently implementing:
- **Rigid Body Dynamics**: Basic collision detection and response
- **Collision Shapes**: Support for primitive and mesh colliders
- **Physics Materials**: Friction, restitution, and density properties
- **Constraints**: Joint and constraint system for complex interactions

## Development Progress

### Completed Features ✅
- Vulkan rendering foundation and command buffer management
- Basic PBR shader implementation with standard material properties
- ImGui editor interface with scene hierarchy and property panels
- Model loading system supporting popular 3D formats
- Basic scene graph with transformation system
- Shader hot-reloading for rapid iteration

### In Development 🚧
- Advanced lighting system with multiple light types
- Shadow mapping implementation for directional and point lights
- Physics integration with rigid body dynamics
- Enhanced material editor with visual shader graph
- Performance profiling and optimization tools

### Planned Features 📋
- **Advanced BRDF Models**: Cook-Torrance, Oren-Nayar, and custom BRDF implementations
- **Global Illumination**: Real-time GI using probe-based techniques
- **Post-Processing Pipeline**: HDR, tone mapping, bloom, and screen-space effects
- **Animation System**: Skeletal animation and timeline-based animation tools
- **Asset Browser**: Visual asset management with preview capabilities

## Technical Challenges & Solutions

### Memory Management
- **Challenge**: Efficient GPU memory allocation and deallocation
- **Solution**: Custom memory allocator with pooling and defragmentation

### Shader Complexity
- **Challenge**: Managing complex shader variants and compilation
- **Solution**: Preprocessor-based shader variant system with dependency tracking

### Editor Performance
- **Challenge**: Maintaining real-time performance while editing large scenes
- **Solution**: Incremental updates and background processing for non-critical operations

## Performance Characteristics

- **Rendering**: 60+ FPS on modern hardware with complex scenes
- **Memory**: Efficient GPU memory usage with automatic resource management
- **Loading**: Fast asset loading with asynchronous processing
- **Editor**: Responsive UI updates with minimal frame drops during editing

## Learning Outcomes

This project has provided deep insights into:
- **Modern Graphics APIs**: Vulkan's explicit control and performance characteristics
- **Engine Architecture**: Scalable system design for complex interactive applications
- **Performance Optimization**: GPU profiling, bottleneck identification, and optimization techniques
- **Tool Development**: Creating user-friendly interfaces for technical workflows

## Future Directions

The engine is being developed with several research directions in mind:
- Integration with neural rendering techniques from my thesis research
- Exploration of real-time ray tracing capabilities
- Investigation of procedural content generation
- Development of domain-specific tools for graphics research

## Open Source Contribution

The engine is developed as an open-source project to:
- Share knowledge and techniques with the graphics programming community
- Provide a foundation for other researchers and developers
- Demonstrate practical implementation of graphics concepts
- Foster collaboration on advanced rendering techniques

---

*Ohao Engine represents a comprehensive exploration of modern game engine development, combining theoretical knowledge with practical implementation to create a robust foundation for graphics research and development.*