---
title: "Successfully Built OpenCV with CUDA on Fedora"
description: "A step-by-step guide to building OpenCV from source with CUDA, cuDNN, and G-API support"
publishedAt: 2024-10-13
type: "article"
status: "published"
tags: ["opencv", "cuda", "fedora", "computer-vision", "gpu"]
readingTime: 10
coverImage:
  src: "/images/blogs/nvidia_fedora.png"
  alt: "OpenCV CUDA build process on Fedora"
---

Building OpenCV from source with CUDA, cuDNN, and GAPI support on Fedora can be challenging, but the performance gains are worth the effort. Here's my complete journey through the process.

## Problem Overview

Building OpenCV from source can be challenging, especially when integrating additional modules like CUDA, cuDNN, and G-API. This process involves navigating through various dependencies, configuration options, and potential pitfalls.

## Initial Analysis

Initially, I considered using pre-built OpenCV binaries, which offer:

- **Ease of Installation**: Simple package manager commands for quick setup
- **Stability**: Tested versions that work out of the box
- **Limited Features**: Often lack support for advanced capabilities like GPU acceleration

While pre-built binaries seemed promising due to their simplicity, the lack of advanced features and customization options led me to explore building from source.

## Why Build from Source?

Recognizing the limitations of pre-built binaries, I shifted to a more comprehensive approach of building OpenCV from source. This method allows for:

- Full control over included modules and features
- Integration of CUDA and cuDNN for GPU acceleration
- Inclusion of specialized modules like G-API
- Optimized performance for specific hardware

## Step-by-Step Solution

### 1. System Setup

First, install the necessary development tools and dependencies:

```bash
sudo dnf update
sudo dnf install cmake gcc gcc-c++ git libpng-devel libtiff-devel libjpeg-devel ffmpeg-devel gtk3-devel qt5-qtbase-devel python3-devel python3-numpy openblas-devel
```

### 2. Install CUDA and cuDNN

Download and install CUDA and cuDNN:
- CUDA: https://developer.nvidia.com/cuda-downloads
- cuDNN: https://developer.nvidia.com/cudnn

After installation, copy the header and library files:

```bash
# Copy *.h files to /usr/local/cuda/include
# Copy *.so files to /usr/local/cuda/lib64
# Create symbolic links as needed
```

### 3. Clone OpenCV Repositories

```bash
mkdir -p ~/Library/opencv_build
cd ~/Library/opencv_build
git clone https://github.com/opencv/opencv.git
git clone https://github.com/opencv/opencv_contrib.git
```

### 4. Clone ADE for G-API Support

```bash
cd ~/Library/opencv_build/opencv
git clone https://github.com/opencv/ade.git 3rdparty/ade
```

### 5. Configure with CMake

```bash
cd ~/Library/opencv_build/opencv
mkdir build && cd build
cmake -DOPENCV_EXTRA_MODULES_PATH=~/Library/opencv_build/opencv_contrib/modules \
      -DWITH_CUDA=ON \
      -DWITH_CUDNN=ON \
      -DCUDA_ARCH_BIN=9.0 \
      -DWITH_TBB=ON \
      -DBUILD_opencv_world=ON \
      -DBUILD_opencv_python3=ON \
      -DWITH_QT=ON \
      -DWITH_GSTREAMER=ON ..
```

### Pro Tip: Use CMake GUI

A more recommended way is to use CMake GUI to configure the build options:

- Tick all options with "cuda"
- Set `CUDA_ARCH_BIN` to the appropriate value for your GPU
- Cancel options you don't need (e.g., java, js)
- Read all configuration options carefully
- Set `BUILD_opencv_world=ON` to build all modules in one library
- Set module path to include contrib modules
- Download and setup Nvidia Video Codec SDK if needed

### 6. Build and Install

```bash
make -j$(nproc)
sudo make install
sudo ldconfig
```

## Testing the Installation

Verify that OpenCV was built correctly with CUDA support:

```python
import cv2
print(cv2.getBuildInformation())
```

Look for CUDA-related information in the output to confirm GPU acceleration is available.

## Key Learnings

1. **Dependencies Matter**: Ensure all development packages are installed before starting
2. **GPU Architecture**: Set `CUDA_ARCH_BIN` correctly for your specific GPU
3. **CMake GUI**: Much easier than command-line configuration for complex builds
4. **Patience Required**: The build process can take 30+ minutes depending on hardware

## Troubleshooting Tips

- If CUDA isn't detected, check your CUDA installation and PATH variables
- For cuDNN issues, verify the header and library files are in the correct locations
- Memory issues during compilation? Reduce parallel jobs with `make -j4` instead of `make -j$(nproc)`

## Conclusion

This approach effectively builds OpenCV with CUDA and cuDNN on Fedora. While the process requires careful management of dependencies and configuration options, the flexibility and performance gains make it worthwhile for developers seeking optimized OpenCV builds.

The GPU acceleration alone can provide 10-50x performance improvements for computer vision tasks, making this build process an investment that pays dividends in development speed and application performance.

( ͡❛ ͜ʖ ͡❛)