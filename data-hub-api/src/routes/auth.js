// src/routes/auth.js
const express = require('express');

const router = express.Router();

// Mock login endpoint – returns a static token
router.post('/', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Email and password are required',
    });
  }
  // In a real app you would verify credentials and generate a JWT.
  res.status(200).json({
    success: true,
    message: 'Login Successful',
    token: 'mock-jwt-token-123456',
  });
});

module.exports = router;
