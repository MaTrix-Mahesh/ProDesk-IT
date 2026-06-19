import React from 'react';
import { Check, User, Mail, ShieldAlert } from 'lucide-react';

export default function StepTracker({ step }) {
  const percentage = step === 1 ? 33 : step === 2 ? 66 : 100;
  
  const stepsConfig = [
    { id: 1, label: 'Profile', icon: User },
    { id: 2, label: 'Security', icon: Mail },
    { id: 3, label: 'Review', icon: ShieldAlert },
  ];

  return (
    <div className="mb-10">
      {/* Step Progress Bubble bar */}
      <div className="flex items-center justify-between mb-8 relative">
        {stepsConfig.map((s, index) => {
          const IconComponent = s.icon;
          const isCompleted = step > s.id;
          const isActive = step === s.id;

          return (
            <React.Fragment key={s.id}>
              <div className="flex flex-col items-center gap-2 z-10">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-2xl border transition-all duration-300 ${
                    isCompleted
                      ? 'bg-slate-900 border-slate-900 text-white shadow-md shadow-slate-900/10'
                      : isActive
                      ? 'bg-white border-indigo-600 text-indigo-600 shadow-lg shadow-indigo-600/10 ring-4 ring-indigo-50'
                      : 'bg-white border-slate-200 text-slate-400'
                  }`}
                >
                  {isCompleted ? <Check className="h-4 w-4" strokeWidth={3} /> : <IconComponent className="h-4 w-4" />}
                </div>
                <span
                  className={`text-xs font-semibold tracking-tight transition-colors duration-200 ${
                    isActive ? 'text-slate-900 font-bold' : 'text-slate-400'
                  }`}
                >
                  {s.label}
                </span>
              </div>
              {index < stepsConfig.length - 1 && (
                <div className="absolute top-5 left-0 w-full h-[2px] bg-slate-100 -z-0">
                  <div
                    className="h-full bg-slate-900 transition-all duration-500 ease-in-out"
                    style={{ width: step === 1 ? '20%' : step === 2 ? '70%' : '100%' }}
                  />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Numerical Micro Indicator */}
      <div className="space-y-2">
        <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    </div>
  );
}