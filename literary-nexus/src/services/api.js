import axios from 'axios';

// Create an Axios instance with base URL from VITE environment variable
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  // You can add default headers here if needed
  headers: {
    'Content-Type': 'application/json',
  },
});

// Existing dummy services (kept for event and author data)
export const fetchEventData = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
  if (!response.ok) throw new Error('Failed to fetch event data');
  const data = await response.json();
  return {
    eventName: 'The Literary Nexus 2026',
    eventDate: '2026-09-15T10:00:00',
    venueName: 'The Grand Literary Hall',
    venueAddress: '42 Bookworm Boulevard',
    venueCity: 'Manhattan, New York',
  };
};

export const fetchAuthors = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  if (!response.ok) throw new Error('Failed to fetch authors');
  const users = await response.json();
  return users.map((user) => ({
    id: user.id,
    name: user.name,
    bio: `Award-winning author and literary critic. ${user.company?.catchPhrase || ''}`,
    photo: `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=8b5cf6&color=fff&size=200`,
  }));
};

// ---------- New Post API functions ---------- //
/**
 * Fetch all posts from the backend.
 * @returns {Promise<Array>} Array of post objects.
 */
export const getPosts = async () => {
  const res = await api.get('/posts');
  return res.data;
};

/**
 * Create a new post.
 * @param {Object} post - Post data (title, content, author, imageUrl?)
 * @returns {Promise<Object>} The created post returned from the server.
 */
export const createPost = async (post) => {
  const res = await api.post('/posts', post);
  return res.data;
};

/**
 * Delete a post by its ID.
 * @param {string} id - Post ID.
 * @returns {Promise<void>}
 */
export const deletePost = async (id) => {
  await api.delete(`/posts/${id}`);
};
