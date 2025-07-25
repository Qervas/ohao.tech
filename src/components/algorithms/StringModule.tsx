import React from "react";
import {
  type Algorithm,
  type AlgorithmStep,
  AlgorithmControls,
  AlgorithmInfo,
  useAlgorithmExecution,
} from "./BaseAlgorithmModule";

interface StringData {
  text: string;
  pattern: string;
  textArray: string[];
  patternArray: string[];
}

// KMP String Matching
const kmpStringMatching = (data: StringData): AlgorithmStep[] => {
  const steps: AlgorithmStep[] = [];
  const { text, pattern } = data;

  // Build failure function
  const buildFailureFunction = (pattern: string) => {
    const failure = new Array(pattern.length).fill(0);
    let j = 0;

    for (let i = 1; i < pattern.length; i++) {
      if (pattern[i] === pattern[j]) {
        failure[i] = j + 1;
        j++;
      } else if (j > 0) {
        j = failure[j - 1];
        i--; // retry with same i
      } else {
        failure[i] = 0;
      }
    }

    return failure;
  };

  const failure = buildFailureFunction(pattern);
  let i = 0; // text index
  let j = 0; // pattern index

  steps.push({
    data: { ...data },
    message: `KMP: Searching for pattern "${pattern}" in text "${text}"`,
    highlights: {},
  });

  steps.push({
    data: { ...data, failure },
    message: `Built failure function: [${failure.join(", ")}]`,
    highlights: {},
  });

  while (i < text.length) {
    steps.push({
      data: { ...data, failure, textIndex: i, patternIndex: j },
      message: `Comparing text[${i}]='${text[i]}' with pattern[${j}]='${pattern[j]}'`,
      highlights: {
        comparing: [i],
        current: [j],
      },
    });

    if (text[i] === pattern[j]) {
      i++;
      j++;

      if (j === pattern.length) {
        steps.push({
          data: { ...data, failure, textIndex: i, patternIndex: j },
          message: `Pattern found at position ${i - j}!`,
          highlights: {
            sorted: Array.from(
              { length: pattern.length },
              (_, k) => i - pattern.length + k,
            ),
          },
        });
        j = failure[j - 1];
      }
    } else if (j > 0) {
      j = failure[j - 1];
      steps.push({
        data: { ...data, failure, textIndex: i, patternIndex: j },
        message: `Mismatch! Using failure function: j = ${j}`,
        highlights: {
          comparing: [i],
          current: [j],
        },
      });
    } else {
      i++;
    }
  }

  steps.push({
    data: { ...data, failure },
    message: "KMP string matching completed!",
    highlights: {},
  });

  return steps;
};

