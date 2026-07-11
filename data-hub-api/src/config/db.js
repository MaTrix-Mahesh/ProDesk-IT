// src/config/db.js
const mongoose = require('mongoose');
const config = require('../config');

/**
 * Connect to MongoDB using Mongoose.
 * Throws an error if connection fails, which will be caught by Express async error handling.
 */
const connectDB = async () => {
  try {
    await mongoose.connect(config.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};

module.exports = connectDB;
