const express = require('express');
const router = express.Router();
const { register, login, getMe } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

// @desc    Register a new user
// @route   POST /api/auth/register
router.post('/register', register);

// @desc    Login user
// @route   POST /api/auth/login
router.post('/login', login);

// @desc    Get current user profile (Protected)
// @route   GET /api/auth/me
router.get('/me', protect, getMe);

module.exports = router;