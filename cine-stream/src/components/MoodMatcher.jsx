import { useState, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Send, Star, Clock, Heart } from 'lucide-react';
import { getMovieByMood } from '../services/aiApi';
import { getMovies } from '../services/tmdbApi';
import { FavoritesContext } from '../context/FavoritesContext';
import { MovieNotAvailable } from './ErrorMessage';

export default function MoodMatcher() {
  const { favorites, toggleFavorite } = useContext(FavoritesContext);
  const [moodInput, setMoodInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [recommendedMovie, setRecommendedMovie] = useState(null);
  const [error, setError] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState('');

  const moodPresets = [
    { label: '😊 Joyful & Fun', value: 'happy, funny, uplifting' },
    { label: '😢 Cozy & Melancholy', value: 'sad, emotional, deep drama' },
    { label: '🔥 Action Hype', value: 'action, high octane, epic fight' },
    { label: '😱 Spooky & Thrilling', value: 'scared, mystery, suspense thriller' },
    { label: '🌌 Mind-Bending', value: 'sci-fi, mind-bending, philosophical' },
    { label: '🍿 Relaxed Chill', value: 'chill, adventure, feel-good' }
  ];

  const handleRecommend = async (moodQuery) => {
    if (!moodQuery.trim()) return;

    setIsLoading(true);
    setError(false);
    setRecommendedMovie(null);

    try {
      // 1. Get the movie title recommendation from AI
      const title = await getMovieByMood(moodQuery);
      
      // 2. Search TMDB (or mock database) for that title to resolve full metadata
      const searchRes = await getMovies(1, title);
      const results = searchRes.data?.results || [];

      if (results.length > 0) {
        // Find best match (usually the first result)
        setRecommendedMovie(results[0]);
      } else {
        // Fallback: if search fails, try searching for a keyword in the title
        console.warn(`Movie title "${title}" not found. Trying keyword search.`);
        const firstWord = title.split(' ')[0];
        const backupRes = await getMovies(1, firstWord);
        const backupResults = backupRes.data?.results || [];
        if (backupResults.length > 0) {
          setRecommendedMovie(backupResults[0]);
        } else {
          setError(title || "Unknown recommendation");
        }
      }
    } catch (err) {
      console.error("Error matching mood:", err);
      setError("Failed to fetch recommendation");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setSelectedPreset('');
    handleRecommend(moodInput);
  };

  const handlePresetClick = (preset) => {
    setSelectedPreset(preset.label);
    setMoodInput('');
    handleRecommend(preset.value);
  };

  const isFav = recommendedMovie && favorites.some(m => m.id === recommendedMovie.id);

  return (
    <div className="glass-panel rounded-3xl p-6 md:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-white/5 relative overflow-hidden my-12">
      {/* Background radial gradient glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-red-600/10 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl -z-10 pointer-events-none" />

      {/* Header with AI Badge */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-[0_0_15px_rgba(220,38,38,0.4)] mb-3 select-none">
            <Sparkles size={12} className="animate-pulse" />
            <span>AI ENGINE ACTIVE</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            AI Mood Matcher
          </h2>
          <p className="text-gray-400 text-sm mt-1">
            Tell us how you are feeling, and our AI will curate the perfect movie spotlight.
          </p>
        </div>
      </div>

      {/* Main Layout: Preset chips + Custom input */}
      <div className="flex flex-col gap-6">
        {/* Preset Moods */}
        <div>
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-3">
            Quick Presets
          </span>
          <div className="flex flex-wrap gap-2.5">
            {moodPresets.map((preset) => (
              <button
                key={preset.label}
                onClick={() => handlePresetClick(preset)}
                disabled={isLoading}
                className={`px-4 py-2 rounded-xl text-xs md:text-sm font-medium border transition-all duration-300 ${
                  selectedPreset === preset.label
                    ? 'bg-red-600 border-red-500 text-white shadow-[0_0_15px_rgba(220,38,38,0.3)]'
                    : 'bg-[#12121a]/60 border-white/5 text-gray-300 hover:border-white/20 hover:bg-white/5'
                }`}
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>

        {/* Custom Input Form */}
        <form onSubmit={handleFormSubmit} className="flex gap-3">
          <div className="relative flex-grow">
            <input
              type="text"
              value={moodInput}
              onChange={(e) => setMoodInput(e.target.value)}
              placeholder="Or describe your mood... (e.g. 'I want a mind-bending space adventure that makes me question reality')"
              disabled={isLoading}
              className="w-full bg-[#0a0a0f]/80 border border-white/10 rounded-2xl px-5 py-4 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/30 transition-all duration-300"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading || !moodInput.trim()}
            className="px-6 rounded-2xl bg-gradient-to-r from-red-600 to-rose-600 text-white font-bold transition-all duration-300 hover:brightness-110 flex items-center justify-center gap-2 border border-red-500/20 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_4px_15px_rgba(220,38,38,0.2)]"
            aria-label="Submit mood search"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <Send size={16} />
                <span className="hidden sm:inline">Ask AI</span>
              </>
            )}
          </button>
        </form>
      </div>

      {/* Recommendations Output Spotlight */}
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="mt-8 p-6 rounded-2xl border border-white/5 bg-[#12121a]/40 text-center flex flex-col items-center gap-3"
          >
            <div className="w-10 h-10 border-4 border-red-600/30 border-t-red-600 rounded-full animate-spin" />
            <p className="text-sm text-gray-400">AI is scanning the cosmos for your mood match...</p>
          </motion.div>
        )}

        {error && !isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="mt-8"
          >
            <MovieNotAvailable title={typeof error === 'string' ? error : "Selected mood match"} />
          </motion.div>
        )}

        {recommendedMovie && !isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="mt-8"
          >
            <h3 className="text-sm font-semibold tracking-wider text-gray-500 uppercase mb-4 flex items-center gap-2">
              <span>Recommended For You</span>
              <span className="text-red-500 animate-pulse">✨</span>
            </h3>

            {/* Premium Horizontal Spotlight Card */}
            <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#0b0b10] flex flex-col md:flex-row min-h-[300px]">
              {/* Card background cover image underlay */}
              <div 
                className="absolute inset-0 bg-cover bg-center brightness-[0.15] opacity-40 blur-sm -z-10"
                style={{ 
                  backgroundImage: `url(${recommendedMovie.backdrop_path ? `https://image.tmdb.org/t/p/w1280${recommendedMovie.backdrop_path}` : (recommendedMovie.poster_path ? `https://image.tmdb.org/t/p/w500${recommendedMovie.poster_path}` : '')})` 
                }}
              />

              {/* Poster Thumbnail */}
              <div className="w-full md:w-1/3 max-w-[240px] shrink-0 p-4 md:p-6 flex items-center justify-center bg-black/40">
                <div className="w-full relative rounded-lg overflow-hidden aspect-[2/3] shadow-2xl border border-white/5">
                  <img
                    src={recommendedMovie.poster_path ? (recommendedMovie.poster_path.startsWith('http') ? recommendedMovie.poster_path : `https://image.tmdb.org/t/p/w500${recommendedMovie.poster_path}`) : '/placeholder.jpg'}
                    className="w-full h-full object-cover"
                    alt={recommendedMovie.title}
                  />
                  {recommendedMovie.vote_average && (
                    <div className="absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-bold bg-black/80 backdrop-blur-md border border-white/10 text-yellow-500 flex items-center gap-0.5">
                      <Star size={10} className="fill-yellow-500 text-yellow-500" />
                      <span>{Number(recommendedMovie.vote_average).toFixed(1)}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Details & Description Section */}
              <div className="flex-grow p-6 md:p-8 flex flex-col justify-between relative z-10">
                <div>
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider bg-red-600/10 text-red-500 border border-red-600/20 uppercase">
                      SPOTLIGHT
                    </span>
                    <span className="text-xs text-gray-400 font-medium">
                      {recommendedMovie.release_date ? new Date(recommendedMovie.release_date).getFullYear() : 'N/A'}
                    </span>
                    {recommendedMovie.vote_average && (
                      <span className="text-xs text-yellow-500 font-semibold flex items-center gap-1">
                        <Star size={12} className="fill-yellow-500" />
                        {Number(recommendedMovie.vote_average).toFixed(1)} / 10
                      </span>
                    )}
                  </div>

                  <h4 className="text-xl md:text-3xl font-black text-white leading-tight mb-3">
                    {recommendedMovie.title}
                  </h4>

                  <p className="text-sm text-gray-300 leading-relaxed max-w-xl font-light mb-6">
                    {recommendedMovie.overview || "No overview available for this recommendation."}
                  </p>
                </div>

                <div className="flex flex-wrap gap-4 items-center mt-auto">
                  {/* Toggle Favorites Action */}
                  <button
                    onClick={() => toggleFavorite(recommendedMovie)}
                    className={`flex items-center gap-2.5 px-6 py-3 rounded-xl font-bold text-sm transition-all duration-300 ${
                      isFav
                        ? 'bg-red-600 text-white shadow-[0_4px_15px_rgba(220,38,38,0.4)] hover:bg-red-500'
                        : 'bg-white text-black hover:bg-gray-200'
                    }`}
                  >
                    <Heart size={16} className={isFav ? "fill-white" : ""} />
                    {isFav ? 'Remove From Favorites' : 'Add To Favorites'}
                  </button>
                  
                  <div className="text-xs text-gray-500 flex items-center gap-1">
                    <Clock size={12} />
                    <span>Based on your AI query</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
