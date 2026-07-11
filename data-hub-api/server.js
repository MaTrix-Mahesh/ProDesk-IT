require('dotenv').config();

const express = require('express');
const connectDB = require('./src/config/db');
const postsRouter = require('./src/routes/posts');
// Optional auth router (if exists)
let authRouter;
try {
  authRouter = require('./src/routes/auth');
} catch (e) {
  // ignore if auth route not present
}

const app = express();

// Connect to MongoDB
connectDB();

// Global middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API routes
app.use('/api/posts', postsRouter);
if (authRouter) app.use('/api/auth', authRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;