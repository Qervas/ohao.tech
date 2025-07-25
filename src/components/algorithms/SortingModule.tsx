import React from "react";
import {
  type Algorithm,
  type AlgorithmStep,
  AlgorithmControls,
  AlgorithmInfo,
  useAlgorithmExecution,
} from "./BaseAlgorithmModule";

interface SortingData {
  array: number[];
  maxValue: number;
}

// Bubble Sort
const bubbleSort = (data: SortingData): AlgorithmStep[] => {
  const steps: AlgorithmStep[] = [];
  const array = [...data.array];
  const n = array.length;

  steps.push({
    data: { array: [...array], maxValue: data.maxValue },
    message: "Starting Bubble Sort - comparing adjacent elements",
    highlights: { current: [] },
  });

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      steps.push({
        data: { array: [...array], maxValue: data.maxValue },
        message: `Comparing elements at positions ${j} and ${j + 1}: ${array[j]} vs ${array[j + 1]}`,
        highlights: {
          comparing: [j, j + 1],
          sorted: Array.from({ length: i }, (_, k) => n - 1 - k),
        },
      });

      if (array[j] > array[j + 1]) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];

        steps.push({
          data: { array: [...array], maxValue: data.maxValue },
          message: `Swapped ${array[j + 1]} and ${array[j]}`,
          highlights: {
            swapping: [j, j + 1],
            sorted: Array.from({ length: i }, (_, k) => n - 1 - k),
          },
        });
      }
    }
  }

  steps.push({
    data: { array: [...array], maxValue: data.maxValue },
    message: "Bubble Sort completed! Array is now sorted.",
    highlights: {
      sorted: Array.from({ length: n }, (_, i) => i),
    },
  });

  return steps;
};

// Quick Sort
const quickSort = (data: SortingData): AlgorithmStep[] => {
  const steps: AlgorithmStep[] = [];
  const array = [...data.array];

  steps.push({
    data: { array: [...array], maxValue: data.maxValue },
    message: "Starting Quick Sort - divide and conquer approach",
    highlights: {},
  });

  const partition = (low: number, high: number): number => {
    const pivot = array[high];
    let i = low - 1;

    steps.push({
      data: { array: [...array], maxValue: data.maxValue },
      message: `Partitioning with pivot ${pivot} at position ${high}`,
      highlights: { current: [high] },
    });

    for (let j = low; j < high; j++) {
      steps.push({
        data: { array: [...array], maxValue: data.maxValue },
        message: `Comparing ${array[j]} with pivot ${pivot}`,
        highlights: {
          comparing: [j],
          current: [high],
        },
      });

      if (array[j] < pivot) {
        i++;
        if (i !== j) {
          [array[i], array[j]] = [array[j], array[i]];
          steps.push({
            data: { array: [...array], maxValue: data.maxValue },
            message: `Swapped ${array[i]} and ${array[j]} - moving smaller element left`,
            highlights: {
              swapping: [i, j],
              current: [high],
            },
          });
        }
      }
    }

    [array[i + 1], array[high]] = [array[high], array[i + 1]];
    steps.push({
      data: { array: [...array], maxValue: data.maxValue },
      message: `Placing pivot ${pivot} in correct position ${i + 1}`,
      highlights: {
        swapping: [i + 1, high],
      },
    });

    return i + 1;
  };

  const quickSortHelper = (low: number, high: number) => {
    if (low < high) {
      const pi = partition(low, high);
      quickSortHelper(low, pi - 1);
      quickSortHelper(pi + 1, high);
    }
  };

  quickSortHelper(0, array.length - 1);

  steps.push({
    data: { array: [...array], maxValue: data.maxValue },
    message: "Quick Sort completed!",
    highlights: {
      sorted: Array.from({ length: array.length }, (_, i) => i),
    },
  });

  return steps;
};

