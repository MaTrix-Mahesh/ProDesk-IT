const Loader = () => (
  <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
    <div className="w-12 h-12 border-4 border-slate-200 border-t-brand-600 rounded-full animate-spin"></div>
    <p className="text-slate-500 font-medium tracking-wide">Syncing catalog data...</p>
  </div>
);

export default Loader;