// src/middleware/upload.js
const multer = require('multer');

// Use memory storage so files are kept in RAM and can be streamed to Cloudinary
const storage = multer.memoryStorage();

const upload = multer({ storage });

module.exports = upload;
