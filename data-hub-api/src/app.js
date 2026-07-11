// src/app.js
require('dotenv').config(); // load .env variables

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const config = require('./config'); // loads PORT and MONGODB_URI
const connectDB = require('./config/db');
const postsRouter = require('./routes/posts');
// Optional auth router – may not exist yet
let authRouter;
try {
  authRouter = require('./routes/auth');
} catch (e) {
  // No auth routes – ignore
}
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Connect to MongoDB
connectDB();

// Global middlewares
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('combined'));

// API routes – use /api prefix for consistency
app.use('/api/posts', postsRouter);
if (authRouter) app.use('/api/auth', authRouter);

// 404 handler for unknown routes
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// Global error handling middleware
app.use(errorHandler);

// Start server
app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
});

module.exports = app;