// Boyer-Moore String Matching (simplified bad character rule)
const boyerMooreStringMatching = (data: StringData): AlgorithmStep[] => {
  const steps: AlgorithmStep[] = [];
  const { text, pattern } = data;

  // Build bad character table
  const buildBadCharTable = (pattern: string) => {
    const table: { [key: string]: number } = {};
    for (let i = 0; i < pattern.length - 1; i++) {
      table[pattern[i]] = pattern.length - 1 - i;
    }
    return table;
  };

  const badCharTable = buildBadCharTable(pattern);
  let i = 0; // text index

  steps.push({
    data: { ...data },
    message: `Boyer-Moore: Searching for pattern "${pattern}" in text "${text}"`,
    highlights: {},
  });

  steps.push({
    data: { ...data, badCharTable },
    message: `Built bad character table: ${JSON.stringify(badCharTable)}`,
    highlights: {},
  });

  while (i <= text.length - pattern.length) {
    let j = pattern.length - 1; // pattern index (start from end)

    steps.push({
      data: { ...data, badCharTable, textIndex: i + j, patternIndex: j },
      message: `Aligning pattern at text position ${i}, comparing from right to left`,
      highlights: {
        current: Array.from({ length: pattern.length }, (_, k) => i + k),
      },
    });

    while (j >= 0 && text[i + j] === pattern[j]) {
      steps.push({
        data: { ...data, badCharTable, textIndex: i + j, patternIndex: j },
        message: `Match: text[${i + j}]='${text[i + j]}' = pattern[${j}]='${pattern[j]}'`,
        highlights: {
          comparing: [i + j],
          visited: Array.from(
            { length: pattern.length - j },
            (_, k) => i + j + k,
          ),
        },
      });
      j--;
    }

    if (j < 0) {
      steps.push({
        data: { ...data, badCharTable, textIndex: i, patternIndex: 0 },
        message: `Pattern found at position ${i}!`,
        highlights: {
          sorted: Array.from({ length: pattern.length }, (_, k) => i + k),
        },
      });
      i++;
    } else {
      const badChar = text[i + j];
      const shift = badCharTable[badChar] || pattern.length;

      steps.push({
        data: { ...data, badCharTable, textIndex: i + j, patternIndex: j },
        message: `Mismatch: text[${i + j}]='${badChar}' ≠ pattern[${j}]='${pattern[j]}'. Shifting by ${shift}`,
        highlights: {
          comparing: [i + j],
          swapping: [i + j],
        },
      });

      i += shift;
    }
  }

  steps.push({
    data: { ...data, badCharTable },
    message: "Boyer-Moore string matching completed!",
    highlights: {},
  });

  return steps;
};

// Rabin-Karp String Matching
const rabinKarpStringMatching = (data: StringData): AlgorithmStep[] => {
  const steps: AlgorithmStep[] = [];
  const { text, pattern } = data;
  const base = 256;
  const prime = 101;

  const calculateHash = (str: string, start: number, length: number) => {
    let hash = 0;
    for (let i = 0; i < length; i++) {
      hash = (hash * base + str.charCodeAt(start + i)) % prime;
    }
    return hash;
  };

  const patternHash = calculateHash(pattern, 0, pattern.length);
  let textHash = calculateHash(text, 0, pattern.length);

  steps.push({
    data: { ...data },
    message: `Rabin-Karp: Searching for pattern "${pattern}" in text "${text}"`,
    highlights: {},
  });

  steps.push({
    data: { ...data, patternHash, textHash },
    message: `Pattern hash: ${patternHash}`,
    highlights: {},
  });

  for (let i = 0; i <= text.length - pattern.length; i++) {
    if (i > 0) {
      // Rolling hash calculation
      const oldChar = text.charCodeAt(i - 1);
      const newChar = text.charCodeAt(i + pattern.length - 1);
      textHash =
        (base * (textHash - oldChar * Math.pow(base, pattern.length - 1)) +
          newChar) %
        prime;
      if (textHash < 0) textHash += prime;
    }

    steps.push({
      data: { ...data, patternHash, textHash, currentPosition: i },
      message: `Position ${i}: Text hash = ${textHash}, Pattern hash = ${patternHash}`,
      highlights: {
        current: Array.from({ length: pattern.length }, (_, k) => i + k),
      },
    });

    if (textHash === patternHash) {
      // Verify character by character
      let match = true;
      for (let j = 0; j < pattern.length; j++) {
        steps.push({
          data: { ...data, patternHash, textHash, currentPosition: i },
          message: `Hash match! Verifying: text[${i + j}]='${text[i + j]}' vs pattern[${j}]='${pattern[j]}'`,
          highlights: {
            comparing: [i + j],
            current: Array.from({ length: pattern.length }, (_, k) => i + k),
          },
        });

        if (text[i + j] !== pattern[j]) {
          match = false;
          steps.push({
            data: { ...data, patternHash, textHash, currentPosition: i },
            message: `Character mismatch - false positive!`,
            highlights: {
              swapping: [i + j],
            },
          });
          break;
        }
      }

      if (match) {
        steps.push({
          data: { ...data, patternHash, textHash, currentPosition: i },
          message: `Pattern found at position ${i}!`,
          highlights: {
            sorted: Array.from({ length: pattern.length }, (_, k) => i + k),
          },
        });
      }
    }
  }

  steps.push({
    data: { ...data, patternHash, textHash },
    message: "Rabin-Karp string matching completed!",
    highlights: {},
  });

  return steps;
};

