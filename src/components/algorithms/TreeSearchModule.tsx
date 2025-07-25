import React from "react";
import {
  type Algorithm,
  type AlgorithmStep,
  AlgorithmControls,
  AlgorithmInfo,
  useAlgorithmExecution,
} from "./BaseAlgorithmModule";

interface TreeNode {
  value: number;
  left: TreeNode | null;
  right: TreeNode | null;
  x: number;
  y: number;
  id: number;
}

interface TreeData {
  root: TreeNode | null;
  nodes: TreeNode[];
  height: number;
}

// Generate random binary tree
const generateRandomTree = (maxNodes: number = 15): TreeData => {
  if (maxNodes === 0) return { root: null, nodes: [], height: 0 };

  // Create a more balanced tree by using a better insertion order
  const values: number[] = [];

  // Generate numbers 1 to maxNodes with some spacing for better visualization
  const baseValues = Array.from({ length: maxNodes }, (_, i) => i + 1);

  // Use a balanced insertion order (middle-first approach)
  const insertBalanced = (arr: number[], start: number, end: number) => {
    if (start > end) return;
    const mid = Math.floor((start + end) / 2);
    values.push(arr[mid]);
    insertBalanced(arr, start, mid - 1);
    insertBalanced(arr, mid + 1, end);
  };

  insertBalanced(baseValues, 0, baseValues.length - 1);

  const nodes: TreeNode[] = [];
  let nodeId = 0;

  const createNode = (value: number): TreeNode => {
    const node: TreeNode = {
      value,
      left: null,
      right: null,
      x: 0,
      y: 0,
      id: nodeId++,
    };
    nodes.push(node);
    return node;
  };

  // Create BST for better visualization
  const insertBST = (root: TreeNode | null, value: number): TreeNode => {
    if (!root) return createNode(value);

    if (value < root.value) {
      root.left = insertBST(root.left, value);
    } else {
      root.right = insertBST(root.right, value);
    }
    return root;
  };

  let root: TreeNode | null = null;
  for (const value of values) {
    root = insertBST(root, value);
  }

  // Calculate positions with better bounds checking
  const getTreeWidth = (node: TreeNode | null): number => {
    if (!node) return 0;
    const leftWidth = getTreeWidth(node.left);
    const rightWidth = getTreeWidth(node.right);
    return Math.max(leftWidth + rightWidth + 1, 1);
  };

  const calculatePositions = (
    node: TreeNode | null,
    x: number,
    y: number,
    level: number,
    leftBound: number,
    rightBound: number,
    totalNodes: number,
  ): void => {
    if (!node) return;

    node.x = x;
    node.y = y;

    if (node.left || node.right) {
      // Dynamic spacing based on available width and tree size
      const availableWidth = rightBound - leftBound;
      const levelSpacing = Math.max(
        35,
        Math.min(90, availableWidth / Math.pow(2, level + 1)),
      );
      const nextY = y + (totalNodes > 12 ? 55 : 70);

      if (node.left) {
        const leftX = Math.max(leftBound + 30, x - levelSpacing);
        calculatePositions(
          node.left,
          leftX,
          nextY,
          level + 1,
          leftBound,
          x - 15,
          totalNodes,
        );
      }

      if (node.right) {
        const rightX = Math.min(rightBound - 30, x + levelSpacing);
        calculatePositions(
          node.right,
          rightX,
          nextY,
          level + 1,
          x + 15,
          rightBound,
          totalNodes,
        );
      }
    }
  };

  const getHeight = (node: TreeNode | null): number => {
    if (!node) return 0;
    return 1 + Math.max(getHeight(node.left), getHeight(node.right));
  };

  if (root) {
    const treeWidth = getTreeWidth(root);
    const height = getHeight(root);
    const viewportWidth = Math.max(700, Math.min(1200, treeWidth * 80));
    const viewportHeight = Math.max(400, height * (maxNodes > 12 ? 65 : 80));
    const startX = viewportWidth / 2;
    const startY = 50;

    calculatePositions(
      root,
      startX,
      startY,
      0,
      50,
      viewportWidth - 50,
      maxNodes,
    );
  }

  return {
    root,
    nodes,
    height: getHeight(root),
  };
};

