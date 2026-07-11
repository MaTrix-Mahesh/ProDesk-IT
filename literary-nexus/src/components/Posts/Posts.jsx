import React, { useEffect, useState } from "react";
import { getPosts, createPost, deletePost } from "../services/api";

// Simple CSS module (optional) – you can replace with your own styling solution
import "./Posts.css";

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    author: "",
    imageUrl: "",
  });
  const [submitting, setSubmitting] = useState(false);

  // Fetch posts on mount
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getPosts();
        setPosts(data);
        setError(null);
      } catch (err) {
        console.error(err);
        setError("Failed to load posts");
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const newPost = await createPost(formData);
      // Optimistically prepend the new post to the list
      setPosts((prev) => [newPost, ...prev]);
      setFormData({ title: "", content: "", author: "", imageUrl: "" });
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Failed to create post");
    } finally {
      setSubmitting(false);
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
  if (posts.length === 0) return <p className="posts-empty">No posts available.</p>;

  return (
    <section className="posts-section" aria-label="Posts">
      <h2>Posts</h2>
      {/* New Post Form */}
      <form className="post-form" onSubmit={handleSubmit} aria-label="Add New Post">
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
        <input
          type="url"
          name="imageUrl"
          placeholder="Image URL (optional)"
          value={formData.imageUrl}
          onChange={handleChange}
        />
        <button type="submit" disabled={submitting}>
          {submitting ? "Saving…" : "Add Post"}
        </button>
      </form>

      {/* Posts List */}
      <ul className="posts-list">
        {posts.map((post) => (
          <li key={post._id || post.id} className="post-item">
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <p><strong>Author:</strong> {post.author}</p>
            {post.imageUrl && (
              <img src={post.imageUrl} alt={post.title} className="post-image" />
            )}
            <p className="post-date">
              {new Date(post.createdAt || post.created_at).toLocaleString()}
            </p>
            <button
              className="post-delete-btn"
              onClick={() => handleDelete(post._id || post.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