const stringAlgorithms: Algorithm[] = [
  {
    id: "kmp",
    name: "KMP String Matching",
    description:
      "Knuth-Morris-Pratt algorithm for efficient pattern matching using failure function to avoid redundant comparisons.",
    timeComplexity: "O(n + m)",
    spaceComplexity: "O(m)",
    generate: () => {
      const texts = [
        "ABABCABABA",
        "ABAAABCDABABCABCABCDAB",
        "AABAACAADAABAABA",
        "ABCDEFGHIJKLMNOP",
      ];
      const patterns = ["ABABA", "ABCAB", "AABA", "KLMN"];

      const textIndex = Math.floor(Math.random() * texts.length);
      const text = texts[textIndex];
      const pattern = patterns[textIndex];

      return {
        text,
        pattern,
        textArray: text.split(""),
        patternArray: pattern.split(""),
      };
    },
    execute: kmpStringMatching,
  },
  {
    id: "boyer-moore",
    name: "Boyer-Moore String Matching",
    description:
      "Efficient string matching algorithm that scans the pattern from right to left and uses bad character rule for skipping.",
    timeComplexity: "O(nm)",
    spaceComplexity: "O(σ)",
    generate: () => {
      const texts = [
        "ABAAABCDABABCABCABCDAB",
        "ABABCABABA",
        "WHICH-FINALLY-HALTS-AT-THIS-POINT",
        "ABCDEFGHIJKLMNOP",
      ];
      const patterns = ["ABCAB", "ABABA", "AT-THIS", "KLMN"];

      const textIndex = Math.floor(Math.random() * texts.length);
      const text = texts[textIndex];
      const pattern = patterns[textIndex];

      return {
        text,
        pattern,
        textArray: text.split(""),
        patternArray: pattern.split(""),
      };
    },
    execute: boyerMooreStringMatching,
  },
  {
    id: "rabin-karp",
    name: "Rabin-Karp String Matching",
    description:
      "Uses rolling hash function to find pattern matches. Efficient for multiple pattern search.",
    timeComplexity: "O(nm)",
    spaceComplexity: "O(1)",
    generate: () => {
      const texts = [
        "ABABCABABA",
        "GEEKSFORGEEKS",
        "ABCCDDAEFG",
        "ABCDEFGHIJKLMNOP",
      ];
      const patterns = ["ABABA", "GEEK", "CDD", "DEFG"];

      const textIndex = Math.floor(Math.random() * texts.length);
      const text = texts[textIndex];
      const pattern = patterns[textIndex];

      return {
        text,
        pattern,
        textArray: text.split(""),
        patternArray: pattern.split(""),
      };
    },
    execute: rabinKarpStringMatching,
  },
];

interface StringVisualizerProps {
  step: AlgorithmStep | null;
}

