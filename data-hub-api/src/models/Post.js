// src/models/Post.js
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    content: {
      type: String,
      required: [true, 'Content is required'],
      trim: true,
    },
    author: {
      type: String,
      required: [true, 'Author is required'],
      trim: true,
    },
    imageUrl: {
      type: String,
      // optional – keep as a simple string URL
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false }, // we only need createdAt
  }
);

// Export the model
module.exports = mongoose.model('Post', postSchema);
