import React from "react";
import {
  type Algorithm,
  type AlgorithmStep,
  AlgorithmControls,
  AlgorithmInfo,
  useAlgorithmExecution,
} from "./BaseAlgorithmModule";

interface DPData {
  input: any;
  dp: number[][];
  result?: number;
  sequence?: any[];
  problem: string;
}

// Generate random data for different DP problems
const generateFibonacciData = (): DPData => {
  const n = Math.floor(Math.random() * 10) + 5; // 5-14
  return {
    input: n,
    dp: [],
    problem: "fibonacci",
  };
};

const generateKnapsackData = (): DPData => {
  const n = Math.floor(Math.random() * 4) + 3; // 3-6 items
  const capacity = Math.floor(Math.random() * 10) + 8; // 8-17 capacity
  const weights = Array.from(
    { length: n },
    () => Math.floor(Math.random() * 5) + 1,
  );
  const values = Array.from(
    { length: n },
    () => Math.floor(Math.random() * 8) + 2,
  );

  return {
    input: { weights, values, capacity, n },
    dp: [],
    problem: "knapsack",
  };
};

const generateLCSData = (): DPData => {
  const strings = [
    ["ABCDGH", "AEDFHR"],
    ["AGGTAB", "GXTXAYB"],
    ["STONE", "LONGEST"],
    ["ABCDEF", "ACBDEF"],
  ];
  const [str1, str2] = strings[Math.floor(Math.random() * strings.length)];

  return {
    input: { str1, str2 },
    dp: [],
    problem: "lcs",
  };
};

const generateCoinChangeData = (): DPData => {
  const coinSets = [
    [1, 3, 4],
    [1, 2, 5],
    [2, 3, 5],
    [1, 4, 5],
  ];
  const coins = coinSets[Math.floor(Math.random() * coinSets.length)];
  const amount = Math.floor(Math.random() * 8) + 6; // 6-13

  return {
    input: { coins, amount },
    dp: [],
    problem: "coinchange",
  };
};

// Fibonacci with DP
const fibonacciDP = (data: DPData): AlgorithmStep[] => {
  const steps: AlgorithmStep[] = [];
  const n = data.input;
  const dp = new Array(n + 1).fill(0);

  steps.push({
    data: { ...data, dp: [dp.slice()] },
    message: `Computing Fibonacci(${n}) using Dynamic Programming`,
    highlights: {},
  });

  // Base cases
  if (n >= 0) dp[0] = 0;
  if (n >= 1) dp[1] = 1;

  steps.push({
    data: { ...data, dp: [dp.slice()] },
    message: "Base cases: F(0) = 0, F(1) = 1",
    highlights: { current: [0, 1] },
  });

  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];

    steps.push({
      data: { ...data, dp: [dp.slice()] },
      message: `F(${i}) = F(${i - 1}) + F(${i - 2}) = ${dp[i - 1]} + ${dp[i - 2]} = ${dp[i]}`,
      highlights: {
        current: [i],
        comparing: [i - 1, i - 2],
      },
    });
  }

  steps.push({
    data: { ...data, dp: [dp.slice()], result: dp[n] },
    message: `Fibonacci(${n}) = ${dp[n]}`,
    highlights: { sorted: [n] },
  });

  return steps;
};