// Inorder Traversal
const inorderTraversal = (data: TreeData): AlgorithmStep[] => {
  const steps: AlgorithmStep[] = [];
  const result: number[] = [];

  steps.push({
    data: { ...data, result: [...result] },
    message: "Starting Inorder Traversal (Left -> Root -> Right)",
    highlights: {},
  });

  const inorderHelper = (node: TreeNode | null) => {
    if (!node) return;

    steps.push({
      data: { ...data, result: [...result] },
      message: `Visiting node ${node.value} - going left first`,
      highlights: { current: [node.id] },
    });

    // Go left
    if (node.left) {
      steps.push({
        data: { ...data, result: [...result] },
        message: `Moving to left child of ${node.value}`,
        highlights: {
          current: [node.id],
          comparing: [node.left.id],
        },
      });
      inorderHelper(node.left);
    }

    // Visit root
    result.push(node.value);
    steps.push({
      data: { ...data, result: [...result] },
      message: `Processing node ${node.value} - adding to result`,
      highlights: {
        visited: [node.id],
        current: [],
      },
    });

    // Go right
    if (node.right) {
      steps.push({
        data: { ...data, result: [...result] },
        message: `Moving to right child of ${node.value}`,
        highlights: {
          visited: [node.id],
          comparing: [node.right.id],
        },
      });
      inorderHelper(node.right);
    }
  };

  if (data.root) {
    inorderHelper(data.root);
  }

  steps.push({
    data: { ...data, result: [...result] },
    message: `Inorder traversal completed! Result: [${result.join(", ")}]`,
    highlights: { visited: data.nodes.map((n) => n.id) },
  });

  return steps;
};

// Preorder Traversal
const preorderTraversal = (data: TreeData): AlgorithmStep[] => {
  const steps: AlgorithmStep[] = [];
  const result: number[] = [];

  steps.push({
    data: { ...data, result: [...result] },
    message: "Starting Preorder Traversal (Root -> Left -> Right)",
    highlights: {},
  });

  const preorderHelper = (node: TreeNode | null) => {
    if (!node) return;

    // Visit root first
    result.push(node.value);
    steps.push({
      data: { ...data, result: [...result] },
      message: `Processing node ${node.value} - adding to result first`,
      highlights: {
        visited: [node.id],
        current: [],
      },
    });

    // Go left
    if (node.left) {
      steps.push({
        data: { ...data, result: [...result] },
        message: `Moving to left child of ${node.value}`,
        highlights: {
          visited: [node.id],
          comparing: [node.left.id],
        },
      });
      preorderHelper(node.left);
    }

    // Go right
    if (node.right) {
      steps.push({
        data: { ...data, result: [...result] },
        message: `Moving to right child of ${node.value}`,
        highlights: {
          visited: [node.id],
          comparing: [node.right.id],
        },
      });
      preorderHelper(node.right);
    }
  };

  if (data.root) {
    preorderHelper(data.root);
  }

  steps.push({
    data: { ...data, result: [...result] },
    message: `Preorder traversal completed! Result: [${result.join(", ")}]`,
    highlights: { visited: data.nodes.map((n) => n.id) },
  });

  return steps;
};

// Postorder Traversal
const postorderTraversal = (data: TreeData): AlgorithmStep[] => {
  const steps: AlgorithmStep[] = [];
  const result: number[] = [];

  steps.push({
    data: { ...data, result: [...result] },
    message: "Starting Postorder Traversal (Left -> Right -> Root)",
    highlights: {},
  });

  const postorderHelper = (node: TreeNode | null) => {
    if (!node) return;

    steps.push({
      data: { ...data, result: [...result] },
      message: `Visiting node ${node.value} - processing children first`,
      highlights: { current: [node.id] },
    });

    // Go left
    if (node.left) {
      steps.push({
        data: { ...data, result: [...result] },
        message: `Moving to left child of ${node.value}`,
        highlights: {
          current: [node.id],
          comparing: [node.left.id],
        },
      });
      postorderHelper(node.left);
    }

    // Go right
    if (node.right) {
      steps.push({
        data: { ...data, result: [...result] },
        message: `Moving to right child of ${node.value}`,
        highlights: {
          current: [node.id],
          comparing: [node.right.id],
        },
      });
      postorderHelper(node.right);
    }

    // Visit root last
    result.push(node.value);
    steps.push({
      data: { ...data, result: [...result] },
      message: `Processing node ${node.value} - adding to result after children`,
      highlights: {
        visited: [node.id],
        current: [],
      },
    });
  };

  if (data.root) {
    postorderHelper(data.root);
  }

  steps.push({
    data: { ...data, result: [...result] },
    message: `Postorder traversal completed! Result: [${result.join(", ")}]`,
    highlights: { visited: data.nodes.map((n) => n.id) },
  });

  return steps;
};