// Merge Sort
const mergeSort = (data: SortingData): AlgorithmStep[] => {
  const steps: AlgorithmStep[] = [];
  const array = [...data.array];

  steps.push({
    data: { array: [...array], maxValue: data.maxValue },
    message: "Starting Merge Sort - divide and conquer with merging",
    highlights: {},
  });

  const merge = (left: number, mid: number, right: number) => {
    const leftArr = array.slice(left, mid + 1);
    const rightArr = array.slice(mid + 1, right + 1);
    let i = 0,
      j = 0,
      k = left;

    steps.push({
      data: { array: [...array], maxValue: data.maxValue },
      message: `Merging subarrays [${left}..${mid}] and [${mid + 1}..${right}]`,
      highlights: {
        comparing: Array.from(
          { length: right - left + 1 },
          (_, idx) => left + idx,
        ),
      },
    });

    while (i < leftArr.length && j < rightArr.length) {
      if (leftArr[i] <= rightArr[j]) {
        array[k] = leftArr[i];
        i++;
      } else {
        array[k] = rightArr[j];
        j++;
      }
      k++;

      steps.push({
        data: { array: [...array], maxValue: data.maxValue },
        message: `Placed ${array[k - 1]} in position ${k - 1}`,
        highlights: {
          current: [k - 1],
          comparing: Array.from(
            { length: right - left + 1 },
            (_, idx) => left + idx,
          ),
        },
      });
    }

    while (i < leftArr.length) {
      array[k] = leftArr[i];
      i++;
      k++;
    }

    while (j < rightArr.length) {
      array[k] = rightArr[j];
      j++;
      k++;
    }
  };

  const mergeSortHelper = (left: number, right: number) => {
    if (left < right) {
      const mid = Math.floor((left + right) / 2);
      mergeSortHelper(left, mid);
      mergeSortHelper(mid + 1, right);
      merge(left, mid, right);
    }
  };

  mergeSortHelper(0, array.length - 1);

  steps.push({
    data: { array: [...array], maxValue: data.maxValue },
    message: "Merge Sort completed!",
    highlights: {
      sorted: Array.from({ length: array.length }, (_, i) => i),
    },
  });

  return steps;
};

// Selection Sort
const selectionSort = (data: SortingData): AlgorithmStep[] => {
  const steps: AlgorithmStep[] = [];
  const array = [...data.array];
  const n = array.length;

  steps.push({
    data: { array: [...array], maxValue: data.maxValue },
    message:
      "Starting Selection Sort - finding minimum element in each iteration",
    highlights: {},
  });

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;

    steps.push({
      data: { array: [...array], maxValue: data.maxValue },
      message: `Finding minimum element in remaining unsorted portion`,
      highlights: {
        current: [i],
        sorted: Array.from({ length: i }, (_, k) => k),
      },
    });

    for (let j = i + 1; j < n; j++) {
      steps.push({
        data: { array: [...array], maxValue: data.maxValue },
        message: `Comparing ${array[j]} with current minimum ${array[minIdx]}`,
        highlights: {
          comparing: [j, minIdx],
          current: [i],
          sorted: Array.from({ length: i }, (_, k) => k),
        },
      });

      if (array[j] < array[minIdx]) {
        minIdx = j;
      }
    }

    if (minIdx !== i) {
      [array[i], array[minIdx]] = [array[minIdx], array[i]];
      steps.push({
        data: { array: [...array], maxValue: data.maxValue },
        message: `Swapped ${array[i]} to position ${i}`,
        highlights: {
          swapping: [i, minIdx],
          sorted: Array.from({ length: i }, (_, k) => k),
        },
      });
    }
  }

  steps.push({
    data: { array: [...array], maxValue: data.maxValue },
    message: "Selection Sort completed!",
    highlights: {
      sorted: Array.from({ length: n }, (_, i) => i),
    },
  });

  return steps;
};

