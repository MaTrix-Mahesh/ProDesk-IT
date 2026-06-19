import axios from 'axios';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

const tmdbApi = axios.create({
  baseURL: BASE_URL,
  params: { api_key: API_KEY }
});

// High-quality mock movie database fallback for testing/evaluation when TMDB key is not present or fails
const MOCK_MOVIES = [
  {
    id: 157336,
    title: "Interstellar",
    poster_path: "/gEU2Qv0w3tJv7vVjIu542t2qiyc.jpg",
    backdrop_path: "/xJHokn84oSO2EkqNfzh68AUEjuC.jpg",
    release_date: "2014-11-05",
    vote_average: 8.4,
    overview: "The adventures of a group of explorers who make use of a newly discovered wormhole to surpass the limitations on human space travel and conquer the vast distances involved in an interstellar voyage."
  },
  {
    id: 155,
    title: "The Dark Knight",
    poster_path: "/qJ2tW6WMUD49jWJBozLkOR4IE23.jpg",
    backdrop_path: "/nMKdUUepdz8gflg4Fz4wJ2gKs3I.jpg",
    release_date: "2008-07-16",
    vote_average: 8.5,
    overview: "Batman raises the stakes in his war on crime. With the help of Lt. Jim Gordon and District Attorney Harvey Dent, Batman sets out to dismantle the remaining criminal organizations that plague the streets."
  },
  {
    id: 27205,
    title: "Inception",
    poster_path: "/o0O4CNOUXa6Jz8KiJm9zi4K63Z5.jpg",
    backdrop_path: "/s3TBrRGB1K7jYjK76r6il1z40G7.jpg",
    release_date: "2010-07-15",
    vote_average: 8.4,
    overview: "Cobb, a skilled thief who is the absolute best in the dangerous art of extraction, steals valuable secrets from deep within the subconscious during the dream state, when the mind is at its most vulnerable."
  },
  {
    id: 693134,
    title: "Dune: Part Two",
    poster_path: "/czembDcB20w7nqpTyZ63H78Jcy6.jpg",
    backdrop_path: "/xOM0868n6HTbqKBIM7PjZ27Vm68.jpg",
    release_date: "2024-02-27",
    vote_average: 8.3,
    overview: "Follow the mythic journey of Paul Atreides as he unites with Chani and the Fremen while on a path of revenge against the conspirators who destroyed his family."
  },
  {
    id: 324857,
    title: "Spider-Man: Into the Spider-Verse",
    poster_path: "/ii26hi7b66v6vO765P11E9367s9.jpg",
    backdrop_path: "/7d6NZ04217042g0aZ2i4K63Z5.jpg",
    release_date: "2018-12-06",
    vote_average: 8.4,
    overview: "Miles Morales is juggling his life between being a high school student and being a spider-man. When Wilson \"Kingpin\" Fisk uses a super collider, others from across the Spider-Verse are transported to this dimension."
  },
  {
    id: 872585,
    title: "Oppenheimer",
    poster_path: "/8Gxv8gS681Y7Rtbw542t2qiyc.jpg",
    backdrop_path: "/fm6ZHE0yXYZFjJebBh2S6rPtPNY.jpg",
    release_date: "2023-07-19",
    vote_average: 8.1,
    overview: "The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb."
  },
  {
    id: 603,
    title: "The Matrix",
    poster_path: "/f89U3wzZ2uJk7wVjIu542t2qiyc.jpg",
    backdrop_path: "/oMf06PdLIj881KC1y53U4W78Jcy6.jpg",
    release_date: "1999-03-30",
    vote_average: 8.2,
    overview: "Set in the 22nd century, The Matrix tells the story of a computer hacker who joins a group of underground fighters who are fighting against the computers which now rule the earth."
  },
  {
    id: 238,
    title: "The Godfather",
    poster_path: "/3bhOZkGMJ7426W7K4w26g2bm.jpg",
    backdrop_path: "/rSPw7181J46c7RyGAV4A8zubmD4.jpg",
    release_date: "1972-03-14",
    vote_average: 8.7,
    overview: "Spanning the years 1945 to 1955, a chronicle of the fictional Italian-American Corleone crime family. When Vito Corleone barely survives an attempt on his life, his youngest son, Michael, steps in."
  },
  {
    id: 680,
    title: "Pulp Fiction",
    poster_path: "/d5iIlv8j9e4t3wzZ2uJk7wVjIu5.jpg",
    backdrop_path: "/suMj4tawje3wzZ2uJk7wVjIu5.jpg",
    release_date: "1994-09-10",
    vote_average: 8.5,
    overview: "A burger-loving hitman, his philosophical partner, a drug-addled gangster's moll and a washed-up boxer converge in this sprawling, comedic crime caper."
  },
  {
    id: 299534,
    title: "Avengers: Endgame",
    poster_path: "/or1ccPw46VtImE187Rtbw54nsbg.jpg",
    backdrop_path: "/7RyGAV4A8zubmD46asw7181J46c.jpg",
    release_date: "2019-04-24",
    vote_average: 8.3,
    overview: "After the devastating events of Avengers: Infinity War, the universe is in ruins. With the help of remaining allies, the Avengers assemble once more in order to reverse Thanos' actions."
  },
  {
    id: 11,
    title: "Star Wars: A New Hope",
    poster_path: "/6FfDcZYjUFjJ105Jm1CwLgBj8rl.jpg",
    backdrop_path: "/nz8me7IL76892t2qiyc.jpg",
    release_date: "1977-05-25",
    vote_average: 8.2,
    overview: "Princess Leia is held hostage by the evil Imperial forces in their effort to take over the galactic Empire. Luke Skywalker and Han Solo work together to rescue the beautiful princess."
  },
  {
    id: 122,
    title: "The Lord of the Rings: The Return of the King",
    poster_path: "/rC54V1av0w3tJvVjIu542t2qiyc.jpg",
    backdrop_path: "/lX7426W7K4w26g2bm.jpg",
    release_date: "2003-12-01",
    vote_average: 8.5,
    overview: "Aragorn is revealed as the heir to the ancient kings as he, Gandalf and the other members of the broken fellowship struggle to save Gondor from Sauron's forces."
  }
];

// Helper to simulate page loading and filtering of mock data
const getMockDataResponse = (page, query) => {
  let filtered = MOCK_MOVIES;
  if (query) {
    filtered = MOCK_MOVIES.filter(movie => 
      movie.title.toLowerCase().includes(query.toLowerCase())
    );
  }
  
  const itemsPerPage = 8;
  const startIndex = (page - 1) * itemsPerPage;
  const sliced = filtered.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  return {
    data: {
      results: sliced,
      page,
      total_pages: totalPages,
      total_results: filtered.length
    }
  };
};

export const getMovies = async (page = 1, query = '') => {
  // If API key is empty or standard placeholder, return mock data
  if (!API_KEY || API_KEY === 'your_key_here' || API_KEY.trim() === '') {
    return new Promise((resolve) => {
      setTimeout(() => resolve(getMockDataResponse(page, query)), 400);
    });
  }

  try {
    const endpoint = query ? '/search/movie' : '/movie/popular';
    return await tmdbApi.get(endpoint, { params: { page, query } });
  } catch (error) {
    console.error("TMDB API Error, falling back to mock database:", error);
    return getMockDataResponse(page, query);
  }
};

export default tmdbApi;