import React from "react";
import {
  type Algorithm,
  type AlgorithmStep,
  AlgorithmControls,
  AlgorithmInfo,
  useAlgorithmExecution,
} from "./BaseAlgorithmModule";

interface GraphNode {
  id: number;
  x: number;
  y: number;
  label: string;
  neighbors: number[];
  weights?: { [key: number]: number };
}

interface GraphData {
  nodes: GraphNode[];
  edges: Array<{ from: number; to: number; weight?: number }>;
  directed: boolean;
}

// Generate random graph
const generateRandomGraph = (
  nodeCount: number = 6,
  directed: boolean = false,
): GraphData => {
  const nodes: GraphNode[] = [];
  const edges: Array<{ from: number; to: number; weight?: number }> = [];

  // Create nodes in a circular layout
  for (let i = 0; i < nodeCount; i++) {
    const angle = (2 * Math.PI * i) / nodeCount;
    const radius = 120;
    const centerX = 200;
    const centerY = 150;

    nodes.push({
      id: i,
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle),
      label: String.fromCharCode(65 + i), // A, B, C, ...
      neighbors: [],
      weights: {},
    });
  }

  // Add random edges
  const edgeCount = Math.floor(nodeCount * 1.5);
  const addedEdges = new Set<string>();

  for (let i = 0; i < edgeCount; i++) {
    let from, to;
    let edgeKey;

    do {
      from = Math.floor(Math.random() * nodeCount);
      to = Math.floor(Math.random() * nodeCount);
      edgeKey = directed
        ? `${from}-${to}`
        : `${Math.min(from, to)}-${Math.max(from, to)}`;
    } while (from === to || addedEdges.has(edgeKey));

    addedEdges.add(edgeKey);

    const weight = Math.floor(Math.random() * 10) + 1;

    edges.push({ from, to, weight });
    nodes[from].neighbors.push(to);
    nodes[from].weights![to] = weight;

    if (!directed) {
      nodes[to].neighbors.push(from);
      nodes[to].weights![from] = weight;
    }
  }

  return { nodes, edges, directed };
};

// Breadth-First Search
const breadthFirstSearch = (
  data: GraphData,
  startNode: number = 0,
): AlgorithmStep[] => {
  const steps: AlgorithmStep[] = [];
  const { nodes } = data;
  const visited = new Set<number>();
  const queue: number[] = [startNode];

  steps.push({
    data: { ...data },
    message: `Starting BFS from node ${nodes[startNode].label}`,
    highlights: {
      current: [startNode],
      visited: [],
    },
  });

  while (queue.length > 0) {
    const current = queue.shift()!;

    if (!visited.has(current)) {
      visited.add(current);

      steps.push({
        data: { ...data, queue: [...queue] },
        message: `Visiting node ${nodes[current].label}`,
        highlights: {
          current: [current],
          visited: Array.from(visited),
        },
      });

      for (const neighbor of nodes[current].neighbors) {
        if (!visited.has(neighbor) && !queue.includes(neighbor)) {
          queue.push(neighbor);

          steps.push({
            data: { ...data, queue: [...queue] },
            message: `Adding node ${nodes[neighbor].label} to queue`,
            highlights: {
              current: [current],
              comparing: [neighbor],
              visited: Array.from(visited),
            },
          });
        }
      }
    }
  }

  steps.push({
    data: { ...data },
    message: "BFS traversal completed!",
    highlights: {
      visited: Array.from(visited),
    },
  });

  return steps;
};

