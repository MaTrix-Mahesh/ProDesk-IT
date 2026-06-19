// src/routes/posts.js
const express = require('express');
const Joi = require('joi');

const router = express.Router();

// In‑memory "database"
let blogPosts = [];

// Joi schemas
const postSchema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  author: Joi.string().required(),
});

const postUpdateSchema = Joi.object({
  title: Joi.string(),
  content: Joi.string(),
  author: Joi.string(),
}).min(1);

// GET all posts
router.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    count: blogPosts.length,
    posts: blogPosts,
  });
});

// GET single post
router.get('/:id', (req, res) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) {
    return res.status(400).json({ success: false, message: 'Invalid ID' });
  }
  const post = blogPosts.find((p) => p.id === id);
  if (!post) {
    return res.status(404).json({ success: false, message: 'Post not found' });
  }
  res.status(200).json({ success: true, post });
});

// CREATE a post
router.post('/', (req, res) => {
  const { error, value } = postSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
  const newPost = {
    id: Date.now(),
    ...value,
    createdAt: new Date().toISOString(),
  };
  blogPosts.push(newPost);
  res.status(201).json({ success: true, message: 'Post created', post: newPost });
});

// UPDATE a post
router.put('/:id', (req, res) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) {
    return res.status(400).json({ success: false, message: 'Invalid ID' });
  }
  const { error, value } = postUpdateSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
  const post = blogPosts.find((p) => p.id === id);
  if (!post) {
    return res.status(404).json({ success: false, message: 'Post not found' });
  }
  Object.assign(post, value);
  res.status(200).json({ success: true, message: 'Post updated', post });
});

// DELETE a post
router.delete('/:id', (req, res) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) {
    return res.status(400).json({ success: false, message: 'Invalid ID' });
  }
  const index = blogPosts.findIndex((p) => p.id === id);
  if (index === -1) {
    return res.status(404).json({ success: false, message: 'Post not found' });
  }
  blogPosts.splice(index, 1);
  res.status(200).json({ success: true, message: 'Post deleted' });
});

module.exports = router;
