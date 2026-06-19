import axios from 'axios';

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

// High-quality local mood-to-movie mapping for fallback when the API key fails or is offline.
// All titles here are guaranteed to exist in our MOCK_MOVIES database in tmdbApi.js
const MOOD_MOCK_MAP = {
  happy: "Spider-Man: Into the Spider-Verse",
  sad: "Whiplash",
  excited: "The Dark Knight",
  romantic: "The Lord of the Rings: The Return of the King",
  thoughtful: "Interstellar",
  mysterious: "Inception",
  chill: "Star Wars: A New Hope",
  epic: "Dune: Part Two",
  rebellious: "Pulp Fiction",
  classic: "The Godfather",
  action: "Avengers: Endgame",
  sci_fi: "The Matrix"
};

export const getMovieByMood = async (mood) => {
  const normalizedMood = mood.toLowerCase();

  // Helper function to find a fallback title by matching keywords in the mood input
  const getFallbackTitle = (inputMood) => {
    if (inputMood.includes('happ') || inputMood.includes('joy') || inputMood.includes('laugh') || inputMood.includes('fun')) {
      return MOOD_MOCK_MAP.happy;
    }
    if (inputMood.includes('sad') || inputMood.includes('cry') || inputMood.includes('depress') || inputMood.includes('blue')) {
      return MOOD_MOCK_MAP.sad;
    }
    if (inputMood.includes('excit') || inputMood.includes('thrill') || inputMood.includes('hype')) {
      return MOOD_MOCK_MAP.excited;
    }
    if (inputMood.includes('love') || inputMood.includes('romanc') || inputMood.includes('heart') || inputMood.includes('sweet')) {
      return MOOD_MOCK_MAP.romantic;
    }
    if (inputMood.includes('think') || inputMood.includes('mind') || inputMood.includes('deep') || inputMood.includes('philosoph')) {
      return MOOD_MOCK_MAP.thoughtful;
    }
    if (inputMood.includes('mystery') || inputMood.includes('detect') || inputMood.includes('puzzle')) {
      return MOOD_MOCK_MAP.mysterious;
    }
    if (inputMood.includes('chill') || inputMood.includes('relax') || inputMood.includes('calm') || inputMood.includes('lazy')) {
      return MOOD_MOCK_MAP.chill;
    }
    if (inputMood.includes('epic') || inputMood.includes('grand') || inputMood.includes('huge') || inputMood.includes('hero')) {
      return MOOD_MOCK_MAP.epic;
    }
    if (inputMood.includes('cool') || inputMood.includes('crime') || inputMood.includes('gritty')) {
      return MOOD_MOCK_MAP.rebellious;
    }
    if (inputMood.includes('old') || inputMood.includes('classic') || inputMood.includes('vintage') || inputMood.includes('father')) {
      return MOOD_MOCK_MAP.classic;
    }
    if (inputMood.includes('action') || inputMood.includes('fight') || inputMood.includes('superhero')) {
      return MOOD_MOCK_MAP.action;
    }
    if (inputMood.includes('sci-fi') || inputMood.includes('science') || inputMood.includes('space') || inputMood.includes('futur')) {
      return MOOD_MOCK_MAP.sci_fi;
    }
    
    // Pick a random fallback from the values of MOOD_MOCK_MAP
    const keys = Object.keys(MOOD_MOCK_MAP);
    const randomKey = keys[Math.floor(Math.random() * keys.length)];
    return MOOD_MOCK_MAP[randomKey];
  };

  // If no Gemini key is provided, or the placeholder key is active, use local mock immediately
  if (!GEMINI_API_KEY || GEMINI_API_KEY.includes('AQ.') === false || GEMINI_API_KEY.trim() === '') {
    return new Promise((resolve) => {
      setTimeout(() => resolve(getFallbackTitle(normalizedMood)), 500);
    });
  }

  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
      { 
        contents: [
          { 
            parts: [
              { 
                text: `Suggest one popular movie title for someone feeling: "${mood}". Return ONLY the movie title with no punctuation, notes, or descriptions. Try to recommend movies like: Interstellar, Inception, The Dark Knight, Dune, Spider-Man, Oppenheimer, The Matrix, or similar blockbusters.` 
              }
            ] 
          }
        ] 
      }
    );
    const candidate = response.data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (candidate) {
      return candidate.trim().replace(/['"“”]/g, '');
    }
    throw new Error("Invalid response from Gemini API");
  } catch (error) {
    console.error("Gemini API Error, falling back to local mood matching:", error);
    return getFallbackTitle(normalizedMood);
  }
};