import React from "react";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  RotateCcw,
  Shuffle,
  Info,
} from "lucide-react";

export interface AlgorithmStep {
  data: any;
  message: string;
  highlights?: {
    comparing?: number[];
    swapping?: number[];
    sorted?: number[];
    visited?: number[];
    current?: number[];
    path?: number[];
  };
}

export interface Algorithm {
  id: string;
  name: string;
  description: string;
  timeComplexity: string;
  spaceComplexity: string;
  generate: () => any;
  execute: (data: any) => AlgorithmStep[];
}

export interface BaseAlgorithmModuleProps {
  algorithms: Algorithm[];
  title: string;
  className?: string;
}

export interface AlgorithmControlsProps {
  isPlaying: boolean;
  currentStep: number;
  totalSteps: number;
  speed: number;
  showInfo: boolean;
  onPlay: () => void;
  onPause: () => void;
  onReset: () => void;
  onPrevStep: () => void;
  onNextStep: () => void;
  onSpeedChange: (speed: number) => void;
  onRandomize: () => void;
  onToggleInfo: () => void;
  canRandomize?: boolean;
  showRandomize?: boolean;
  showInfoButton?: boolean;
}

export const AlgorithmControls: React.FC<AlgorithmControlsProps> = ({
  isPlaying,
  currentStep,
  totalSteps,
  speed,
  showInfo,
  onPlay,
  onPause,
  onReset,
  onPrevStep,
  onNextStep,
  onSpeedChange,
  onRandomize,
  onToggleInfo,
  canRandomize = true,
  showRandomize = true,
  showInfoButton = true,
}) => {
  return (
    <div className="flex items-center justify-between bg-white dark:bg-gray-700 rounded-lg p-3 border border-gray-200 dark:border-gray-600">
      {/* Left: Playback Controls */}
      <div className="flex items-center gap-2">
        <button
          onClick={isPlaying ? onPause : onPlay}
          disabled={totalSteps === 0}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
        >
          {isPlaying ? (
            <Pause className="w-4 h-4 mr-2" />
          ) : (
            <Play className="w-4 h-4 mr-2" />
          )}
          {isPlaying ? "Pause" : "Play"}
        </button>

        <div className="flex items-center bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600">
          <button
            onClick={onPrevStep}
            disabled={currentStep === 0}
            className="px-2 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed rounded-l-lg"
            title="Previous step"
          >
            <SkipBack className="w-4 h-4" />
          </button>

          <div className="px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 border-x border-gray-200 dark:border-gray-600 min-w-[4rem] text-center">
            {totalSteps > 0 ? `${currentStep + 1}/${totalSteps}` : "0/0"}
          </div>

          <button
            onClick={onNextStep}
            disabled={currentStep >= totalSteps - 1}
            className="px-2 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed rounded-r-lg"
            title="Next step"
          >
            <SkipForward className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Right: Speed + Reset */}
      <div className="flex items-center gap-3">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">
          Speed:
        </label>
        <input
          type="range"
          min="1"
          max="100"
          value={speed}
          onChange={(e) => onSpeedChange(parseInt(e.target.value))}
          className="w-20 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-600"
        />
        <span className="text-sm text-gray-600 dark:text-gray-400 min-w-[2.5rem] text-right">
          {speed}%
        </span>

        <button
          onClick={onReset}
          className="px-2 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          title="Reset"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export const AlgorithmInfo: React.FC<{ algorithm: Algorithm }> = ({
  algorithm,
}) => {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
          ℹ️
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-blue-900 dark:text-blue-100 mb-2">
            {algorithm.name}
          </h3>
          <p className="text-blue-800 dark:text-blue-200 mb-4 leading-relaxed">
            {algorithm.description}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white/50 dark:bg-black/20 rounded-lg p-3">
              <div className="text-sm font-medium text-blue-900 dark:text-blue-200 mb-1">
                Time Complexity
              </div>
              <code className="text-lg font-bold bg-blue-100 dark:bg-blue-800 text-blue-900 dark:text-blue-100 px-3 py-1 rounded">
                {algorithm.timeComplexity}
              </code>
            </div>
            <div className="bg-white/50 dark:bg-black/20 rounded-lg p-3">
              <div className="text-sm font-medium text-blue-900 dark:text-blue-200 mb-1">
                Space Complexity
              </div>
              <code className="text-lg font-bold bg-blue-100 dark:bg-blue-800 text-blue-900 dark:text-blue-100 px-3 py-1 rounded">
                {algorithm.spaceComplexity}
              </code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const useAlgorithmExecution = (algorithm: Algorithm | null) => {
  const [data, setData] = React.useState<any>(null);
  const [steps, setSteps] = React.useState<AlgorithmStep[]>([]);
  const [currentStep, setCurrentStep] = React.useState(0);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [speed, setSpeed] = React.useState(50);
  const intervalRef = React.useRef<NodeJS.Timeout | null>(null);

  // Generate initial data
  const generateData = React.useCallback(() => {
    if (!algorithm) return;
    const newData = algorithm.generate();
    setData(newData);
    setSteps([]);
    setCurrentStep(0);
    setIsPlaying(false);
  }, [algorithm]);

  // Execute algorithm
  const executeAlgorithm = React.useCallback(() => {
    if (!algorithm || !data) return;
    const newSteps = algorithm.execute(data);
    setSteps(newSteps);
    setCurrentStep(0);
  }, [algorithm, data]);

  // Auto-play functionality
  React.useEffect(() => {
    if (isPlaying && currentStep < steps.length - 1) {
      intervalRef.current = setTimeout(
        () => setCurrentStep((prev) => prev + 1),
        1100 - speed * 10,
      );
    } else {
      setIsPlaying(false);
    }

    return () => {
      if (intervalRef.current) clearTimeout(intervalRef.current);
    };
  }, [isPlaying, currentStep, steps.length, speed]);

  // Generate data when algorithm changes
  React.useEffect(() => {
    generateData();
  }, [generateData]);

  // Execute when data changes
  React.useEffect(() => {
    if (data) executeAlgorithm();
  }, [executeAlgorithm]);

  const controls = {
    play: () => {
      if (steps.length === 0) executeAlgorithm();
      setIsPlaying(true);
    },
    pause: () => setIsPlaying(false),
    reset: () => {
      setIsPlaying(false);
      setCurrentStep(0);
    },
    nextStep: () => {
      if (currentStep < steps.length - 1) {
        setCurrentStep((prev) => prev + 1);
      }
    },
    prevStep: () => {
      if (currentStep > 0) {
        setCurrentStep((prev) => prev - 1);
      }
    },
    randomize: generateData,
    setSpeed,
  };

  return {
    data,
    steps,
    currentStep,
    isPlaying,
    speed,
    controls,
    currentStepData: steps[currentStep] || null,
  };
};
