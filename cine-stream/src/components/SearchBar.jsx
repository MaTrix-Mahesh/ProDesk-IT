import { useState } from 'react';
import { Search, X } from 'lucide-react';

export default function SearchBar({ query = '', onQueryChange }) {
  const [isFocused, setIsFocused] = useState(false);

  const handleClear = () => {
    if (typeof onQueryChange === 'function') onQueryChange('');
  };

  return (
    <div className="w-full max-w-2xl mx-auto my-6 px-4">
      <div 
        className={`relative flex items-center transition-all duration-300 rounded-full bg-white/5 border ${
          isFocused 
            ? 'border-red-600/50 shadow-[0_0_15px_rgba(239,68,68,0.25)] bg-[#0d0d12]' 
            : 'border-white/10 hover:border-white/20'
        }`}
      >
        <div className="absolute left-5 text-gray-400 pointer-events-none flex items-center justify-center">
          <Search size={18} className={`transition-colors duration-300 ${isFocused ? 'text-red-500' : 'text-gray-400'}`} />
        </div>
        
        <input
          type="text"
          value={query}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChange={(e) => {
            if (typeof onQueryChange === 'function') onQueryChange(e.target.value);
          }}
          placeholder="Search for movies by title..."
          className="w-full bg-transparent pl-12 pr-12 py-3.5 text-sm md:text-base text-white placeholder-gray-500 outline-none rounded-full"
          aria-label="Search movies"
        />

        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-5 p-1 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Clear search query"
          >
            <X size={16} />
          </button>
        )}
      </div>
    </div>
  );
}