// Insertion Sort
const insertionSort = (data: SortingData): AlgorithmStep[] => {
  const steps: AlgorithmStep[] = [];
  const array = [...data.array];

  steps.push({
    data: { array: [...array], maxValue: data.maxValue },
    message:
      "Starting Insertion Sort - building sorted portion one element at a time",
    highlights: {},
  });

  for (let i = 1; i < array.length; i++) {
    let key = array[i];
    let j = i - 1;

    steps.push({
      data: { array: [...array], maxValue: data.maxValue },
      message: `Inserting ${key} into sorted portion`,
      highlights: {
        current: [i],
        sorted: Array.from({ length: i }, (_, k) => k),
      },
    });

    while (j >= 0 && array[j] > key) {
      steps.push({
        data: { array: [...array], maxValue: data.maxValue },
        message: `${array[j]} > ${key}, shifting right`,
        highlights: {
          comparing: [j, j + 1],
          sorted: Array.from({ length: i }, (_, k) => k),
        },
      });

      array[j + 1] = array[j];
      j--;

      steps.push({
        data: { array: [...array], maxValue: data.maxValue },
        message: `Shifted ${array[j + 2]} to the right`,
        highlights: {
          swapping: [j + 1, j + 2],
          sorted: Array.from({ length: i }, (_, k) => k),
        },
      });
    }

    array[j + 1] = key;

    steps.push({
      data: { array: [...array], maxValue: data.maxValue },
      message: `Placed ${key} in correct position`,
      highlights: {
        current: [j + 1],
        sorted: Array.from({ length: i + 1 }, (_, k) => k),
      },
    });
  }

  steps.push({
    data: { array: [...array], maxValue: data.maxValue },
    message: "Insertion Sort completed!",
    highlights: {
      sorted: Array.from({ length: array.length }, (_, i) => i),
    },
  });

  return steps;
};

const sortingAlgorithms: Algorithm[] = [
  {
    id: "bubble",
    name: "Bubble Sort",
    description:
      "Repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.",
    timeComplexity: "O(n²)",
    spaceComplexity: "O(1)",
    generate: () => {
      const array = Array.from(
        { length: 12 },
        () => Math.floor(Math.random() * 90) + 10,
      );
      return { array, maxValue: Math.max(...array) };
    },
    execute: bubbleSort,
  },
  {
    id: "quick",
    name: "Quick Sort",
    description:
      "Divides the array into partitions around a pivot element and recursively sorts the partitions.",
    timeComplexity: "O(n log n)",
    spaceComplexity: "O(log n)",
    generate: () => {
      const array = Array.from(
        { length: 12 },
        () => Math.floor(Math.random() * 90) + 10,
      );
      return { array, maxValue: Math.max(...array) };
    },
    execute: quickSort,
  },
  {
    id: "merge",
    name: "Merge Sort",
    description:
      "Divides the array into halves, recursively sorts them, and merges the sorted halves.",
    timeComplexity: "O(n log n)",
    spaceComplexity: "O(n)",
    generate: () => {
      const array = Array.from(
        { length: 12 },
        () => Math.floor(Math.random() * 90) + 10,
      );
      return { array, maxValue: Math.max(...array) };
    },
    execute: mergeSort,
  },
  {
    id: "selection",
    name: "Selection Sort",
    description:
      "Finds the minimum element and places it at the beginning. Repeats for the remaining unsorted portion.",
    timeComplexity: "O(n²)",
    spaceComplexity: "O(1)",
    generate: () => {
      const array = Array.from(
        { length: 12 },
        () => Math.floor(Math.random() * 90) + 10,
      );
      return { array, maxValue: Math.max(...array) };
    },
    execute: selectionSort,
  },
  {
    id: "insertion",
    name: "Insertion Sort",
    description:
      "Builds the final sorted array one item at a time. Very efficient for small datasets.",
    timeComplexity: "O(n²)",
    spaceComplexity: "O(1)",
    generate: () => {
      const array = Array.from(
        { length: 12 },
        () => Math.floor(Math.random() * 90) + 10,
      );
      return { array, maxValue: Math.max(...array) };
    },
    execute: insertionSort,
  },
];

