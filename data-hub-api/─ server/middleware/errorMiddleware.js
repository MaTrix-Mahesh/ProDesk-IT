module.exports = (err, req, res, next) => {
  console.error('Unexpected error:', err.stack || err);
  res.status(500).json({
    success: false,
    message: 'Internal Server Error',
  });
};