// Level Order Traversal (BFS)
const levelOrderTraversal = (data: TreeData): AlgorithmStep[] => {
  const steps: AlgorithmStep[] = [];
  const result: number[] = [];
  const queue: TreeNode[] = [];

  if (!data.root) return steps;

  queue.push(data.root);

  steps.push({
    data: { ...data, result: [...result], queue: queue.map((n) => n.value) },
    message: "Starting Level Order Traversal (BFS)",
    highlights: { current: [data.root.id] },
  });

  while (queue.length > 0) {
    const node = queue.shift()!;
    result.push(node.value);

    steps.push({
      data: { ...data, result: [...result], queue: queue.map((n) => n.value) },
      message: `Processing node ${node.value} from queue`,
      highlights: {
        visited: [node.id],
        current: [],
      },
    });

    if (node.left) {
      queue.push(node.left);
      steps.push({
        data: {
          ...data,
          result: [...result],
          queue: queue.map((n) => n.value),
        },
        message: `Adding left child ${node.left.value} to queue`,
        highlights: {
          visited: [node.id],
          comparing: [node.left.id],
        },
      });
    }

    if (node.right) {
      queue.push(node.right);
      steps.push({
        data: {
          ...data,
          result: [...result],
          queue: queue.map((n) => n.value),
        },
        message: `Adding right child ${node.right.value} to queue`,
        highlights: {
          visited: [node.id],
          comparing: [node.right.id],
        },
      });
    }
  }

  steps.push({
    data: { ...data, result: [...result], queue: [] },
    message: `Level order traversal completed! Result: [${result.join(", ")}]`,
    highlights: { visited: data.nodes.map((n) => n.id) },
  });

  return steps;
};

// Binary Search Tree Search
const bstSearch = (data: TreeData, target?: number): AlgorithmStep[] => {
  const steps: AlgorithmStep[] = [];

  // If no target provided, search for a random existing value
  if (target === undefined && data.nodes.length > 0) {
    target = data.nodes[Math.floor(Math.random() * data.nodes.length)].value;
  }

  if (target === undefined) return steps;

  steps.push({
    data: { ...data, target },
    message: `Starting BST Search for value ${target}`,
    highlights: {},
  });

  const searchHelper = (node: TreeNode | null): boolean => {
    if (!node) {
      steps.push({
        data: { ...data, target },
        message: `Reached null node - value ${target} not found`,
        highlights: {},
      });
      return false;
    }

    steps.push({
      data: { ...data, target },
      message: `Comparing ${target} with node ${node.value}`,
      highlights: { current: [node.id] },
    });

    if (target === node.value) {
      steps.push({
        data: { ...data, target },
        message: `Found ${target}! Search successful`,
        highlights: { sorted: [node.id] },
      });
      return true;
    } else if (target < node.value) {
      steps.push({
        data: { ...data, target },
        message: `${target} < ${node.value}, searching left subtree`,
        highlights: {
          current: [node.id],
          comparing: node.left ? [node.left.id] : [],
        },
      });
      return searchHelper(node.left);
    } else {
      steps.push({
        data: { ...data, target },
        message: `${target} > ${node.value}, searching right subtree`,
        highlights: {
          current: [node.id],
          comparing: node.right ? [node.right.id] : [],
        },
      });
      return searchHelper(node.right);
    }
  };

  searchHelper(data.root);
  return steps;
};

