// server/middleware/loggerMiddleware.js
// Simple request logger (placed early in the middleware chain).

module.exports = (req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`${timestamp} | ${req.method} ${req.url}`);
  next();
};
// server/middleware/loggerMiddleware.js
// Custom logger – logs HTTP method, URL and a timestamp.
// This mirrors the original “requestLogger” used in the early sprint.

module.exports = (req, res, next) => {
  const method = req.method;                 // e.g. GET, POST
  const url = req.originalUrl;               // full request path
  const time = new Date().toLocaleTimeString(); // e.g. 10:05:15 AM

  console.log(`[${method}] ${url} - ${time}`);
  next(); // Pass control to the next middleware / route handler
};