// Depth-First Search
const depthFirstSearch = (
  data: GraphData,
  startNode: number = 0,
): AlgorithmStep[] => {
  const steps: AlgorithmStep[] = [];
  const { nodes } = data;
  const visited = new Set<number>();

  steps.push({
    data: { ...data },
    message: `Starting DFS from node ${nodes[startNode].label}`,
    highlights: {
      current: [startNode],
      visited: [],
    },
  });

  const dfsHelper = (nodeId: number) => {
    visited.add(nodeId);

    steps.push({
      data: { ...data },
      message: `Visiting node ${nodes[nodeId].label}`,
      highlights: {
        current: [nodeId],
        visited: Array.from(visited),
      },
    });

    for (const neighbor of nodes[nodeId].neighbors) {
      if (!visited.has(neighbor)) {
        steps.push({
          data: { ...data },
          message: `Exploring neighbor ${nodes[neighbor].label}`,
          highlights: {
            current: [nodeId],
            comparing: [neighbor],
            visited: Array.from(visited),
          },
        });

        dfsHelper(neighbor);
      }
    }
  };

  dfsHelper(startNode);

  steps.push({
    data: { ...data },
    message: "DFS traversal completed!",
    highlights: {
      visited: Array.from(visited),
    },
  });

  return steps;
};

// Dijkstra's Algorithm
const dijkstraAlgorithm = (
  data: GraphData,
  startNode: number = 0,
): AlgorithmStep[] => {
  const steps: AlgorithmStep[] = [];
  const { nodes } = data;
  const n = nodes.length;
  const distances: { [key: number]: number } = {};
  const previous: { [key: number]: number } = {};
  const visited = new Set<number>();
  const unvisited = new Set<number>();

  // Initialize distances
  for (let i = 0; i < n; i++) {
    distances[i] = i === startNode ? 0 : Infinity;
    previous[i] = -1;
    unvisited.add(i);
  }

  steps.push({
    data: { ...data, distances: { ...distances }, previous: { ...previous } },
    message: `Starting Dijkstra's algorithm from node ${nodes[startNode].label}`,
    highlights: {
      current: [startNode],
      visited: [],
    },
  });

  while (unvisited.size > 0) {
    // Find unvisited node with minimum distance
    let minNode = -1;
    let minDistance = Infinity;

    for (const node of unvisited) {
      if (distances[node] < minDistance) {
        minDistance = distances[node];
        minNode = node;
      }
    }

    if (minNode === -1 || minDistance === Infinity) break;

    unvisited.delete(minNode);
    visited.add(minNode);

    steps.push({
      data: { ...data, distances: { ...distances }, previous: { ...previous } },
      message: `Processing node ${nodes[minNode].label} with distance ${distances[minNode]}`,
      highlights: {
        current: [minNode],
        visited: Array.from(visited),
      },
    });

    // Update distances to neighbors
    for (const neighbor of nodes[minNode].neighbors) {
      if (!visited.has(neighbor)) {
        const weight = nodes[minNode].weights![neighbor] || 1;
        const newDistance = distances[minNode] + weight;

        if (newDistance < distances[neighbor]) {
          distances[neighbor] = newDistance;
          previous[neighbor] = minNode;

          steps.push({
            data: {
              ...data,
              distances: { ...distances },
              previous: { ...previous },
            },
            message: `Updated distance to ${nodes[neighbor].label}: ${newDistance} (via ${nodes[minNode].label})`,
            highlights: {
              current: [minNode],
              comparing: [neighbor],
              visited: Array.from(visited),
            },
          });
        }
      }
    }
  }

  steps.push({
    data: { ...data, distances: { ...distances }, previous: { ...previous } },
    message: "Dijkstra's algorithm completed!",
    highlights: {
      visited: Array.from(visited),
    },
  });

  return steps;
};

