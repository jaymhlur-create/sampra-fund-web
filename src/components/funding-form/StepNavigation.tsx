'use client';

import { STEPS } from '@/src/types/application';

interface StepNavigationProps {
  currentStep: number;
  onStepClick: (step: number) => void;
}

/**
 * StepNavigation Component
 * Displays progress indicator and allows step selection
 */
export default function StepNavigation({ currentStep, onStepClick }: StepNavigationProps) {
  return (
    <div className="mb-8">
      {/* Mobile progress text */}
      <div className="md:hidden mb-4">
        <p className="text-sm text-gray-600 font-semibold">
          Step {currentStep} of {STEPS.length}
        </p>
      </div>

      {/* Steps progress bar */}
      <div className="flex items-center justify-between gap-2 md:gap-1">
        {STEPS.map((step, index) => {
          const isCompleted = currentStep > step.number;
          const isCurrent = currentStep === step.number;

          return (
            <div key={step.number} className="flex items-center flex-1">
              {/* Step circle */}
              <button
                onClick={() => onStepClick(step.number)}
                disabled={currentStep < step.number}
                className={`
                  flex items-center justify-center w-10 h-10 rounded-full font-bold text-sm
                  transition-all duration-200 flex-shrink-0
                  ${
                    isCurrent
                      ? 'bg-yellow-400 text-gray-900 shadow-lg'
                      : isCompleted
                      ? 'bg-green-500 text-white cursor-pointer hover:bg-green-600'
                      : 'bg-gray-200 text-gray-500 cursor-not-allowed opacity-50'
                  }
                `}
                title={`${step.name}: ${step.description}`}
              >
                {isCompleted ? (
                  <span className="text-lg">✓</span>
                ) : (
                  <span>{step.number}</span>
                )}
              </button>

              {/* Connector line */}
              {index < STEPS.length - 1 && (
                <div
                  className={`
                    h-1 flex-1 mx-1
                    ${
                      isCompleted
                        ? 'bg-green-500'
                        : isCurrent
                        ? 'bg-yellow-400'
                        : 'bg-gray-200'
                    }
                  `}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Desktop step labels */}
      <div className="hidden md:flex gap-4 mt-6">
        <div className="flex-1">
          <p className="text-sm font-bold text-gray-900">
            {STEPS[currentStep - 1].name}
          </p>
          <p className="text-xs text-gray-600">
            {STEPS[currentStep - 1].description}
          </p>
        </div>
      </div>
    </div>
  );
}