// 0/1 Knapsack
const knapsackDP = (data: DPData): AlgorithmStep[] => {
  const steps: AlgorithmStep[] = [];
  const { weights, values, capacity, n } = data.input;

  // dp[i][w] = maximum value with first i items and weight limit w
  const dp = Array(n + 1)
    .fill(null)
    .map(() => Array(capacity + 1).fill(0));

  steps.push({
    data: { ...data, dp: dp.map((row) => [...row]) },
    message: `0/1 Knapsack: ${n} items, capacity ${capacity}`,
    highlights: {},
  });

  steps.push({
    data: { ...data, dp: dp.map((row) => [...row]) },
    message:
      "Weights: [" +
      weights.join(", ") +
      "], Values: [" +
      values.join(", ") +
      "]",
    highlights: {},
  });

  // Fill base case (0 items)
  steps.push({
    data: { ...data, dp: dp.map((row) => [...row]) },
    message: "Base case: 0 items gives 0 value for any capacity",
    highlights: { current: [0] },
  });

  for (let i = 1; i <= n; i++) {
    for (let w = 0; w <= capacity; w++) {
      const weight = weights[i - 1];
      const value = values[i - 1];

      if (weight <= w) {
        // Can include this item
        const includeValue = value + dp[i - 1][w - weight];
        const excludeValue = dp[i - 1][w];

        dp[i][w] = Math.max(includeValue, excludeValue);

        steps.push({
          data: { ...data, dp: dp.map((row) => [...row]) },
          message: `Item ${i} (w=${weight}, v=${value}): Include=${includeValue} vs Exclude=${excludeValue} → ${dp[i][w]}`,
          highlights: {
            current: [i],
            comparing: [i - 1],
          },
        });
      } else {
        // Cannot include this item
        dp[i][w] = dp[i - 1][w];

        steps.push({
          data: { ...data, dp: dp.map((row) => [...row]) },
          message: `Item ${i} too heavy (${weight} > ${w}), exclude: ${dp[i][w]}`,
          highlights: {
            current: [i],
            swapping: [i - 1],
          },
        });
      }
    }
  }

  steps.push({
    data: { ...data, dp: dp.map((row) => [...row]), result: dp[n][capacity] },
    message: `Maximum value: ${dp[n][capacity]}`,
    highlights: { sorted: [n] },
  });

  return steps;
};

// Longest Common Subsequence
const lcsDP = (data: DPData): AlgorithmStep[] => {
  const steps: AlgorithmStep[] = [];
  const { str1, str2 } = data.input;
  const m = str1.length;
  const n = str2.length;

  // dp[i][j] = LCS length of str1[0..i-1] and str2[0..j-1]
  const dp = Array(m + 1)
    .fill(null)
    .map(() => Array(n + 1).fill(0));

  steps.push({
    data: { ...data, dp: dp.map((row) => [...row]) },
    message: `LCS of "${str1}" and "${str2}"`,
    highlights: {},
  });

  steps.push({
    data: { ...data, dp: dp.map((row) => [...row]) },
    message: "Base case: empty string has LCS length 0",
    highlights: { current: [0] },
  });

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (str1[i - 1] === str2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;

        steps.push({
          data: { ...data, dp: dp.map((row) => [...row]) },
          message: `Match: '${str1[i - 1]}' = '${str2[j - 1]}', LCS[${i}][${j}] = ${dp[i][j]}`,
          highlights: {
            current: [i],
            sorted: [i - 1],
          },
        });
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);

        steps.push({
          data: { ...data, dp: dp.map((row) => [...row]) },
          message: `No match: '${str1[i - 1]}' ≠ '${str2[j - 1]}', take max(${dp[i - 1][j]}, ${dp[i][j - 1]}) = ${dp[i][j]}`,
          highlights: {
            current: [i],
            comparing: [i - 1],
          },
        });
      }
    }
  }

  steps.push({
    data: { ...data, dp: dp.map((row) => [...row]), result: dp[m][n] },
    message: `LCS length: ${dp[m][n]}`,
    highlights: { sorted: [m] },
  });

  return steps;
};