// Prim's Minimum Spanning Tree
const primMST = (data: GraphData): AlgorithmStep[] => {
  const steps: AlgorithmStep[] = [];
  const { nodes } = data;
  const n = nodes.length;
  const visited = new Set<number>();
  const mstEdges: Array<{ from: number; to: number; weight: number }> = [];

  // Start from node 0
  visited.add(0);

  steps.push({
    data: { ...data, mstEdges: [...mstEdges] },
    message: `Starting Prim's MST from node ${nodes[0].label}`,
    highlights: {
      visited: [0],
    },
  });

  while (visited.size < n) {
    let minEdge: { from: number; to: number; weight: number } | null = null;

    // Find minimum weight edge from visited to unvisited nodes
    for (const from of visited) {
      for (const to of nodes[from].neighbors) {
        if (!visited.has(to)) {
          const weight = nodes[from].weights![to] || 1;
          if (!minEdge || weight < minEdge.weight) {
            minEdge = { from, to, weight };
          }
        }
      }
    }

    if (minEdge) {
      visited.add(minEdge.to);
      mstEdges.push(minEdge);

      steps.push({
        data: { ...data, mstEdges: [...mstEdges] },
        message: `Added edge ${nodes[minEdge.from].label}-${nodes[minEdge.to].label} (weight: ${minEdge.weight})`,
        highlights: {
          visited: Array.from(visited),
          current: [minEdge.from, minEdge.to],
        },
      });
    }
  }

  steps.push({
    data: { ...data, mstEdges: [...mstEdges] },
    message: `Prim's MST completed! Total weight: ${mstEdges.reduce((sum, edge) => sum + edge.weight, 0)}`,
    highlights: {
      visited: Array.from(visited),
    },
  });

  return steps;
};

const graphAlgorithms: Algorithm[] = [
  {
    id: "bfs",
    name: "Breadth-First Search",
    description:
      "Explores graph level by level using a queue, visiting all neighbors before going deeper.",
    timeComplexity: "O(V + E)",
    spaceComplexity: "O(V)",
    generate: () => generateRandomGraph(6, false),
    execute: (data: GraphData) => breadthFirstSearch(data, 0),
  },
  {
    id: "dfs",
    name: "Depth-First Search",
    description:
      "Explores graph by going as deep as possible before backtracking.",
    timeComplexity: "O(V + E)",
    spaceComplexity: "O(V)",
    generate: () => generateRandomGraph(6, false),
    execute: (data: GraphData) => depthFirstSearch(data, 0),
  },
  {
    id: "dijkstra",
    name: "Dijkstra's Algorithm",
    description:
      "Finds shortest paths from a source vertex to all other vertices in a weighted graph.",
    timeComplexity: "O((V + E) log V)",
    spaceComplexity: "O(V)",
    generate: () => generateRandomGraph(6, false),
    execute: (data: GraphData) => dijkstraAlgorithm(data, 0),
  },
  {
    id: "prim",
    name: "Prim's MST",
    description:
      "Finds minimum spanning tree by growing the tree one edge at a time.",
    timeComplexity: "O(E log V)",
    spaceComplexity: "O(V)",
    generate: () => generateRandomGraph(6, false),
    execute: (data: GraphData) => primMST(data),
  },
];

interface GraphVisualizerProps {
  step: AlgorithmStep | null;
}

