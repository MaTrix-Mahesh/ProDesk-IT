import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function SuccessScreen({ data, onStartOver }) {
  return (
    <div className="text-center py-4 space-y-8 animate-fade-in">
      <div className="relative inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-xl shadow-slate-900/20">
        <Sparkles className="h-6 w-6 text-indigo-400" />
        <div className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Registration complete</h2>
        <p className="text-sm text-slate-500 mt-2">Your developer environment setup has been saved successfully.</p>
      </div>

      <div className="rounded-2xl border border-slate-200/60 bg-linear-to-b from-slate-50/50 to-white p-6 text-left text-sm space-y-4 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 pb-3 border-b border-slate-100">
          <span className="text-xs font-bold uppercase text-slate-400 tracking-wider">Account Identity</span>
          <span className="font-semibold text-slate-800">{data.firstName} {data.lastName}</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 pb-3 border-b border-slate-100">
          <span className="text-xs font-bold uppercase text-slate-400 tracking-wider">Date of Birth</span>
          <span className="font-medium text-slate-700">{data.dob}</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
          <span className="text-xs font-bold uppercase text-slate-400 tracking-wider">Primary Access Email</span>
          <span className="font-semibold text-indigo-600 break-all text-left sm:text-right">{data.email}</span>
        </div>
      </div>

      <div className="pt-2">
        <button
          type="button"
          onClick={onStartOver}
          className="w-full flex h-12 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white text-sm font-semibold text-slate-700 shadow-xs hover:bg-slate-50 hover:border-slate-300 active:scale-[0.99] transition-all cursor-pointer"
        >
          Start Over
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}