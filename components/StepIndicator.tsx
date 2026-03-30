"use client";

import { Check } from "lucide-react";

type StepIndicatorProps = {
  currentStep: number;
};

const steps = [
  { id: 1, label: "Personal" },
  { id: 2, label: "Services" },
  { id: 3, label: "Payment" },
];

export default function StepIndicator({ currentStep }: StepIndicatorProps) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-4 md:p-5">
        {steps.map((step, index) => {
          const isCompleted = currentStep > step.id;
          const isActive = currentStep === step.id;
          const isLast = index === steps.length - 1;

          return (
            <div key={step.id} className="flex items-center flex-1">
              <div className="flex items-center gap-3">
                <div
                  className={[
                    "w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300",
                    isCompleted
                      ? "bg-teal-600 text-white"
                      : isActive
                        ? "bg-teal-700 text-white"
                        : "border border-slate-200 bg-white text-slate-500",
                  ].join(" ")}
                >
                  {isCompleted ? <Check className="w-4 h-4" /> : step.id}
                </div>
                <span className="text-sm md:text-base font-medium text-slate-700">{step.label}</span>
              </div>
              {!isLast && <div className="mx-3 h-[2px] flex-1 bg-slate-200" aria-hidden="true" />}
            </div>
          );
        })}
      </div>
    </div>
  );
}
