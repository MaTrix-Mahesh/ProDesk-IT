import ApiError from "../utils/ApiError.js";
import logger from "../utils/logger.js";

export const notFound = (req, res, next) => {
  next(new ApiError(404, `Route Not Found - ${req.originalUrl}`));
};

export const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  // Mongoose Bad ObjectId
  if (err.name === "CastError") {
    statusCode = 400;
    message = "Invalid resource ID";
  }

  // Duplicate key
  if (err.code === 11000) {
    statusCode = 409;
    const field = Object.keys(err.keyValue)[0];
    message = `${field} already exists`;
  }

  // Validation Error
  if (err.name === "ValidationError") {
    statusCode = 400;
    message = Object.values(err.errors)
      .map((e) => e.message)
      .join(", ");
  }

  // JWT Errors
  if (err.name === "JsonWebTokenError") {
    statusCode = 401;
    message = "Invalid authentication token";
  }

  if (err.name === "TokenExpiredError") {
    statusCode = 401;
    message = "Authentication token has expired";
  }

  logger.error(err.stack || err.message);

  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
    errors:
      process.env.NODE_ENV === "development"
        ? err.errors || []
        : undefined,
    stack:
      process.env.NODE_ENV === "development"
        ? err.stack
        : undefined,
  });
};