---
title: "Chinese Chess AI with Deep Q-Learning"
description: "A CUDA-accelerated Chinese Chess (Xiangqi) AI using Deep Q-Networks for reinforcement learning. Features self-play training, multiple game modes, and real-time visualization of training progress. Demonstrates significant speedup using GPU acceleration for neural network computations."
publishedAt: 2024-12-20
featured: true
status: "completed"
category: "ai"
technologies: ["C++", "CUDA", "Qt", "DQN", "Deep Learning", "Game AI", "Neural Networks", "Reinforcement Learning"]
repository: "https://github.com/Qervas/cn_chess_ai"
coverImage:
  src: "/images/projects/xiangqi/board_AI.png"
  alt: "Interactive Chinese Chess board with AI opponent"
images:
  - src: "/images/projects/xiangqi/board_AI.png"
    alt: "Interactive Chinese Chess board with AI opponent"
    caption: "Main game interface with AI opponent visualization"
    type: "image"
  - src: "/images/projects/xiangqi/train.png"
    alt: "Training visualization dashboard"
    caption: "Real-time training progress and performance metrics"
    type: "image"
  - src: "/images/projects/xiangqi/system.png"
    alt: "System architecture diagram"
    caption: "DQN architecture and training pipeline overview"
    type: "diagram"
pdfs:
  - src: "/pdf/xiangqi_ai.pdf"
    title: "Chinese Chess AI Implementation Report"
    description: "Technical documentation covering Deep Q-Network implementation, CUDA acceleration, and training methodologies"
    type: "report"
team:
  - name: "Shaoxuan Yin"
    role: "AI Engineer"
    avatar: "/images/me_snap.png"
    linkedin: "https://www.linkedin.com/in/shaoxuan-yin"
    github: "https://github.com/Qervas"
highlights:
  - "Deep Q-Network implementation from scratch without deep learning libraries"
  - "CUDA acceleration for neural network computations"
  - "Self-play training mechanism with experience replay"
  - "65% win rate against random opponent after 1000 games"
  - "Real-time training visualization and performance tracking"
  - "Complete game logic implementation with Qt GUI"
timeline:
  start: 2024-09-01
  end: 2024-12-20
  duration: "3.5 months"
metrics:
  performance: "CUDA acceleration for neural network training"
  accuracy: "65% win rate against random opponent"
  users: "Single-player with AI training capabilities"
documents:
  - title: "Chinese Chess AI: Deep Q-Learning Implementation"
    url: "/pdf/xiangqi_ai.pdf"
    pages: 7
    date: "2025-01-15"
    type: "paper"
tags: ["chinese-chess", "dqn", "cuda", "game-ai", "reinforcement-learning", "neural-networks", "self-play"]
---

## Overview

An implementation of Chinese Chess (Xiangqi) AI using Deep Q-Learning Networks (DQN) with CUDA acceleration. This project demonstrates the application of reinforcement learning to traditional board games, featuring a complete game implementation with intelligent AI opponents and comprehensive training visualization.

The project showcases advanced AI techniques including experience replay, target networks, and self-play training, all implemented from scratch to provide deep understanding of the underlying algorithms.

## Key Features

### 🧠 **Deep Q-Network Implementation**
- **From-Scratch Neural Network**: Custom implementation without external deep learning libraries
- **CUDA Acceleration**: GPU-accelerated matrix operations for training speedup
- **Experience Replay**: Stable learning through experience buffer
- **Target Network**: Separate target network for Q-learning stability
- **Epsilon-Greedy Policy**: Balanced exploration and exploitation strategy

### 🎮 **Game Implementation**
- **Complete Xiangqi Rules**: Full Chinese Chess rule implementation
- **Multiple Game Modes**: Human vs Human, Human vs AI, AI vs AI
- **Interactive GUI**: Qt-based interface with intuitive controls
- **Move Validation**: Complete legal move checking and game state management
- **Visual Feedback**: Real-time board state and move highlighting

### 📊 **Training & Visualization**
- **Self-Play Training**: AI learns through playing against itself
- **Progress Tracking**: Real-time win rate and training metrics
- **Performance Visualization**: Graphs and charts for training analysis
- **Model Persistence**: Save and load trained AI models
- **Training Configuration**: Adjustable hyperparameters and training settings

## Technical Implementation

### DQN Architecture

The Deep Q-Network uses a fully connected architecture optimized for board game state representation:

```cpp
// Network Architecture
Input Layer:    90 neurons (9x10 board representation)
Hidden Layer:   128 neurons with ReLU activation
Output Layer:   8100 neurons (possible moves)
```

### State Representation

The board state is encoded as a 90-dimensional vector representing the 9x10 Xiangqi board:
- Each position contains piece type and color information
- Empty squares represented as zero values
- Efficient encoding for neural network processing

### Training Algorithm

#### Experience Replay Buffer
```cpp
struct Experience {
    BoardState state;
    int action;
    float reward;
    BoardState next_state;
    bool done;
};

class ReplayBuffer {
    std::vector<Experience> buffer;
    int capacity = 10000;
    int position = 0;
    
    void store(Experience exp);
    std::vector<Experience> sample(int batch_size);
};
```

#### Q-Learning Update Rule
```cpp
// Bellman equation for Q-value updates
Q(s,a) = Q(s,a) + α[r + γ * max(Q(s',a')) - Q(s,a)]
```