// Coin Change (minimum coins)
const coinChangeDP = (data: DPData): AlgorithmStep[] => {
  const steps: AlgorithmStep[] = [];
  const { coins, amount } = data.input;

  // dp[i] = minimum coins needed for amount i
  const dp = Array(amount + 1).fill(Infinity);
  dp[0] = 0;

  steps.push({
    data: { ...data, dp: [dp.slice()] },
    message: `Coin Change: coins [${coins.join(", ")}], amount ${amount}`,
    highlights: {},
  });

  steps.push({
    data: { ...data, dp: [dp.slice()] },
    message: "Base case: 0 coins needed for amount 0",
    highlights: { current: [0] },
  });

  for (let i = 1; i <= amount; i++) {
    steps.push({
      data: { ...data, dp: [dp.slice()] },
      message: `Computing minimum coins for amount ${i}`,
      highlights: { current: [i] },
    });

    for (const coin of coins) {
      if (coin <= i) {
        const newValue = dp[i - coin] + 1;
        if (newValue < dp[i]) {
          dp[i] = newValue;

          steps.push({
            data: { ...data, dp: [dp.slice()] },
            message: `Using coin ${coin}: dp[${i}] = dp[${i - coin}] + 1 = ${dp[i - coin]} + 1 = ${dp[i]}`,
            highlights: {
              current: [i],
              comparing: [i - coin],
            },
          });
        }
      }
    }

    if (dp[i] === Infinity) {
      steps.push({
        data: { ...data, dp: [dp.slice()] },
        message: `No solution possible for amount ${i}`,
        highlights: { swapping: [i] },
      });
    }
  }

  const result = dp[amount] === Infinity ? -1 : dp[amount];
  steps.push({
    data: { ...data, dp: [dp.slice()], result },
    message:
      result === -1 ? "No solution possible" : `Minimum coins: ${result}`,
    highlights: { sorted: [amount] },
  });

  return steps;
};

const dpAlgorithms: Algorithm[] = [
  {
    id: "fibonacci",
    name: "Fibonacci DP",
    description:
      "Compute Fibonacci numbers using dynamic programming to avoid redundant calculations.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    generate: generateFibonacciData,
    execute: fibonacciDP,
  },
  {
    id: "knapsack",
    name: "0/1 Knapsack",
    description:
      "Find maximum value subset of items that fit in knapsack capacity.",
    timeComplexity: "O(nW)",
    spaceComplexity: "O(nW)",
    generate: generateKnapsackData,
    execute: knapsackDP,
  },
  {
    id: "lcs",
    name: "Longest Common Subsequence",
    description:
      "Find the length of longest subsequence common to two sequences.",
    timeComplexity: "O(mn)",
    spaceComplexity: "O(mn)",
    generate: generateLCSData,
    execute: lcsDP,
  },
  {
    id: "coinchange",
    name: "Coin Change",
    description: "Find minimum number of coins needed to make a given amount.",
    timeComplexity: "O(n×amount)",
    spaceComplexity: "O(amount)",
    generate: generateCoinChangeData,
    execute: coinChangeDP,
  },
];

interface DPVisualizerProps {
  step: AlgorithmStep | null;
}

