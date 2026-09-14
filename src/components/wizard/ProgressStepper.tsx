import { Check } from "lucide-react";

interface ProgressStepperProps {
  currentStep: number;
  totalSteps: number;
  stepLabels: string[];
}

export function ProgressStepper({ currentStep, totalSteps, stepLabels }: ProgressStepperProps) {
  const percentage = Math.round((currentStep / (totalSteps - 1)) * 100);

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-slate-400">
        <span>Step {currentStep + 1} of {totalSteps}: <strong className="text-orange-400">{stepLabels[currentStep]}</strong></span>
        <span>{percentage}% Completed</span>
      </div>

      {/* Progress Line */}
      <div className="h-2 w-full overflow-hidden rounded-full bg-slate-800">
        <div
          className="h-full bg-gradient-to-r from-orange-600 to-amber-500 transition-all duration-300 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>

      {/* Circle Indicators (Desktop view) */}
      <div className="hidden sm:flex justify-between items-center pt-2">
        {stepLabels.map((label, idx) => {
          const isCompleted = idx < currentStep;
          const isCurrent = idx === currentStep;

          return (
            <div key={idx} className="flex flex-col items-center gap-1.5 text-center">
              <div
                className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold transition-all ${
                  isCompleted
                    ? "bg-orange-500 text-white"
                    : isCurrent
                    ? "bg-orange-500/20 text-orange-400 ring-2 ring-orange-500"
                    : "bg-slate-800 text-slate-500"
                }`}
              >
                {isCompleted ? <Check className="h-4 w-4" /> : idx}
              </div>
              <span className={`text-[10px] max-w-[70px] leading-tight truncate ${isCurrent ? "text-orange-400 font-semibold" : "text-slate-500"}`}>
                {label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
