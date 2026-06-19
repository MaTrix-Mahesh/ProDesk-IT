import { WifiOff, Search, AlertTriangle, RotateCcw } from 'lucide-react';
import { motion } from 'framer-motion';

// 1. Network / General API Error Card
export const NetworkError = ({ message = "Failed to load movie data. Please check your connection.", onRetry }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass-panel max-w-md mx-auto p-8 rounded-2xl text-center border-red-500/20 shadow-2xl flex flex-col items-center gap-5 my-8"
    >
      <div className="p-4 rounded-full bg-red-500/10 border border-red-500/20 text-red-500">
        <WifiOff size={40} className="animate-pulse" />
      </div>
      <div>
        <h3 className="text-xl font-bold text-white mb-2">Network Connection Issue</h3>
        <p className="text-sm text-gray-400 leading-relaxed">{message}</p>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-red-600 hover:bg-red-500 text-white font-semibold text-sm transition-all duration-300 shadow-[0_4px_15px_rgba(220,38,38,0.3)] hover:shadow-[0_4px_20px_rgba(220,38,38,0.5)] focus:ring-2 focus:ring-red-500 outline-none"
        >
          <RotateCcw size={16} />
          Retry Request
        </button>
      )}
    </motion.div>
  );
};

// 2. Search No Results Error Card
export const NoResultsFound = ({ query = "" }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass-panel max-w-md mx-auto p-8 rounded-2xl text-center shadow-2xl flex flex-col items-center gap-5 my-8"
    >
      <div className="p-4 rounded-full bg-white/5 border border-white/10 text-gray-400">
        <Search size={40} />
      </div>
      <div>
        <h3 className="text-xl font-bold text-white mb-2">No Results Found</h3>
        <p className="text-sm text-gray-400 leading-relaxed">
          We couldn't find any movies matching <span className="text-red-500 font-semibold">"{query}"</span>.
        </p>
        <p className="text-xs text-gray-500 mt-2">Try checking for typos, or use more general keywords.</p>
      </div>
    </motion.div>
  );
};

// 3. Movie Not Available Spotlight / Details Error Card
export const MovieNotAvailable = ({ title = "this movie" }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass-panel w-full max-w-lg mx-auto p-8 rounded-2xl text-center border-yellow-500/20 shadow-2xl flex flex-col items-center gap-4 my-6"
    >
      <div className="p-3.5 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-500">
        <AlertTriangle size={32} />
      </div>
      <div>
        <h4 className="text-lg font-bold text-white mb-1">Movie Not Available</h4>
        <p className="text-sm text-gray-400">
          We found a match for <span className="italic text-yellow-400 font-medium">"{title}"</span>, but its streaming data is currently unavailable.
        </p>
      </div>
    </motion.div>
  );
};

// Default export is a wrapper for general error cases
export default NetworkError;
