import http from "http";
import dotenv from "dotenv";
import app from "./app.js";
import logger from "./utils/logger.js";
import { initializeSocket } from "./socket/index.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

initializeSocket(server);

server.listen(PORT, () => {
  logger.info(`🚀 Server is running on http://localhost:${PORT}`);
});

// Graceful Shutdown
process.on("SIGINT", () => {
  logger.info("Server shutting down...");
  process.exit(0);
});

process.on("SIGTERM", () => {
  logger.info("Server terminated...");
  process.exit(0);
});

// Handle Uncaught Exceptions
process.on("uncaughtException", (err) => {
  logger.error("UNCAUGHT EXCEPTION");
  logger.error(err.stack || err.message);
  process.exit(1);
});

// Handle Unhandled Promise Rejections
process.on("unhandledRejection", (err) => {
  logger.error("UNHANDLED REJECTION");
  logger.error(err.stack || err.message);
  server.close(() => process.exit(1));
});