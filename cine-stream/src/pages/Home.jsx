import { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, Heart, ChevronDown, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getMovies } from '../services/tmdbApi';
import { useDebounce } from '../hooks/useDebounce';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import SearchBar from '../components/SearchBar';
import MoodMatcher from '../components/MoodMatcher';
import MovieGrid from '../components/MovieGrid';
import { NetworkError, NoResultsFound } from '../components/ErrorMessage';

export const Home = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const catalogRef = useRef(null);
  const debouncedQuery = useDebounce(query, 500);

  // Core API Movie Fetching logic
  const fetchMoviesList = async (pageNum, searchQuery, isAppend = false) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await getMovies(pageNum, searchQuery);
      const results = res.data?.results || [];
      const totalP = res.data?.total_pages || 1;

      setMovies((prev) => {
        const combined = isAppend ? [...prev, ...results] : results;
        // Strip out duplicates by movie ID
        const seen = new Set();
        return combined.filter(movie => {
          if (seen.has(movie.id)) return false;
          seen.add(movie.id);
          return true;
        });
      });
      setTotalPages(totalP);
    } catch (err) {
      console.error("Error fetching movies in Home page:", err);
      setError(err.message || "Failed to load movie collections");
    } finally {
      setIsLoading(false);
    }
  };

  // Trigger fetch when debounced query changes
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchMoviesList(1, debouncedQuery, false);
  }, [debouncedQuery]);

  // Load more trigger for infinite scroll
  const handleLoadMore = useCallback(() => {
    if (page < totalPages && !isLoading) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchMoviesList(nextPage, debouncedQuery, true);
    }
  }, [page, totalPages, isLoading, debouncedQuery]);

  // Hook up infinite scroll sentinel
  const sentinelRef = useInfiniteScroll(handleLoadMore, isLoading);

  // Smooth scroll to movie list section
  const handleScrollToCatalog = () => {
    catalogRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <main className="min-h-screen bg-[#050508] pb-16">
      {/* 1. Large Cinematic Hero Banner */}
      <div className="relative h-[80vh] md:h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Image with Dark Vignette Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center brightness-[0.25] scale-105 transition-transform duration-1000" 
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1925&auto=format&fit=crop')` }}
        />
        {/* Netflix style bottom fade gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-transparent to-black/40 z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent z-10" />

        <div className="relative z-20 text-center px-6 max-w-4xl mx-auto flex flex-col items-center">
          {/* Animated Hero Tag */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/10 backdrop-blur-md border border-white/10 text-red-500 mb-4"
          >
            <Sparkles size={12} />
            <span>UNLIMITED CINEMATIC STREAMING</span>
          </motion.div>

          {/* Animated Main Title */}
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl sm:text-6xl md:text-7xl font-black mb-5 tracking-tight uppercase leading-[1.1]"
          >
            Discover Your Next <br/>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-600 via-rose-500 to-red-700 select-none">
              Favorite Movie
            </span>
          </motion.h1>

          {/* Animated Subtitle */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed font-light"
          >
            Browse thousands of curated blockbusters and discover hidden gems powered by smart AI recommendations.
          </motion.p>

          {/* Animated Call To Action Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-4 mt-8"
          >
            <button
              onClick={handleScrollToCatalog}
              className="flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-red-600 hover:bg-red-500 text-white font-bold text-sm md:text-base tracking-wide transition-all duration-300 shadow-[0_4px_20px_rgba(220,38,38,0.4)] hover:shadow-[0_4px_25px_rgba(220,38,38,0.6)] hover:scale-103"
            >
              <Play size={18} className="fill-white" />
              Explore Movies
            </button>
            <Link
              to="/favorites"
              className="flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/10 text-white font-bold text-sm md:text-base tracking-wide backdrop-blur-md transition-all duration-300 hover:scale-103"
            >
              <Heart size={18} />
              My Favorites
            </Link>
          </motion.div>

          {/* Scroll Down Hint */}
          <motion.div 
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            onClick={handleScrollToCatalog}
            className="absolute bottom-8 cursor-pointer text-gray-400 hover:text-white transition-colors flex flex-col items-center gap-1 z-20"
          >
            <span className="text-[10px] uppercase font-bold tracking-widest">Scroll Down</span>
            <ChevronDown size={18} />
          </motion.div>
        </div>
      </div>

      {/* 2. Main Content Container */}
      <div ref={catalogRef} className="px-6 md:px-12 max-w-[1440px] mx-auto -mt-6 relative z-30">
        
        {/* Search Experience Section */}
        <div className="mb-10 text-center">
          <h2 className="text-xl md:text-2xl font-bold text-white mb-2 tracking-tight">
            Search Movie Database
          </h2>
          <SearchBar query={query} onQueryChange={(val) => {
            setQuery(val);
            setPage(1);
          }} />
        </div>

        {/* AI Mood Matcher Widget */}
        <MoodMatcher />

        {/* Movie Catalog Header */}
        <div className="border-t border-white/5 pt-12 pb-6 flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-extrabold text-white tracking-tight uppercase">
              {query ? `Search Results for "${query}"` : 'Popular Releases'}
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              {movies.length} movies loaded
            </p>
          </div>
        </div>

        {/* 3. Movie Display Grid */}
        {error ? (
          <NetworkError message={error} onRetry={() => fetchMoviesList(page, query, page > 1)} />
        ) : movies.length === 0 && !isLoading ? (
          <NoResultsFound query={query} />
        ) : (
          <>
            <MovieGrid 
              movies={movies} 
              isLoading={isLoading} 
              onLoadMore={handleLoadMore} 
            />
            {/* Infinite Scroll Sentinel element */}
            {!isLoading && movies.length > 0 && (
              <div ref={sentinelRef} className="h-24 w-full flex items-center justify-center text-gray-600 text-xs mt-4">
                <span>Scanning horizon for more titles...</span>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
};

export default Home;