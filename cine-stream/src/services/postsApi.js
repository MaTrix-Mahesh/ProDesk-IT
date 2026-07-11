import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const getPosts = () => API.get("/posts");

export const createPost = (data) => API.post("/posts", data);

export const deletePost = (id) => API.delete(`/posts/${id}`);