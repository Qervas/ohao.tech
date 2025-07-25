import React, { useState } from "react";
import SortingModule from "./algorithms/SortingModule";
import StringModule from "./algorithms/StringModule";
import GraphModule from "./algorithms/GraphModule";
import TreeSearchModule from "./algorithms/TreeSearchModule";
import DynamicProgrammingModule from "./algorithms/DynamicProgrammingModule";

interface AlgorithmVisualizerProps {
  className?: string;
}

type AlgorithmCategory = "sorting" | "graph" | "string" | "tree" | "dynamic";

const categories: {
  id: AlgorithmCategory;
  name: string;
  description: string;
  icon: string;
  color: string;
}[] = [
  {
    id: "sorting",
    name: "Sorting",
    description: "Array sorting algorithms with step-by-step visualizations",
    icon: "📊",
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: "graph",
    name: "Graph",
    description: "Network traversal and pathfinding algorithms",
    icon: "🕸️",
    color: "from-green-500 to-emerald-500",
  },
  {
    id: "string",
    name: "String",
    description: "Text pattern matching and string processing",
    icon: "🔤",
    color: "from-purple-500 to-violet-500",
  },
  {
    id: "tree",
    name: "Tree",
    description: "Binary tree traversal and search algorithms",
    icon: "🌳",
    color: "from-orange-500 to-amber-500",
  },
  {
    id: "dynamic",
    name: "Dynamic Programming",
    description: "Optimization through memoization and table building",
    icon: "🧮",
    color: "from-rose-500 to-pink-500",
  },
];

const AlgorithmVisualizer: React.FC<AlgorithmVisualizerProps> = ({
  className = "",
}) => {
  const [activeCategory, setActiveCategory] =
    useState<AlgorithmCategory>("sorting");

  const renderModule = () => {
    switch (activeCategory) {
      case "sorting":
        return <SortingModule />;
      case "graph":
        return <GraphModule />;
      case "string":
        return <StringModule />;
      case "tree":
        return <TreeSearchModule />;
      case "dynamic":
        return <DynamicProgrammingModule />;
      default:
        return <SortingModule />;
    }
  };

  const activeCategoryData = categories.find(
    (cat) => cat.id === activeCategory,
  );

  return (
    <div className={`w-full ${className}`}>
      {/* Enhanced Category Tabs */}
      <div className="mb-8">
        <div className="flex items-center justify-center mb-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 w-full max-w-4xl">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`group relative p-4 rounded-xl transition-all duration-300 transform hover:scale-105 ${
                  activeCategory === category.id
                    ? `bg-gradient-to-r ${category.color} text-white shadow-lg`
                    : "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 text-gray-700 dark:text-gray-300"
                }`}
              >
                <div className="text-center">
                  <div className="text-2xl mb-2">{category.icon}</div>
                  <div className="text-sm font-semibold">{category.name}</div>
                  {activeCategory === category.id && (
                    <div className="absolute inset-0 rounded-xl bg-white/20 backdrop-blur-sm"></div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Enhanced Category Header */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div
              className={`w-12 h-12 rounded-lg bg-gradient-to-r ${activeCategoryData?.color} flex items-center justify-center text-white text-xl`}
            >
              {activeCategoryData?.icon}
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 dark:from-white dark:via-gray-200 dark:to-white bg-clip-text text-transparent">
              {activeCategoryData?.name} Algorithms
            </h2>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {activeCategoryData?.description}
          </p>
        </div>
      </div>

      {/* Active Module */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-xl overflow-hidden">
        <div
          className={`h-2 bg-gradient-to-r ${activeCategoryData?.color}`}
        ></div>
        {renderModule()}
      </div>

      {/* Enhanced Footer */}
      <div className="mt-12 text-center">
        <div className="inline-flex items-center gap-2 px-6 py-3 bg-gray-50 dark:bg-gray-800 rounded-full border border-gray-200 dark:border-gray-700">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            📚 Based on "Introduction to Algorithms" (CLRS)
          </span>
        </div>
      </div>
    </div>
  );
};

export default AlgorithmVisualizer;
