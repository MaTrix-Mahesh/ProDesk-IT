import { useContext } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Film, ArrowLeft, Plus } from 'lucide-react';
import { FavoritesContext } from '../context/FavoritesContext';
import MovieGrid from '../components/MovieGrid';

export default function Favorites() {
  const { favorites } = useContext(FavoritesContext);
  const count = favorites?.length || 0;

  // Empty State Render
  if (count === 0) {
    return (
      <div className="min-h-screen bg-[#050508] pt-28 pb-16 px-6 flex flex-col items-center justify-center text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-md w-full flex flex-col items-center gap-6 glass-panel p-10 rounded-3xl border-white/5 relative"
        >
          {/* Subtle glow light */}
          <div className="absolute inset-0 bg-red-600/5 rounded-3xl blur-2xl pointer-events-none -z-10" />

          {/* SVG Movie Reel / Film Illustration */}
          <div className="relative p-6 rounded-full bg-red-500/10 text-red-500 border border-red-500/20">
            <svg 
              className="w-16 h-16" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6h16.5M3.75 12h16.5M3.75 18h16.5M7.5 3.75v16.5M16.5 3.75v16.5" />
            </svg>
            <div className="absolute -bottom-1 -right-1 p-1.5 rounded-full bg-black border border-white/10 text-white">
              <Plus size={12} />
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white mb-2">Your Collection is Empty</h2>
            <p className="text-sm text-gray-400 leading-relaxed px-4">
              No favorites yet. Start building your personal movie collection and save movies to watch later.
            </p>
          </div>

          <Link
            to="/"
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-red-600 hover:bg-red-500 text-white font-bold text-sm tracking-wide transition-all duration-300 shadow-[0_4px_15px_rgba(220,38,38,0.3)] hover:shadow-[0_4px_20px_rgba(220,38,38,0.5)]"
          >
            <Film size={16} />
            Explore Movie Database
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050508] pt-28 pb-16 px-6 md:px-12">
      <div className="max-w-[1440px] mx-auto">
        
        {/* Back Link */}
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-xs font-semibold text-gray-500 hover:text-white uppercase tracking-wider transition-colors mb-6"
        >
          <ArrowLeft size={14} />
          Back to Home
        </Link>

        {/* Premium Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-white/5 pb-8 mb-10 gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight uppercase">
              My Favorites Collection
            </h1>
            <p className="text-sm text-gray-400 mt-1">
              Your personalized list of titles you love.
            </p>
          </div>

          {/* Count Badge */}
          <div className="flex items-center gap-2.5 self-start sm:self-auto px-4 py-2 rounded-2xl glass-panel text-sm font-bold border-white/10 text-red-500 shadow-md select-none">
            <Film size={16} />
            <span>{count} {count === 1 ? 'Title Saved' : 'Titles Saved'}</span>
          </div>
        </div>

        {/* Movies Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <MovieGrid movies={favorites} />
        </motion.div>
        
      </div>
    </div>
  );
}

