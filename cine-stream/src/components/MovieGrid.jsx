import { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MovieCard from './MovieCard';
import { SkeletonCard } from './Loader';

export default function MovieGrid({ movies = [], isLoading = false, onLoadMore }) {
  const gridMovies = useMemo(() => (Array.isArray(movies) ? movies : []), [movies]);

  // Framer Motion container variants for staggered children entrance animations
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20
      }
    }
  };

  return (
    <div className="w-full">
      {/* Movie Grid */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6"
      >
        <AnimatePresence mode="popLayout">
          {gridMovies.map((movie, index) => (
            <motion.div
              key={`${movie.id}-${index}`} // unique key combining index in case of duplicate IDs
              variants={cardVariants}
              layout
            >
              <MovieCard movie={movie} />
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Append skeletons at the bottom of the grid when loading more */}
        {isLoading && gridMovies.length > 0 && (
          <>
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={`append-skeleton-${i}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <SkeletonCard />
              </motion.div>
            ))}
          </>
        )}
      </motion.div>

      {/* Initial load skeleton when grid is empty and loading */}
      {isLoading && gridMovies.length === 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {[...Array(10)].map((_, i) => (
            <SkeletonCard key={`initial-skeleton-${i}`} />
          ))}
        </div>
      )}

      {/* Traditional 'Load More' button as accessibility fallback if scroll listener fails */}
      {!isLoading && gridMovies.length > 0 && typeof onLoadMore === 'function' && (
        <div className="mt-12 flex justify-center">
          <button
            type="button"
            onClick={onLoadMore}
            className="px-8 py-3 rounded-full bg-white/5 border border-white/10 hover:bg-red-600 hover:border-red-600 hover:text-white transition-all duration-300 font-semibold tracking-wide shadow-lg hover:shadow-[0_4px_20px_rgba(239,68,68,0.4)] focus:ring-2 focus:ring-red-500 focus:outline-none"
          >
            Load More Movies
          </button>
        </div>
      )}
    </div>
  );
}

