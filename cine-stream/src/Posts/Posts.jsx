// src/components/Posts/Posts.jsx
import React, { useEffect, useState } from "react";
import { getPosts, createPost, deletePost } from "../services/postsApi";
import "./Posts.css";

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    author: "",
    image: null,
  });

  // Load posts on mount
  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      const res = await getPosts();
      setPosts(res.data.posts);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Failed to load posts");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData((prev) => ({ ...prev, image: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = new FormData();
    payload.append("title", formData.title);
    payload.append("content", formData.content);
    payload.append("author", formData.author);
    if (formData.image) payload.append("image", formData.image);
    try {
      const result = await createPost(payload);
      setPosts((prev) => [result.data.post, ...prev]);
      setFormData({ title: "", content: "", author: "", image: null });
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Failed to create post");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deletePost(id);
      setPosts((prev) => prev.filter((p) => p._id !== id && p.id !== id));
    } catch (err) {
      console.error(err);
      setError("Failed to delete post");
    }
  };

  if (loading) return <p className="posts-loading">Loading posts…</p>;
  if (error) return <p className="posts-error">{error}</p>;

  return (
    <section className="posts-section" aria-label="Posts">
      <h2>Posts</h2>
      <form className="post-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="content"
          placeholder="Content"
          value={formData.content}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="author"
          placeholder="Author"
          value={formData.author}
          onChange={handleChange}
          required
        />
        <input type="file" name="image" accept="image/*" onChange={handleChange} />
        <button type="submit">Add Post</button>
      </form>

      <ul className="posts-list">
        {posts.map((post) => (
          <li key={post._id || post.id} className="post-item">
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <p>
              <strong>Author:</strong> {post.author}
            </p>
            {post.imageUrl && <img src={post.imageUrl} alt={post.title} className="post-image" />}
            <p className="post-date">{new Date(post.createdAt || post.created_at).toLocaleString()}</p>
            <button className="post-delete-btn" onClick={() => handleDelete(post._id || post.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