const StringVisualizer: React.FC<StringVisualizerProps> = ({ step }) => {
  if (!step || !step.data) {
    return (
      <div className="h-80 flex items-center justify-center text-gray-500">
        Generate data to start visualization
      </div>
    );
  }

  const { text, pattern, textIndex, patternIndex } = step.data;
  const highlights = step.highlights || {};

  return (
    <div className="h-80 p-6 bg-gray-50 dark:bg-gray-900 rounded-lg">
      {/* Text Display */}
      <div className="mb-8">
        <div className="text-sm font-medium mb-2">Text:</div>
        <div className="flex flex-wrap gap-1 font-mono text-lg">
          {text.split("").map((char: string, index: number) => {
            let bgColor = "bg-gray-200 dark:bg-gray-700";
            let textColor = "text-gray-800 dark:text-gray-200";

            if (highlights.sorted?.includes(index)) {
              bgColor = "bg-green-500";
              textColor = "text-white";
            } else if (highlights.swapping?.includes(index)) {
              bgColor = "bg-red-500";
              textColor = "text-white";
            } else if (highlights.comparing?.includes(index)) {
              bgColor = "bg-yellow-500";
              textColor = "text-black";
            } else if (highlights.current?.includes(index)) {
              bgColor = "bg-blue-500";
              textColor = "text-white";
            } else if (highlights.visited?.includes(index)) {
              bgColor = "bg-purple-300";
              textColor = "text-black";
            }

            return (
              <span
                key={index}
                className={`${bgColor} ${textColor} px-2 py-1 rounded transition-all duration-300 min-w-[2rem] text-center`}
              >
                {char}
              </span>
            );
          })}
        </div>
        {typeof textIndex === "number" && (
          <div className="mt-2 text-xs text-gray-600 dark:text-gray-400">
            Text index: {textIndex}
          </div>
        )}
      </div>

      {/* Pattern Display */}
      <div className="mb-8">
        <div className="text-sm font-medium mb-2">Pattern:</div>
        <div className="flex flex-wrap gap-1 font-mono text-lg">
          {pattern.split("").map((char: string, index: number) => {
            let bgColor = "bg-gray-200 dark:bg-gray-700";
            let textColor = "text-gray-800 dark:text-gray-200";

            if (typeof patternIndex === "number" && index === patternIndex) {
              bgColor = "bg-orange-500";
              textColor = "text-white";
            }

            return (
              <span
                key={index}
                className={`${bgColor} ${textColor} px-2 py-1 rounded transition-all duration-300 min-w-[2rem] text-center`}
              >
                {char}
              </span>
            );
          })}
        </div>
        {typeof patternIndex === "number" && (
          <div className="mt-2 text-xs text-gray-600 dark:text-gray-400">
            Pattern index: {patternIndex}
          </div>
        )}
      </div>

      {/* Additional Info */}
      {step.data.failure && (
        <div className="mb-4">
          <div className="text-sm font-medium mb-2">Failure Function:</div>
          <div className="flex gap-1 font-mono text-sm">
            {step.data.failure.map((value: number, index: number) => (
              <span
                key={index}
                className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded min-w-[2rem] text-center"
              >
                {value}
              </span>
            ))}
          </div>
        </div>
      )}

      {step.data.patternHash && (
        <div className="mb-4">
          <div className="text-sm font-medium mb-2">Hash Values:</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Pattern Hash: {step.data.patternHash} | Text Hash:{" "}
            {step.data.textHash}
          </div>
        </div>
      )}

      {step.data.badCharTable && (
        <div className="mb-4">
          <div className="text-sm font-medium mb-2">Bad Character Table:</div>
          <div className="text-xs text-gray-600 dark:text-gray-400 font-mono">
            {JSON.stringify(step.data.badCharTable)}
          </div>
        </div>
      )}
    </div>
  );
};

interface StringModuleProps {
  className?: string;
}

const StringModule: React.FC<StringModuleProps> = ({ className = "" }) => {
  const [selectedAlgorithm, setSelectedAlgorithm] = React.useState(
    stringAlgorithms[0],
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
                const algorithm = stringAlgorithms.find(
                  (alg) => alg.id === e.target.value,
                );
                if (algorithm) setSelectedAlgorithm(algorithm);
              }}
              className="flex-1 min-w-[200px] p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-sm"
            >
              {stringAlgorithms.map((algorithm) => (
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
              New Pattern
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
        <StringVisualizer
          step={
            currentStepData ||
            (data
              ? {
                  data,
                  message: "Click Play to start string matching",
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
          <span>Normal</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-yellow-500 rounded"></div>
          <span>Comparing</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-blue-500 rounded"></div>
          <span>Current</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-orange-500 rounded"></div>
          <span>Pattern Index</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-500 rounded"></div>
          <span>Match Found</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-500 rounded"></div>
          <span>Mismatch</span>
        </div>
      </div>
    </div>
  );
};

export default StringModule;