const GraphVisualizer: React.FC<GraphVisualizerProps> = ({ step }) => {
  if (!step || !step.data) {
    return (
      <div className="h-80 flex items-center justify-center text-gray-500">
        Generate data to start visualization
      </div>
    );
  }

  const { nodes, edges, distances, mstEdges } = step.data;
  const highlights = step.highlights || {};

  return (
    <div className="h-80 bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
      <svg viewBox="0 0 400 300" className="w-full h-full">
        {/* Render edges */}
        {edges.map((edge: any, index: number) => {
          const fromNode = nodes[edge.from];
          const toNode = nodes[edge.to];

          // Check if this edge is in MST
          const isInMST = mstEdges?.some(
            (mstEdge: any) =>
              (mstEdge.from === edge.from && mstEdge.to === edge.to) ||
              (mstEdge.from === edge.to && mstEdge.to === edge.from),
          );

          return (
            <g key={index}>
              <line
                x1={fromNode.x}
                y1={fromNode.y}
                x2={toNode.x}
                y2={toNode.y}
                stroke={isInMST ? "#10B981" : "#6B7280"}
                strokeWidth={isInMST ? "3" : "2"}
                className="transition-all duration-300"
              />
              {edge.weight && (
                <text
                  x={(fromNode.x + toNode.x) / 2}
                  y={(fromNode.y + toNode.y) / 2 - 5}
                  textAnchor="middle"
                  fill="#374151"
                  fontSize="12"
                  fontWeight="bold"
                  className="bg-white"
                >
                  {edge.weight}
                </text>
              )}
            </g>
          );
        })}

        {/* Render nodes */}
        {nodes.map((node: GraphNode) => {
          let nodeColor = "#3B82F6"; // blue
          let borderColor = "#1F2937";

          if (highlights.visited?.includes(node.id)) nodeColor = "#10B981"; // green
          if (highlights.current?.includes(node.id)) nodeColor = "#8B5CF6"; // purple
          if (highlights.comparing?.includes(node.id)) nodeColor = "#F59E0B"; // yellow

          return (
            <g key={node.id}>
              <circle
                cx={node.x}
                cy={node.y}
                r="20"
                fill={nodeColor}
                stroke={borderColor}
                strokeWidth="2"
                className="transition-all duration-300"
              />
              <text
                x={node.x}
                y={node.y + 5}
                textAnchor="middle"
                fill="white"
                fontSize="14"
                fontWeight="bold"
              >
                {node.label}
              </text>
              {distances && distances[node.id] !== undefined && (
                <text
                  x={node.x}
                  y={node.y - 35}
                  textAnchor="middle"
                  fill="#374151"
                  fontSize="12"
                  fontWeight="bold"
                >
                  {distances[node.id] === Infinity ? "∞" : distances[node.id]}
                </text>
              )}
            </g>
          );
        })}
      </svg>

      {/* Queue display for BFS */}
      {step.data.queue && (
        <div className="mt-4">
          <div className="text-sm font-medium mb-2">Queue:</div>
          <div className="flex gap-2">
            {step.data.queue.map((nodeId: number, index: number) => (
              <span
                key={index}
                className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded font-mono"
              >
                {nodes[nodeId].label}
              </span>
            ))}
            {step.data.queue.length === 0 && (
              <span className="text-gray-500 italic">Empty</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

interface GraphModuleProps {
  className?: string;
}

const GraphModule: React.FC<GraphModuleProps> = ({ className = "" }) => {
  const [selectedAlgorithm, setSelectedAlgorithm] = React.useState(
    graphAlgorithms[0],
  );
  const [showInfo, setShowInfo] = React.useState(false);
  const [nodeCount, setNodeCount] = React.useState(6);

  // Create stable algorithm with current node count
  const currentAlgorithm = React.useMemo(() => {
    if (!selectedAlgorithm) return null;
    return {
      ...selectedAlgorithm,
      generate: () => generateRandomGraph(nodeCount, false),
    };
  }, [selectedAlgorithm, nodeCount]);

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
                const algorithm = graphAlgorithms.find(
                  (alg) => alg.id === e.target.value,
                );
                if (algorithm) setSelectedAlgorithm(algorithm);
              }}
              className="flex-1 min-w-[200px] p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-sm"
            >
              {graphAlgorithms.map((algorithm) => (
                <option key={algorithm.id} value={algorithm.id}>
                  {algorithm.name} ({algorithm.timeComplexity})
                </option>
              ))}
            </select>
          </div>

          {/* Nodes Control */}
          <div className="flex items-center gap-3">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">
              Nodes: {nodeCount}
            </label>
            <input
              type="range"
              min="4"
              max="8"
              value={nodeCount}
              onChange={(e) => setNodeCount(parseInt(e.target.value))}
              className="w-24 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-600"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={controls.randomize}
              className="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
            >
              New Graph
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
        <GraphVisualizer
          step={
            currentStepData ||
            (data
              ? {
                  data,
                  message: "Click Play to start graph algorithm",
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
          <span>Visited</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-500"></div>
          <span>MST Edge</span>
        </div>
      </div>
    </div>
  );
};

export default GraphModule;
