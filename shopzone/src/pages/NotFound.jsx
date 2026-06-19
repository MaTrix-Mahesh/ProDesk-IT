import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, ArrowLeft } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6 py-12">
      <div className="max-w-md w-full bg-white border border-slate-100 rounded-3xl p-8 md:p-10 shadow-xl shadow-slate-100/50 text-center space-y-8 animate-scale">
        
        {/* Animated Compass Icon Graphic */}
        <div className="relative w-28 h-28 mx-auto flex items-center justify-center bg-slate-50 rounded-full border border-slate-100">
          <div className="absolute inset-0 rounded-full bg-brand-500/5 animate-ping opacity-75"></div>
          <Compass className="w-14 h-14 text-brand-600 animate-pulse" />
        </div>

        {/* Text Heading Content */}
        <div className="space-y-3">
          <span className="text-sm font-bold text-brand-600 uppercase tracking-widest bg-brand-50 px-3 py-1 rounded-full">
            Error 404
          </span>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Lost in Navigation
          </h1>
          <p className="text-slate-500 text-sm md:text-base leading-relaxed">
            The destination route parameter you are attempting to query does not map to any active inventory state or storefront index.
          </p>
        </div>

        {/* Back Button Action */}
        <div className="pt-2">
          <Link
            to="/"
            className="w-full inline-flex items-center justify-center space-x-2 bg-slate-900 hover:bg-brand-600 text-white font-bold py-4 rounded-xl transition-all duration-300 shadow-lg shadow-slate-900/10 hover:shadow-brand-500/20 active:scale-[0.99]"
          >
            <ArrowLeft size={16} />
            <span>Return to Storefront</span>
          </Link>
        </div>

      </div>
    </div>
  );
};

export default NotFound;
