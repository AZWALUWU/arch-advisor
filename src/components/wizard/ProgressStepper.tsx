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
      <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#E1DCC9]/70">
        <span>
          Step {currentStep + 1} of {totalSteps}:{" "}
          <strong className="text-[#E1DCC9]">{stepLabels[currentStep]}</strong>
        </span>
        <span>{percentage}% Completed</span>
      </div>

      {/* Progress Line */}
      <div className="h-2 w-full overflow-hidden rounded-full bg-[#1F150C]">
        <div
          className="h-full bg-[#412D15] transition-all duration-300 ease-out"
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
                    ? "bg-[#412D15] text-[#E1DCC9] border border-[#E1DCC9]"
                    : isCurrent
                    ? "bg-[#1F150C] text-[#E1DCC9] ring-2 ring-[#412D15]"
                    : "bg-[#1F150C]/60 text-[#E1DCC9]/40 border border-[#412D15]/50"
                }`}
              >
                {isCompleted ? <Check className="h-4 w-4" /> : idx}
              </div>
              <span
                className={`text-[10px] max-w-[70px] leading-tight truncate ${
                  isCurrent ? "text-[#E1DCC9] font-semibold" : "text-[#E1DCC9]/50"
                }`}
              >
                {label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