const treeSearchAlgorithms: Algorithm[] = [
  {
    id: "inorder",
    name: "Inorder Traversal",
    description:
      "Traverse the tree in Left-Root-Right order. For BST, this gives sorted sequence.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(h)",
    generate: () => generateRandomTree(12),
    execute: (data: TreeData) => inorderTraversal(data),
  },
  {
    id: "preorder",
    name: "Preorder Traversal",
    description:
      "Traverse the tree in Root-Left-Right order. Useful for creating copy of tree.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(h)",
    generate: () => generateRandomTree(12),
    execute: (data: TreeData) => preorderTraversal(data),
  },
  {
    id: "postorder",
    name: "Postorder Traversal",
    description:
      "Traverse the tree in Left-Right-Root order. Useful for deleting tree.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(h)",
    generate: () => generateRandomTree(12),
    execute: (data: TreeData) => postorderTraversal(data),
  },
  {
    id: "levelorder",
    name: "Level Order Traversal",
    description:
      "Traverse the tree level by level using a queue (BFS approach).",
    timeComplexity: "O(n)",
    spaceComplexity: "O(w)",
    generate: () => generateRandomTree(12),
    execute: (data: TreeData) => levelOrderTraversal(data),
  },
  {
    id: "bst-search",
    name: "BST Search",
    description:
      "Search for a value in Binary Search Tree by comparing and choosing left/right path.",
    timeComplexity: "O(h)",
    spaceComplexity: "O(h)",
    generate: () => generateRandomTree(12),
    execute: (data: TreeData) => bstSearch(data),
  },
];

interface TreeVisualizerProps {
  step: AlgorithmStep | null;
}

