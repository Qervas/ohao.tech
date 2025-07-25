---
title: "Path Tracer & Photon Mapping"
description: "Advanced global illumination renderer with path tracing and photon mapping. CUDA-accelerated path tracer for real-time progressive rendering with CPU comparison. Photon mapping includes KD-tree optimization analysis. Complete with comprehensive technical documentation."
publishedAt: 2024-12-08
updatedAt: 2025-01-02
featured: true
status: "completed"
category: "graphics"
technologies: ["C++", "CUDA", "Monte Carlo", "Global Illumination", "Photon Mapping", "KD-Tree", "Path Tracing", "BRDF"]
repository: "https://github.com/Qervas/path_tracer"
demo: "https://www.youtube.com/embed/eOWYABBVrMc"
coverImage:
  src: "/images/projects/global_illumination/cuda.png"
  alt: "CUDA-accelerated path tracer rendering"
images:
  - src: "/images/projects/global_illumination/cuda.png"
    alt: "CUDA path tracer output"
    caption: "Real-time CUDA path tracer achieving 40+ FPS"
    type: "image"
  - src: "/images/projects/global_illumination/cpu.png"
    alt: "CPU path tracer reference"
    caption: "CPU reference implementation for comparison"
    type: "image"
  - src: "/images/projects/global_illumination/photon_mapping.png"
    alt: "Photon mapping global illumination"
    caption: "Two-pass photon mapping with caustics simulation"
    type: "image"
pdfs:
  - src: "/pdf/monte_carlo.pdf"
    title: "Monte Carlo Path Tracer: Technical Deep Dive"
    description: "Comprehensive 39-page technical documentation covering path tracing theory, CUDA implementation, and performance analysis"
    type: "paper"
team:
  - name: "Shaoxuan Yin"
    role: "Graphics Engineer"
    avatar: "/images/me_snap.png"
    linkedin: "https://www.linkedin.com/in/shaoxuan-yin"
    github: "https://github.com/Qervas"
highlights:
  - "CUDA acceleration achieving 40x speedup over CPU implementation"
  - "Monte Carlo integration for solving the rendering equation"
  - "Two-pass photon mapping with KD-tree acceleration"
  - "Progressive accumulation for real-time feedback"
  - "Comprehensive 39-page technical documentation"
  - "Multiple BRDF models and material types"
timeline:
  start: 2024-09-01
  end: 2024-12-08
  duration: "3 months"
metrics:
  performance: "40x CUDA speedup, 40+ FPS at 1080p"
  accuracy: "Physically accurate global illumination"
tags: ["path-tracing", "photon-mapping", "cuda", "global-illumination", "monte-carlo", "brdf", "real-time"]
---

## Overview

A comprehensive study of two major global illumination methods—Monte Carlo Path Tracing and Photon Mapping. This project demonstrates physically-based rendering techniques with both GPU-accelerated and CPU reference implementations, providing detailed performance analysis and theoretical foundations.

The implementation showcases advanced graphics programming techniques including stochastic sampling, importance sampling, and spatial acceleration structures, while maintaining real-time performance through CUDA optimization.

## Demo Video

