import React, { useState, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { Mail, Lock, Eye, EyeOff, ArrowLeft, ArrowRight } from 'lucide-react';

export default function AccountDetails({ onNext, onBack }) {
  const { register, formState: { errors, isValid }, trigger } = useFormContext();
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  useEffect(() => {
    trigger(['email', 'password', 'confirmPassword']);
  }, [trigger]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Secure your account</h2>
        <p className="text-sm text-slate-500 mt-2">Provide unique access credentials to authenticate dashboard sessions.</p>
      </div>

      <div className="space-y-4 pt-2">
        <div>
          <label htmlFor="email" className="block text-xs font-bold text-slate-700 tracking-wide uppercase mb-2">Email Address</label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400 group-focus-within:text-indigo-500 transition-colors">
              <Mail className="h-4 w-4" />
            </div>
            <input
              id="email"
              type="email"
              placeholder="name@domain.com"
              className={`block h-12 w-full pl-10 pr-4 bg-white/60 border rounded-xl text-sm transition-all outline-hidden focus:bg-white focus:ring-4 ${
                errors.email 
                  ? 'border-red-300 focus:ring-red-500/10 focus:border-red-500' 
                  : 'border-slate-200 focus:ring-indigo-500/5 focus:border-indigo-500 shadow-xs'
              }`}
              {...register('email')}
            />
          </div>
          {errors.email && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.email.message}</p>}
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="password" className="block text-xs font-bold text-slate-700 tracking-wide uppercase mb-2">Password</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400 group-focus-within:text-indigo-500 transition-colors">
                <Lock className="h-4 w-4" />
              </div>
              <input
                id="password"
                type={showPass ? 'text' : 'password'}
                placeholder="••••••••"
                className={`block h-12 w-full pl-10 pr-11 bg-white/60 border rounded-xl text-sm transition-all outline-hidden focus:bg-white focus:ring-4 ${
                  errors.password 
                    ? 'border-red-300 focus:ring-red-500/10 focus:border-red-500' 
                    : 'border-slate-200 focus:ring-indigo-500/5 focus:border-indigo-500 shadow-xs'
                }`}
                {...register('password')}
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
              >
                {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {errors.password && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.password.message}</p>}
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-xs font-bold text-slate-700 tracking-wide uppercase mb-2">Confirm Password</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400 group-focus-within:text-indigo-500 transition-colors">
                <Lock className="h-4 w-4" />
              </div>
              <input
                id="confirmPassword"
                type={showConfirmPass ? 'text' : 'password'}
                placeholder="••••••••"
                className={`block h-12 w-full pl-10 pr-11 bg-white/60 border rounded-xl text-sm transition-all outline-hidden focus:bg-white focus:ring-4 ${
                  errors.confirmPassword 
                    ? 'border-red-300 focus:ring-red-500/10 focus:border-red-500' 
                    : 'border-slate-200 focus:ring-indigo-500/5 focus:border-indigo-500 shadow-xs'
                }`}
                {...register('confirmPassword')}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPass(!showConfirmPass)}
                className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
              >
                {showConfirmPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {errors.confirmPassword && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.confirmPassword.message}</p>}
          </div>
        </div>
      </div>

      <div className="flex flex-col-reverse sm:flex-row gap-3 pt-4">
        <button
          type="button"
          onClick={onBack}
          className="flex h-12 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white/80 px-5 text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-300 active:scale-[0.99] transition-all cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>
        <button
          type="button"
          onClick={onNext}
          disabled={!isValid}
          className="flex-1 flex h-12 items-center justify-center gap-2 rounded-xl bg-slate-950 text-sm font-semibold text-white shadow-lg shadow-slate-950/10 hover:bg-slate-900 active:scale-[0.99] focus:ring-4 focus:ring-slate-950/10 transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed disabled:active:scale-100"
        >
          Continue
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}