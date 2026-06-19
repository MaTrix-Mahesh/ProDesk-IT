import { useContext } from 'react';
import { motion } from 'framer-motion';
import { Heart, Star } from 'lucide-react';
import { FavoritesContext } from '../context/FavoritesContext';

export const MovieCard = ({ movie }) => {
  const { favorites, toggleFavorite } = useContext(FavoritesContext);
  const isFav = favorites.some(m => m.id === movie.id);

  // Safely extract the year from release_date or fallback to N/A
  const releaseYear = movie.release_date 
    ? new Date(movie.release_date).getFullYear() 
    : 'N/A';

  // Format rating to 1 decimal place or fallback
  const rating = movie.vote_average 
    ? Number(movie.vote_average).toFixed(1) 
    : null;

  return (
    <motion.div 
      whileHover={{ y: -8, scale: 1.04 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="relative group rounded-xl overflow-hidden bg-[#0d0d12] border border-white/5 shadow-2xl hover:shadow-[0_8px_30px_rgba(0,0,0,0.8)] hover:border-white/10 transition-all duration-300 flex flex-col h-full focus-within:ring-2 focus-within:ring-red-500 outline-none"
    >
      {/* Rating Badge (Top Left) */}
      {rating && (
        <div className="absolute top-3 left-3 z-30 px-2 py-0.5 rounded-md text-xs font-bold flex items-center gap-1 bg-black/60 backdrop-blur-md border border-white/10 text-yellow-500 select-none shadow-md">
          <Star size={12} className="fill-yellow-500 text-yellow-500" />
          <span>{rating}</span>
        </div>
      )}

      {/* Poster Container */}
      <div className="relative aspect-[2/3] overflow-hidden bg-gray-950 flex-grow">
        <img 
          src={movie.poster_path ? (movie.poster_path.startsWith('http') ? movie.poster_path : `https://image.tmdb.org/t/p/w500${movie.poster_path}`) : '/placeholder.jpg'}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108 group-hover:brightness-105"
          loading="lazy" 
          alt={`Poster of ${movie.title}`}
          onError={(e) => {
            // Fallback placeholder image if URL fails
            e.target.onerror = null;
            e.target.src = "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?q=80&w=500&auto=format&fit=crop";
          }}
        />
        
        {/* Dark Cinematic Gradient Overlay on Hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 z-20">
          <h3 className="font-bold text-white text-sm md:text-base line-clamp-2 leading-tight drop-shadow-md">{movie.title}</h3>
          
          <div className="flex items-center gap-2 mt-1 text-xs text-gray-300">
            <span className="font-medium text-gray-400">{releaseYear}</span>
            {rating && (
              <>
                <span className="text-gray-600">•</span>
                <span className="text-yellow-500 font-semibold">{rating} / 10</span>
              </>
            )}
          </div>
          
          {movie.overview && (
            <p className="text-[11px] text-gray-400 line-clamp-2 mt-2 leading-relaxed font-light">
              {movie.overview}
            </p>
          )}
        </div>
      </div>

      {/* Favorite Button (Top Right Floating) */}
      <motion.button 
        whileTap={{ scale: 0.9 }}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          toggleFavorite(movie);
        }}
        className={`absolute top-3 right-3 z-30 p-2.5 rounded-full transition-all duration-300 backdrop-blur-md border ${
          isFav 
            ? 'bg-red-500/25 border-red-500/35 text-red-500 shadow-[0_0_15px_rgba(239,68,68,0.4)]' 
            : 'bg-black/60 border-white/10 text-white hover:bg-white/10 hover:text-red-400'
        }`}
        aria-label={isFav ? `Remove ${movie.title} from favorites` : `Add ${movie.title} to favorites`}
      >
        <Heart 
          size={16} 
          className={`transition-all duration-300 ${isFav ? "fill-red-500 scale-110" : ""}`} 
        />
      </motion.button>
    </motion.div>
  );
};

export default MovieCard;