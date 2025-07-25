# Algorithm Visualizer Modules

This directory contains interactive algorithm visualization modules based on the "Introduction to Algorithms" (CLRS) textbook. Each module provides step-by-step visualizations of fundamental algorithms with interactive controls.

## Module Structure

### BaseAlgorithmModule.tsx
Core interfaces and components shared across all algorithm modules:
- `Algorithm` interface - defines algorithm metadata and execution
- `AlgorithmStep` interface - represents a single step in algorithm execution
- `AlgorithmControls` component - provides play/pause/step controls
- `AlgorithmInfo` component - displays algorithm information and complexity
- `useAlgorithmExecution` hook - manages algorithm state and execution

### SortingModule.tsx
Interactive sorting algorithm visualizations:
- **Bubble Sort** - O(n²) comparison-based sorting with adjacent swaps
- **Quick Sort** - O(n log n) divide-and-conquer with pivot partitioning
- **Merge Sort** - O(n log n) stable divide-and-conquer sorting
- **Selection Sort** - O(n²) in-place sorting by finding minimum elements
- **Insertion Sort** - O(n²) efficient for small datasets, builds sorted portion

### GraphModule.tsx
Graph algorithm visualizations with node-edge representations:
- **Breadth-First Search (BFS)** - Level-by-level exploration using queue
- **Depth-First Search (DFS)** - Deep exploration with backtracking
- **Dijkstra's Algorithm** - Shortest path in weighted graphs
- **Prim's MST** - Minimum spanning tree construction

### StringModule.tsx
String pattern matching algorithm visualizations:
- **KMP (Knuth-Morris-Pratt)** - Efficient pattern matching with failure function
- **Boyer-Moore** - Right-to-left scanning with bad character rule
- **Rabin-Karp** - Rolling hash-based pattern matching

### TreeSearchModule.tsx
Binary tree algorithm visualizations:
- **Inorder Traversal** - Left-Root-Right traversal (gives sorted sequence for BST)
- **Preorder Traversal** - Root-Left-Right traversal (useful for tree copying)
- **Postorder Traversal** - Left-Right-Root traversal (useful for tree deletion)
- **Level Order Traversal** - BFS-based level-by-level traversal
- **BST Search** - Efficient search in binary search trees

### DynamicProgrammingModule.tsx
Classic dynamic programming problem visualizations:
- **Fibonacci DP** - Bottom-up computation avoiding redundant calculations
- **0/1 Knapsack** - Optimal item selection with weight constraints
- **Longest Common Subsequence (LCS)** - Finding common patterns in sequences
- **Coin Change** - Minimum coins needed for target amount

## Features

### Interactive Controls
- **Play/Pause** - Automatic step progression with speed control
- **Step Navigation** - Manual forward/backward step control
- **Reset** - Return to initial state
- **Randomize** - Generate new random data
- **Info Panel** - Algorithm description and complexity analysis

### Visual Highlights
Each module uses consistent color coding:
- **Blue** - Default/unprocessed elements
- **Yellow** - Elements being compared
- **Purple** - Current element being processed
- **Green** - Completed/visited elements
- **Red** - Special states (found, mismatch, final result)

### Educational Information
- Time and space complexity analysis
- Algorithm descriptions and use cases
- Step-by-step explanations
- Visual legends and guides

## Usage

```tsx
import SortingModule from './algorithms/SortingModule';
import GraphModule from './algorithms/GraphModule';
// ... other modules

// Use in a tabbed interface
<SortingModule className="custom-styles" />
```

## Algorithm Complexity Reference

| Algorithm Category | Best Case | Average Case | Worst Case | Space |
|-------------------|-----------|--------------|------------|--------|
| **Sorting** |
| Bubble Sort | O(n) | O(n²) | O(n²) | O(1) |
| Quick Sort | O(n log n) | O(n log n) | O(n²) | O(log n) |
| Merge Sort | O(n log n) | O(n log n) | O(n log n) | O(n) |
| **Graph** |
| BFS/DFS | O(V + E) | O(V + E) | O(V + E) | O(V) |
| Dijkstra | O((V + E) log V) | O((V + E) log V) | O((V + E) log V) | O(V) |
| **String** |
| KMP | O(n + m) | O(n + m) | O(n + m) | O(m) |
| Boyer-Moore | O(n/m) | O(n) | O(nm) | O(σ) |
| **Tree** |
| Tree Traversal | O(n) | O(n) | O(n) | O(h) |
| BST Search | O(log n) | O(log n) | O(n) | O(h) |
| **Dynamic Programming** |
| Fibonacci | O(n) | O(n) | O(n) | O(n) |
| Knapsack | O(nW) | O(nW) | O(nW) | O(nW) |

Where:
- n = input size, m = pattern length, V = vertices, E = edges
- h = tree height, W = knapsack capacity, σ = alphabet size

## Adding New Algorithms

To add a new algorithm to an existing module:

1. Define the algorithm function following the pattern:
```tsx
const newAlgorithm = (data: DataType): AlgorithmStep[] => {
  const steps: AlgorithmStep[] = [];
  // Implementation with steps.push() for each visualization step
  return steps;
};
```

2. Add to the algorithms array:
```tsx
const algorithms: Algorithm[] = [
  // existing algorithms...
  {
    id: "new-algorithm",
    name: "New Algorithm",
    description: "Algorithm description",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    generate: () => generateData(),
    execute: newAlgorithm,
  },
];
```

3. Update the visualizer component to handle new data types and highlights.

## Contributing

When adding new modules or algorithms:
- Follow the existing pattern and interfaces
- Include comprehensive step-by-step explanations
- Add appropriate visual highlights for each step
- Include time/space complexity information
- Test with various input sizes and edge cases
- Maintain consistent color coding and UI patterns