const TreeVisualizer: React.FC<TreeVisualizerProps> = ({ step }) => {
  if (!step || !step.data) {
    return (
      <div className="h-96 flex items-center justify-center text-gray-500">
        Generate data to start visualization
      </div>
    );
  }

  const { nodes, result, queue, target } = step.data;
  const highlights = step.highlights || {};

  const nodeCount = step.data.nodes?.length || 5;
  const treeHeight = step.data.height || 3;
  const viewBoxWidth = Math.max(700, Math.min(1200, nodeCount * 80));
  const viewBoxHeight = Math.max(400, treeHeight * (nodeCount > 12 ? 65 : 80));

  return (
    <div className="h-96 bg-gray-50 dark:bg-gray-900 rounded-lg p-4 overflow-hidden">
      <svg
        viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
        className="w-full h-full"
      >
        {/* Render edges */}
        {nodes.map((node: TreeNode) => (
          <g key={`edges-${node.id}`}>
            {node.left && (
              <line
                x1={node.x}
                y1={node.y}
                x2={node.left.x}
                y2={node.left.y}
                stroke="#6B7280"
                strokeWidth="2"
                className="transition-all duration-300"
              />
            )}
            {node.right && (
              <line
                x1={node.x}
                y1={node.y}
                x2={node.right.x}
                y2={node.right.y}
                stroke="#6B7280"
                strokeWidth="2"
                className="transition-all duration-300"
              />
            )}
          </g>
        ))}

        {/* Render nodes */}
        {nodes.map((node: TreeNode) => {
          let nodeColor = "#3B82F6"; // blue
          let borderColor = "#1F2937";

          if (highlights.visited?.includes(node.id)) nodeColor = "#10B981"; // green
          if (highlights.current?.includes(node.id)) nodeColor = "#8B5CF6"; // purple
          if (highlights.comparing?.includes(node.id)) nodeColor = "#F59E0B"; // yellow
          if (highlights.sorted?.includes(node.id)) nodeColor = "#EF4444"; // red (found)

          // Scale node size based on tree size for better readability
          const nodeRadius =
            nodes.length > 12 ? 20 : nodes.length > 8 ? 22 : 24;
          const fontSize = nodes.length > 12 ? 12 : nodes.length > 8 ? 14 : 16;

          return (
            <g key={node.id}>
              <circle
                cx={node.x}
                cy={node.y}
                r={nodeRadius}
                fill={nodeColor}
                stroke={borderColor}
                strokeWidth="2"
                className="transition-all duration-300"
              />
              <text
                x={node.x}
                y={node.y + 4}
                textAnchor="middle"
                fill="white"
                fontSize={fontSize}
                fontWeight="bold"
                className="select-none"
              >
                {node.value}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Result display */}
      {result && result.length > 0 && (
        <div className="mt-4">
          <div className="text-sm font-medium mb-2">Traversal Result:</div>
          <div className="flex gap-2 flex-wrap">
            {result.map((value: number, index: number) => (
              <span
                key={index}
                className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded font-mono"
              >
                {value}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Queue display for level order */}
      {queue && (
        <div className="mt-4">
          <div className="text-sm font-medium mb-2">Queue:</div>
          <div className="flex gap-2">
            {queue.map((value: number, index: number) => (
              <span
                key={index}
                className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded font-mono"
              >
                {value}
              </span>
            ))}
            {queue.length === 0 && (
              <span className="text-gray-500 italic">Empty</span>
            )}
          </div>
        </div>
      )}

      {/* Target display for search */}
      {target !== undefined && (
        <div className="mt-4">
          <div className="text-sm font-medium mb-2">
            Searching for: <span className="font-mono text-lg">{target}</span>
          </div>
        </div>
      )}
    </div>
  );
};

interface TreeSearchModuleProps {
  className?: string;
}

const TreeSearchModule: React.FC<TreeSearchModuleProps> = ({
  className = "",
}) => {
  const [selectedAlgorithm, setSelectedAlgorithm] = React.useState(
    treeSearchAlgorithms[0],
  );
  const [showInfo, setShowInfo] = React.useState(false);
  const [treeSize, setTreeSize] = React.useState(12);

  // Create stable algorithm with current tree size
  const currentAlgorithm = React.useMemo(() => {
    if (!selectedAlgorithm) return null;
    return {
      ...selectedAlgorithm,
      generate: () => generateRandomTree(treeSize),
    };
  }, [selectedAlgorithm, treeSize]);

  const {
    data,
    steps,
    currentStep,
    isPlaying,
    speed,
    controls,
    currentStepData,
  } = useAlgorithmExecution(currentAlgorithm);

  return (
    <div className={`p-6 ${className}`}>
      {/* Unified Controls - Single Compact Row */}
      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 mb-6 space-y-4">
        {/* Top Row: Algorithm + Size + Actions */}
        <div className="flex flex-wrap items-center gap-4">
          {/* Algorithm Selection */}
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">
              Algorithm:
            </label>
            <select
              value={selectedAlgorithm.id}
              onChange={(e) => {
                const algorithm = treeSearchAlgorithms.find(
                  (alg) => alg.id === e.target.value,
                );
                if (algorithm) setSelectedAlgorithm(algorithm);
              }}
              className="flex-1 min-w-[200px] p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-sm"
            >
              {treeSearchAlgorithms.map((algorithm) => (
                <option key={algorithm.id} value={algorithm.id}>
                  {algorithm.name} ({algorithm.timeComplexity})
                </option>
              ))}
            </select>
          </div>

          {/* Size Control */}
          <div className="flex items-center gap-3">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">
              Size: {treeSize}
            </label>
            <input
              type="range"
              min="5"
              max="12"
              value={treeSize}
              onChange={(e) => setTreeSize(parseInt(e.target.value))}
              className="w-24 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-600"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={controls.randomize}
              className="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
            >
              New Tree
            </button>
            <button
              onClick={() => setShowInfo(!showInfo)}
              className={`px-3 py-2 rounded-lg transition-colors text-sm font-medium ${
                showInfo
                  ? "bg-purple-600 text-white hover:bg-purple-700"
                  : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 border border-gray-200 dark:border-gray-600"
              }`}
            >
              Info
            </button>
          </div>
        </div>

        <AlgorithmControls
          isPlaying={isPlaying}
          currentStep={currentStep}
          totalSteps={steps.length}
          speed={speed}
          showInfo={showInfo}
          onPlay={controls.play}
          onPause={controls.pause}
          onReset={controls.reset}
          onPrevStep={controls.prevStep}
          onNextStep={controls.nextStep}
          onSpeedChange={controls.setSpeed}
          onRandomize={controls.randomize}
          onToggleInfo={() => setShowInfo(!showInfo)}
          showRandomize={false}
          showInfoButton={false}
        />
      </div>

      {/* Info Panel */}
      {showInfo && (
        <div className="mb-6">
          <AlgorithmInfo algorithm={selectedAlgorithm} />
        </div>
      )}

      {/* Visualization */}
      <div className="mb-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        <TreeVisualizer
          step={
            currentStepData ||
            (data
              ? {
                  data,
                  message: "Click Play to start tree algorithm",
                  highlights: {},
                }
              : null)
          }
        />
      </div>

      {/* Step Message */}
      {currentStepData && (
        <div className="text-center">
          <div className="text-sm bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
            {currentStepData.message}
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
          <span>Unvisited</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
          <span>Exploring</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-purple-500 rounded-full"></div>
          <span>Current</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-500 rounded-full"></div>
          <span>Visited/Processed</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-500 rounded-full"></div>
          <span>Found/Target</span>
        </div>
      </div>
    </div>
  );
};

export default TreeSearchModule;