### CUDA Acceleration

#### Matrix Operations
- **Forward Pass**: Parallel matrix multiplication for inference
- **Backward Pass**: Gradient computation using CUDA kernels
- **Memory Management**: Efficient GPU memory allocation and transfers

#### Performance Optimizations
- **Batch Processing**: Process multiple experiences simultaneously
- **Memory Coalescing**: Optimized memory access patterns
- **Kernel Optimization**: Tuned thread block configurations

## Training Methodology

### Self-Play Training
1. **Game Generation**: AI plays against itself to generate experiences
2. **Experience Storage**: Store state-action-reward transitions
3. **Batch Training**: Train network on random experience batches
4. **Performance Evaluation**: Test against baseline opponents
5. **Model Updates**: Update target network periodically

### Reward System
- **Win**: +1.0 reward for winning the game
- **Loss**: -1.0 reward for losing the game
- **Draw**: 0.0 reward for drawn games
- **Move Penalty**: Small negative reward to encourage faster wins

### Training Hyperparameters
- **Learning Rate**: 0.001 with decay schedule
- **Epsilon**: 0.9 → 0.1 over 1000 episodes
- **Batch Size**: 32 experiences per update
- **Target Update**: Every 100 episodes
- **Replay Buffer**: 10,000 experience capacity

## Performance Analysis

### Training Progress
- **Initial Performance**: ~20% win rate against random player
- **After 500 Games**: ~50% win rate
- **After 1000 Games**: ~65% win rate
- **Convergence**: Stable performance around 65-70% win rate

### Computational Performance
- **CPU Training**: ~2 seconds per episode
- **CUDA Training**: ~0.5 seconds per episode (4x speedup)
- **Memory Usage**: ~200MB for network and replay buffer
- **Training Time**: ~2 hours for 1000 episodes on GPU

### Game Performance Metrics
- **Average Game Length**: 45-60 moves
- **Decision Time**: <100ms per move
- **Memory Footprint**: Minimal during inference
- **Scalability**: Supports larger network architectures

## Technical Challenges & Solutions

### Challenge: State Space Complexity
**Problem**: Xiangqi has approximately 10^48 possible positions
**Solution**: Efficient state representation and experience replay to sample important positions

### Challenge: Sparse Rewards
**Problem**: Rewards only at game end make learning difficult
**Solution**: Implemented move penalties and intermediate rewards for piece captures

### Challenge: CUDA Memory Management
**Problem**: Efficient GPU memory allocation for training
**Solution**: Custom memory pools and optimized data transfer patterns

### Challenge: Training Stability
**Problem**: Q-learning can be unstable with function approximation
**Solution**: Target networks, experience replay, and careful hyperparameter tuning

## Development Journey

### Phase 1: Game Engine (Month 1)
- Implemented complete Xiangqi rules and game logic
- Created Qt-based user interface
- Developed move validation and game state management

### Phase 2: AI Foundation (Month 2)
- Built neural network from scratch in C++
- Implemented basic Q-learning algorithm
- Created training infrastructure and data structures

### Phase 3: CUDA Optimization (Month 3)
- Ported neural network operations to CUDA
- Optimized memory management and kernel performance
- Achieved significant training speedup

### Phase 4: Training & Evaluation (Month 4)
- Conducted extensive training experiments
- Implemented performance tracking and visualization
- Fine-tuned hyperparameters for optimal performance

## Future Enhancements

### Algorithm Improvements
- **Monte Carlo Tree Search**: Combine DQN with MCTS for stronger play
- **Alpha-Beta Pruning**: Traditional game tree search for comparison
- **Policy Gradient Methods**: Explore actor-critic algorithms
- **Multi-Agent Training**: Train against diverse opponents

### Technical Optimizations
- **Distributed Training**: Multi-GPU training support
- **Model Compression**: Reduce network size for deployment
- **Quantization**: Lower precision for faster inference
- **Batch Inference**: Process multiple games simultaneously

### Feature Additions
- **Opening Book**: Pre-computed opening sequences
- **Endgame Tablebase**: Perfect play in endgame positions
- **Difficulty Levels**: Adjustable AI strength for different players
- **Game Analysis**: Post-game analysis and move suggestions

## Educational Value

This project serves as an excellent demonstration of:
- **Reinforcement Learning**: Practical RL implementation without frameworks
- **CUDA Programming**: GPU acceleration for AI applications
- **Game AI**: Traditional board game AI techniques
- **Neural Networks**: Low-level neural network implementation
- **Software Engineering**: Large-scale C++ project organization

## Technical Documentation

The comprehensive technical paper covers:
- Detailed DQN implementation specifics
- CUDA optimization techniques and performance analysis
- Training methodology and hyperparameter selection
- Comparison with traditional game AI approaches
- Future research directions and improvements

## Code Quality & Architecture

- **Modular Design**: Separate modules for game engine, AI, and GUI
- **Clean Interfaces**: Well-defined APIs between components
- **Error Handling**: Robust error checking and recovery
- **Documentation**: Comprehensive code comments and documentation
- **Testing**: Unit tests for critical game logic components

---

*This project demonstrates the potential of deep reinforcement learning in board games, while highlighting areas for future optimization. The combination of traditional game programming with modern AI techniques creates a robust and educational implementation that showcases both the power and challenges of applying neural networks to strategic games.*