import React from 'react';
import { useFormContext } from 'react-hook-form';
import { ArrowLeft, ArrowUpRight, User, Mail } from 'lucide-react';

export default function ReviewSubmit({ onBack, isSubmitting }) {
  const { getValues, formState: { isValid } } = useFormContext();
  const values = getValues();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Review your details</h2>
        <p className="text-sm text-slate-500 mt-2">Double check your account attributes before deploying your environment profile.</p>
      </div>

      <div className="space-y-3 pt-2">
        {/* Section Personal Info */}
        <div className="rounded-2xl border border-slate-200/60 bg-slate-50/50 p-5 space-y-4">
          <div className="flex items-center gap-2 text-slate-900 font-semibold text-sm">
            <User className="h-4 w-4 text-slate-400" />
            <h3>Personal Profile</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-y-3 gap-x-4 border-t border-slate-200/50 pt-3 text-sm">
            <div>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">First Name</span>
              <span className="font-medium text-slate-800 break-words mt-0.5 block">{values.firstName}</span>
            </div>
            <div>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Last Name</span>
              <span className="font-medium text-slate-800 break-words mt-0.5 block">{values.lastName}</span>
            </div>
            <div>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Date of Birth</span>
              <span className="font-medium text-slate-800 mt-0.5 block">{values.dob}</span>
            </div>
          </div>
        </div>

        {/* Section Account Details */}
        <div className="rounded-2xl border border-slate-200/60 bg-slate-50/50 p-5 space-y-4">
          <div className="flex items-center gap-2 text-slate-900 font-semibold text-sm">
            <Mail className="h-4 w-4 text-slate-400" />
            <h3>Account Access Identity</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-4 border-t border-slate-200/50 pt-3 text-sm">
            <div>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Email Address</span>
              <span className="font-medium text-slate-800 break-all mt-0.5 block">{values.email}</span>
            </div>
            <div>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Password Mapping</span>
              <span className="font-mono text-slate-300 tracking-widest mt-1.5 block text-xs">••••••••••••••••</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col-reverse sm:flex-row gap-3 pt-4">
        <button
          type="button"
          onClick={onBack}
          disabled={isSubmitting}
          className="flex h-12 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white/80 px-5 text-sm font-semibold text-slate-700 hover:bg-slate-50 active:scale-[0.99] transition-all cursor-pointer disabled:opacity-50"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>
        <button
          type="submit"
          disabled={!isValid || isSubmitting}
          className="flex-1 flex h-12 items-center justify-center gap-2 rounded-xl bg-indigo-600 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 hover:bg-indigo-700 active:scale-[0.99] focus:ring-4 focus:ring-indigo-500/20 transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed disabled:active:scale-100"
        >
          {isSubmitting ? 'Finalizing Core Profile...' : 'Complete Registration'}
          <ArrowUpRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}