const DPVisualizer: React.FC<DPVisualizerProps> = ({ step }) => {
  if (!step || !step.data) {
    return (
      <div className="h-96 flex items-center justify-center text-gray-500">
        Generate data to start visualization
      </div>
    );
  }

  const { dp, input, result, problem } = step.data;
  const highlights = step.highlights || {};

  const renderFibonacci = () => {
    if (typeof input !== "number") {
      return (
        <div className="text-center text-gray-500">
          Loading Fibonacci data...
        </div>
      );
    }

    const fibArray = dp && dp.length > 0 && dp[0] ? dp[0] : [];

    if (!Array.isArray(fibArray) || fibArray.length === 0) {
      return (
        <div className="text-center text-gray-500">
          Initializing DP array...
        </div>
      );
    }

    return (
      <div className="space-y-4">
        <div className="text-sm font-medium">
          Fibonacci Array (F(0) to F({input})):
        </div>
        <div className="flex flex-wrap gap-2">
          {fibArray.map((value: number, index: number) => {
            let bgColor = "bg-gray-200 dark:bg-gray-700";
            if (highlights.sorted?.includes(index))
              bgColor = "bg-red-500 text-white";
            else if (highlights.current?.includes(index))
              bgColor = "bg-purple-500 text-white";
            else if (highlights.comparing?.includes(index))
              bgColor = "bg-yellow-500";

            return (
              <div key={index} className="text-center">
                <div className="text-xs mb-1">F({index})</div>
                <div
                  className={`${bgColor} px-3 py-2 rounded font-mono min-w-[3rem] transition-all duration-300`}
                >
                  {value}
                </div>
              </div>
            );
          })}
        </div>
        {result !== undefined && (
          <div className="text-center text-lg font-bold text-green-600 dark:text-green-400">
            Result: F({input}) = {result}
          </div>
        )}
      </div>
    );
  };

  const renderKnapsack = () => {
    if (!input || !input.weights || !input.values || !input.capacity) {
      return (
        <div className="text-center text-gray-500">
          Loading knapsack data...
        </div>
      );
    }

    const { weights, values, capacity, n } = input;

    if (!Array.isArray(dp) || dp.length === 0) {
      return (
        <div className="text-center text-gray-500">
          Initializing DP table...
        </div>
      );
    }

    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <div className="font-medium mb-2">Items:</div>
            {weights.map((w: number, i: number) => (
              <div
                key={i}
                className="flex justify-between p-2 bg-gray-100 dark:bg-gray-700 rounded mb-1"
              >
                <span>Item {i + 1}</span>
                <span>
                  W:{w} V:{values[i]}
                </span>
              </div>
            ))}
          </div>
          <div>
            <div className="font-medium mb-2">DP Table:</div>
            <div className="overflow-auto max-h-48">
              <table className="text-xs border-collapse">
                <thead>
                  <tr>
                    <th className="border p-1">i\\w</th>
                    {Array.from({ length: capacity + 1 }, (_, w) => (
                      <th key={w} className="border p-1">
                        {w}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {dp.map((row: number[], i: number) => (
                    <tr key={i}>
                      <td className="border p-1 font-semibold">{i}</td>
                      {row.map((cell: number, j: number) => {
                        let bgColor = "";
                        if (highlights.current?.includes(i))
                          bgColor = "bg-purple-200";
                        else if (highlights.comparing?.includes(i))
                          bgColor = "bg-yellow-200";
                        else if (highlights.sorted?.includes(i))
                          bgColor = "bg-green-200";

                        return (
                          <td
                            key={j}
                            className={`border p-1 text-center ${bgColor}`}
                          >
                            {cell}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {result !== undefined && (
          <div className="text-center text-lg font-bold text-green-600 dark:text-green-400">
            Maximum Value: {result}
          </div>
        )}
      </div>
    );
  };

  const renderLCS = () => {
    if (!input || !input.str1 || !input.str2) {
      return (
        <div className="text-center text-gray-500">Loading LCS data...</div>
      );
    }

    const { str1, str2 } = input;

    if (!Array.isArray(dp) || dp.length === 0) {
      return (
        <div className="text-center text-gray-500">
          Initializing DP table...
        </div>
      );
    }

    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="font-medium mb-2">Strings:</div>
            <div className="space-y-2">
              <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded font-mono">
                String 1: "{str1}"
              </div>
              <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded font-mono">
                String 2: "{str2}"
              </div>
            </div>
          </div>
          <div>
            <div className="font-medium mb-2">LCS Table:</div>
            <div className="overflow-auto max-h-48">
              <table className="text-xs border-collapse">
                <thead>
                  <tr>
                    <th className="border p-1"></th>
                    <th className="border p-1">ε</th>
                    {str2.split("").map((char: string, i: number) => (
                      <th key={i} className="border p-1">
                        {char}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {dp.map((row: number[], i: number) => (
                    <tr key={i}>
                      <td className="border p-1 font-semibold">
                        {i === 0 ? "ε" : str1[i - 1]}
                      </td>
                      {row.map((cell: number, j: number) => {
                        let bgColor = "";
                        if (highlights.current?.includes(i))
                          bgColor = "bg-purple-200";
                        else if (highlights.comparing?.includes(i))
                          bgColor = "bg-yellow-200";
                        else if (highlights.sorted?.includes(i))
                          bgColor = "bg-green-200";

                        return (
                          <td
                            key={j}
                            className={`border p-1 text-center ${bgColor}`}
                          >
                            {cell}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {result !== undefined && (
          <div className="text-center text-lg font-bold text-green-600 dark:text-green-400">
            LCS Length: {result}
          </div>
        )}
      </div>
    );
  };

  const renderCoinChange = () => {
    if (!input || !input.coins || !input.amount) {
      return (
        <div className="text-center text-gray-500">
          Loading coin change data...
        </div>
      );
    }

    const { coins, amount } = input;
    const coinArray = dp && dp.length > 0 && dp[0] ? dp[0] : [];

    if (!Array.isArray(coinArray) || coinArray.length === 0) {
      return (
        <div className="text-center text-gray-500">
          Initializing DP table...
        </div>
      );
    }

    return (
      <div className="space-y-4">
        <div className="text-sm">
          <div className="font-medium mb-2">
            Coins: [{coins.join(", ")}], Target: {amount}
          </div>
        </div>
        <div className="text-sm font-medium">
          DP Array (minimum coins for each amount):
        </div>
        <div className="flex flex-wrap gap-2">
          {coinArray.map((value: number, index: number) => {
            let bgColor = "bg-gray-200 dark:bg-gray-700";
            if (highlights.sorted?.includes(index))
              bgColor = "bg-red-500 text-white";
            else if (highlights.current?.includes(index))
              bgColor = "bg-purple-500 text-white";
            else if (highlights.comparing?.includes(index))
              bgColor = "bg-yellow-500";
            else if (highlights.swapping?.includes(index))
              bgColor = "bg-red-300";

            const displayValue = value === Infinity ? "∞" : value.toString();

            return (
              <div key={index} className="text-center">
                <div className="text-xs mb-1">{index}</div>
                <div
                  className={`${bgColor} px-3 py-2 rounded font-mono min-w-[3rem] transition-all duration-300`}
                >
                  {displayValue}
                </div>
              </div>
            );
          })}
        </div>
        {result !== undefined && (
          <div className="text-center text-lg font-bold text-green-600 dark:text-green-400">
            {result === -1 ? "No Solution" : `Minimum Coins: ${result}`}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="h-96 p-6 bg-gray-50 dark:bg-gray-900 rounded-lg overflow-y-auto">
      {problem === "fibonacci" && renderFibonacci()}
      {problem === "knapsack" && renderKnapsack()}
      {problem === "lcs" && renderLCS()}
      {problem === "coinchange" && renderCoinChange()}
    </div>
  );
};

interface DynamicProgrammingModuleProps {
  className?: string;
}

const DynamicProgrammingModule: React.FC<DynamicProgrammingModuleProps> = ({
  className = "",
}) => {
  const [selectedAlgorithm, setSelectedAlgorithm] = React.useState(
    dpAlgorithms[0],
  );
  const [showInfo, setShowInfo] = React.useState(false);

  const {
    data,
    steps,
    currentStep,
    isPlaying,
    speed,
    controls,
    currentStepData,
  } = useAlgorithmExecution(selectedAlgorithm);

  return (
    <div className={`p-6 ${className}`}>
      {/* Unified Controls - Single Compact Row */}
      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 mb-6 space-y-4">
        {/* Top Row: Algorithm + Actions */}
        <div className="flex flex-wrap items-center gap-4">
          {/* Algorithm Selection */}
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">
              Algorithm:
            </label>
            <select
              value={selectedAlgorithm.id}
              onChange={(e) => {
                const algorithm = dpAlgorithms.find(
                  (alg) => alg.id === e.target.value,
                );
                if (algorithm) setSelectedAlgorithm(algorithm);
              }}
              className="flex-1 min-w-[200px] p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-sm"
            >
              {dpAlgorithms.map((algorithm) => (
                <option key={algorithm.id} value={algorithm.id}>
                  {algorithm.name} ({algorithm.timeComplexity})
                </option>
              ))}
            </select>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={controls.randomize}
              className="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
            >
              New Problem
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
        <DPVisualizer
          step={
            currentStepData ||
            (data
              ? {
                  data,
                  message: "Click Play to start dynamic programming algorithm",
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
          <div className="w-4 h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <span>Unprocessed</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-yellow-500 rounded"></div>
          <span>Dependencies</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-purple-500 rounded"></div>
          <span>Computing</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-500 rounded"></div>
          <span>Result</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-500 rounded"></div>
          <span>Final Answer</span>
        </div>
      </div>
    </div>
  );
};

export default DynamicProgrammingModule;