interface SortingVisualizerProps {
  step: AlgorithmStep | null;
}

const SortingVisualizer: React.FC<SortingVisualizerProps> = ({ step }) => {
  if (!step || !step.data) {
    return (
      <div className="h-80 flex items-center justify-center text-gray-500">
        Generate data to start visualization
      </div>
    );
  }

  const { array, maxValue } = step.data;
  const highlights = step.highlights || {};

  return (
    <div className="h-80 flex items-end justify-center px-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
      {array.map((value: number, index: number) => {
        let barColor = "bg-blue-500";

        if (highlights.sorted?.includes(index)) barColor = "bg-green-500";
        else if (highlights.swapping?.includes(index)) barColor = "bg-red-500";
        else if (highlights.comparing?.includes(index))
          barColor = "bg-yellow-500";
        else if (highlights.current?.includes(index))
          barColor = "bg-purple-500";

        const height = (value / maxValue) * 280;

        return (
          <div key={index} className="flex flex-col items-center mx-1">
            <span className="text-xs mb-1 h-6 flex items-end">{value}</span>
            <div
              className={`${barColor} transition-all duration-300 rounded-t min-w-[20px] flex items-end justify-center text-white text-xs font-medium`}
              style={{
                height: `${Math.max(height, 20)}px`,
                width: `${Math.max(300 / array.length, 20)}px`,
              }}
            />
          </div>
        );
      })}
    </div>
  );
};

interface SortingModuleProps {
  className?: string;
}

const SortingModule: React.FC<SortingModuleProps> = ({ className = "" }) => {
  const [selectedAlgorithm, setSelectedAlgorithm] = React.useState(
    sortingAlgorithms[0],
  );
  const [showInfo, setShowInfo] = React.useState(false);
  const [arraySize, setArraySize] = React.useState(12);

  // Create stable algorithm with current array size
  const currentAlgorithm = React.useMemo(() => {
    if (!selectedAlgorithm) return null;
    return {
      ...selectedAlgorithm,
      generate: () => {
        const array = Array.from(
          { length: arraySize },
          () => Math.floor(Math.random() * 90) + 10,
        );
        return { array, maxValue: Math.max(...array) };
      },
    };
  }, [selectedAlgorithm, arraySize]);

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
                const algorithm = sortingAlgorithms.find(
                  (alg) => alg.id === e.target.value,
                );
                if (algorithm) setSelectedAlgorithm(algorithm);
              }}
              className="flex-1 min-w-[200px] p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-sm"
            >
              {sortingAlgorithms.map((algorithm) => (
                <option key={algorithm.id} value={algorithm.id}>
                  {algorithm.name} ({algorithm.timeComplexity})
                </option>
              ))}
            </select>
          </div>

          {/* Size Control */}
          <div className="flex items-center gap-3">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">
              Size: {arraySize}
            </label>
            <input
              type="range"
              min="5"
              max="20"
              value={arraySize}
              onChange={(e) => setArraySize(parseInt(e.target.value))}
              className="w-24 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-600"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={controls.randomize}
              className="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
            >
              New Array
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
          canRandomize={false}
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
        <SortingVisualizer
          step={
            currentStepData ||
            (data
              ? { data, message: "Click Play to start sorting", highlights: {} }
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
          <div className="w-4 h-4 bg-blue-500 rounded"></div>
          <span>Unsorted</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-yellow-500 rounded"></div>
          <span>Comparing</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-500 rounded"></div>
          <span>Swapping</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-purple-500 rounded"></div>
          <span>Current</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-500 rounded"></div>
          <span>Sorted</span>
        </div>
      </div>
    </div>
  );
};

export default SortingModule;