[![Path Tracer Demo](https://img.youtube.com/vi/eOWYABBVrMc/maxresdefault.jpg)](https://www.youtube.com/watch?v=eOWYABBVrMc)

*Real-time demonstration of CUDA path tracer with progressive accumulation*

## Key Features

### 🚀 **Path Tracer Implementation**
- **Monte Carlo Integration**: Stochastic solution to the rendering equation
- **CUDA Acceleration**: GPU parallel processing for real-time performance
- **Progressive Accumulation**: Real-time feedback with improving quality
- **Multiple BRDFs**: Lambertian, specular, and microfacet models
- **Importance Sampling**: Optimized sampling strategies for faster convergence

### 💫 **Photon Mapping System**
- **Two-Pass Algorithm**: Photon tracing followed by rendering pass
- **KD-Tree Acceleration**: Spatial data structure for efficient photon queries
- **Caustics Simulation**: Accurate simulation of light focusing effects
- **Adaptive Radius**: Dynamic radius estimation for density estimation
- **Russian Roulette**: Probabilistic path termination for efficiency

### ⚡ **Performance Optimization**
- **GPU Memory Management**: Efficient CUDA memory allocation and transfers
- **Parallel Ray Generation**: Massive parallelization of ray computations
- **Optimized Data Structures**: Cache-friendly memory layouts
- **Progressive Rendering**: Real-time visual feedback during computation

## Technical Implementation

### Rendering Equation Solution

The path tracer solves the rendering equation using Monte Carlo integration:

```
L(x,ω) = Le(x,ω) + ∫ L(x',ω') · fr(x,ω',ω) · cos(θ) dω'
```

Where:
- `L(x,ω)` is the radiance at point x in direction ω
- `Le(x,ω)` is the emitted radiance
- `fr(x,ω',ω)` is the BRDF
- The integral represents incoming light from all directions

### Material System Architecture

#### BRDF Models
1. **Lambertian Diffuse**: Perfect diffuse reflection
2. **Perfect Specular**: Mirror-like reflection
3. **Microfacet BRDF**: Physically-based rough surfaces
4. **Fresnel Dielectric**: Glass and transparent materials

#### Light Transport
- **Direct Illumination**: Light source sampling
- **Indirect Illumination**: Global illumination through path tracing
- **Multiple Importance Sampling**: Optimal sampling strategy combination

### CUDA Implementation Details

#### GPU Memory Architecture
```cpp
// Efficient GPU memory layout
struct RayData {
    float3 origin;
    float3 direction;
    float3 color;
    int depth;
};

// Coalesced memory access patterns
__global__ void pathTraceKernel(RayData* rays, Scene* scene, int numRays);
```

#### Parallel Ray Processing
- **Thread Block Organization**: Optimized for GPU architecture
- **Memory Coalescing**: Aligned memory access patterns
- **Divergence Minimization**: Reduced warp divergence through sorting

### Photon Mapping Algorithm

#### Phase 1: Photon Tracing
1. **Photon Emission**: Generate photons from light sources
2. **Path Tracing**: Trace photon paths through the scene
3. **Surface Interactions**: Store photon hits on diffuse surfaces
4. **KD-Tree Construction**: Build spatial acceleration structure

#### Phase 2: Rendering
1. **Camera Ray Generation**: Generate rays from camera
2. **Scene Intersection**: Find closest surface intersection
3. **Photon Gathering**: Query nearby photons using KD-tree
4. **Radiance Estimation**: Estimate radiance using photon density

## Performance Analysis

### GPU vs CPU Comparison

| Metric | CPU Implementation | CUDA Implementation |
|--------|-------------------|-------------------|
| Frame Rate (1080p) | ~1 FPS | 40+ FPS |
| Memory Usage | 1-2 GB | ~400 MB |
| Convergence Time | 30+ seconds | 2-3 seconds |
| Ray Throughput | ~1M rays/sec | ~40M rays/sec |

### Scalability Results
- **1080p**: 40+ FPS sustained performance
- **1440p**: 25+ FPS with maintained quality
- **4K**: 10+ FPS for high-quality renders
- **Memory**: Linear scaling with resolution

## Mathematical Foundations

### Monte Carlo Estimator
The unbiased Monte Carlo estimator for the rendering equation:

```
⟨L⟩ = (1/N) Σ [L(xi) / p(xi)]
```

Where `p(xi)` is the probability density function for sample `xi`.

### Importance Sampling
Optimal sampling reduces variance by sampling proportional to the integrand:

```
∫ f(x) dx ≈ (1/N) Σ [f(xi) / p(xi)]
```

### Russian Roulette
Probabilistic path termination maintains unbiased estimates:

```
P(termination) = 1 - max(ρr, ρg, ρb)
```

## Development Challenges

### Memory Management
- **GPU Memory Limits**: Efficient allocation strategies for large scenes
- **Transfer Optimization**: Minimizing CPU-GPU data transfers
- **Cache Efficiency**: Optimizing memory access patterns

### Numerical Stability
- **Floating Point Precision**: Handling precision issues in ray-surface intersections
- **Sampling Artifacts**: Eliminating noise through improved sampling
- **Convergence Issues**: Ensuring proper Monte Carlo convergence

### Performance Optimization
- **Thread Divergence**: Minimizing warp divergence in CUDA kernels
- **Memory Bandwidth**: Maximizing memory throughput utilization
- **Occupancy**: Optimal thread block configuration

## Technical Documentation

### Comprehensive Technical Paper (39 pages)
Detailed analysis including:
- Mathematical derivations of rendering algorithms
- Implementation details and code examples
- Performance benchmarks and analysis
- Comparison with industry standard renderers
- Future optimization opportunities

## Future Enhancements

### Rendering Improvements
- **Bidirectional Path Tracing**: Enhanced sampling efficiency
- **Metropolis Light Transport**: Better handling of difficult lighting
- **Progressive Photon Mapping**: Reduced memory requirements
- **OptiX Integration**: Hardware ray tracing acceleration

### Performance Optimizations
- **Multi-GPU Support**: Distributed rendering across multiple GPUs
- **Temporal Coherence**: Frame-to-frame optimization for animation
- **Adaptive Sampling**: Intelligent sample distribution
- **Denoising Integration**: AI-based noise reduction

## Academic Impact

This project contributes to the understanding of:
- **Monte Carlo Methods**: Practical implementation of stochastic rendering
- **GPU Computing**: Effective utilization of parallel architecture
- **Global Illumination**: Comprehensive comparison of major techniques
- **Performance Analysis**: Detailed benchmarking of rendering algorithms

## Code Quality & Documentation

- **Modular Design**: Clean separation of concerns
- **Comprehensive Testing**: Unit tests for critical components
- **Performance Profiling**: Detailed timing and memory analysis
- **Documentation**: Extensive comments and technical documentation

---

*After reading this, if you have any cool ideas, I would love to have a quick chat with you, because you're so cool. Thanks for your patience to read this ❤️*