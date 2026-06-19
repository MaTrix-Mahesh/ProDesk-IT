// server/middleware/notFoundMiddleware.js
// 404 (Not Found) middleware – catches any request that does not match a defined route.
// It should be placed after all route registrations.

module.exports = (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
};
