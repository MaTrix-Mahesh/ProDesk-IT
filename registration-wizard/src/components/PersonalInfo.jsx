import React, { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { User, Calendar, ArrowRight } from 'lucide-react';

export default function PersonalInfo({ onNext }) {
  const { register, formState: { errors, isValid }, trigger } = useFormContext();

  useEffect(() => {
    trigger(['firstName', 'lastName', 'dob']);
  }, [trigger]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Create your account</h2>
        <p className="text-sm text-slate-500 mt-2">Enter your credential information to register an account setup.</p>
      </div>

      <div className="space-y-4 pt-2">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="firstName" className="block text-xs font-bold text-slate-700 tracking-wide uppercase mb-2">First Name</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400 group-focus-within:text-indigo-500 transition-colors">
                <User className="h-4 w-4" />
              </div>
              <input
                id="firstName"
                type="text"
                placeholder="Jane"
                className={`block h-12 w-full pl-10 pr-4 bg-white/60 border rounded-xl text-sm transition-all outline-hidden focus:bg-white focus:ring-4 ${
                  errors.firstName 
                    ? 'border-red-300 focus:ring-red-500/10 focus:border-red-500' 
                    : 'border-slate-200 focus:ring-indigo-500/5 focus:border-indigo-500 shadow-xs'
                }`}
                {...register('firstName')}
              />
            </div>
            {errors.firstName && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.firstName.message}</p>}
          </div>

          <div>
            <label htmlFor="lastName" className="block text-xs font-bold text-slate-700 tracking-wide uppercase mb-2">Last Name</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400 group-focus-within:text-indigo-500 transition-colors">
                <User className="h-4 w-4" />
              </div>
              <input
                id="lastName"
                type="text"
                placeholder="Doe"
                className={`block h-12 w-full pl-10 pr-4 bg-white/60 border rounded-xl text-sm transition-all outline-hidden focus:bg-white focus:ring-4 ${
                  errors.lastName 
                    ? 'border-red-300 focus:ring-red-500/10 focus:border-red-500' 
                    : 'border-slate-200 focus:ring-indigo-500/5 focus:border-indigo-500 shadow-xs'
                }`}
                {...register('lastName')}
              />
            </div>
            {errors.lastName && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.lastName.message}</p>}
          </div>
        </div>

        <div>
          <label htmlFor="dob" className="block text-xs font-bold text-slate-700 tracking-wide uppercase mb-2">Date of Birth</label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400 group-focus-within:text-indigo-500 transition-colors">
              <Calendar className="h-4 w-4" />
            </div>
            <input
              id="dob"
              type="date"
              className={`block h-12 w-full pl-10 pr-4 bg-white/60 border rounded-xl text-sm transition-all outline-hidden focus:bg-white focus:ring-4 ${
                errors.dob 
                  ? 'border-red-300 focus:ring-red-500/10 focus:border-red-500' 
                  : 'border-slate-200 focus:ring-indigo-500/5 focus:border-indigo-500 shadow-xs'
              }`}
              {...register('dob')}
            />
          </div>
          {errors.dob && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.dob.message}</p>}
        </div>
      </div>

      <div className="pt-4">
        <button
          type="button"
          onClick={onNext}
          disabled={!isValid}
          className="w-full flex h-12 items-center justify-center gap-2 rounded-xl bg-slate-950 text-sm font-semibold text-white shadow-lg shadow-slate-950/10 hover:bg-slate-900 active:scale-[0.99] focus:ring-4 focus:ring-slate-950/10 transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed disabled:active:scale-100"
        >
          Continue
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>
    </div>
  );
}