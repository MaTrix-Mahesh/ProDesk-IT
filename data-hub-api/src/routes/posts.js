// src/routes/posts.js
const express = require('express');
const Joi = require('joi');
const Post = require('../models/Post');
const upload = require('../middleware/upload');
const cloudinary = require('../config/cloudinary');

const router = express.Router();

// Joi schemas for validation
const postSchema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  author: Joi.string().required(),
  imageUrl: Joi.string().uri().optional(),
});

const postUpdateSchema = Joi.object({
  title: Joi.string(),
  content: Joi.string(),
  author: Joi.string(),
  imageUrl: Joi.string().uri(),
}).min(1);

// GET all posts
router.get('/', async (req, res, next) => {
  const posts = await Post.find().sort({ createdAt: -1 });
  res.status(200).json({ success: true, count: posts.length, posts });
});

// GET single post by MongoDB _id
router.get('/:id', async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }
    res.status(200).json({ success: true, post });
  } catch (err) {
    // Invalid ObjectId format
    return res.status(400).json({ success: false, message: 'Invalid ID' });
  }
});

// CREATE a new post
router.post('/', upload.single('image'), async (req, res, next) => {
  // Validate text fields
  const { error, value } = postSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
  // If an image file is provided, upload to Cloudinary
  if (req.file) {
    try {
      const uploadResult = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: 'posts' },
          (err, result) => {
            if (err) reject(err);
            else resolve(result);
          }
        );
        stream.end(req.file.buffer);
      });
      value.imageUrl = uploadResult.secure_url;
    } catch (uploadErr) {
      console.error('Cloudinary upload error:', uploadErr);
      return res.status(500).json({ success: false, message: 'Image upload failed' });
    }
  }
  const newPost = new Post(value);
  await newPost.save();
  res.status(201).json({ success: true, message: 'Post created', post: newPost });
});

// UPDATE an existing post
router.put('/:id', async (req, res, next) => {
  const { error, value } = postUpdateSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
  try {
    const updatedPost = await Post.findByIdAndUpdate(req.params.id, value, {
      new: true,
      runValidators: true,
    });
    if (!updatedPost) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }
    res.status(200).json({ success: true, message: 'Post updated', post: updatedPost });
  } catch (err) {
    return res.status(400).json({ success: false, message: 'Invalid ID' });
  }
});

// DELETE a post
router.delete('/:id', async (req, res, next) => {
  try {
    const deleted = await Post.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }
    res.status(200).json({ success: true, message: 'Post deleted' });
  } catch (err) {
    return res.status(400).json({ success: false, message: 'Invalid ID' });
  }
});

module.exports = router;
