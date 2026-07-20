import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import dotenv from "dotenv";

import connectDB from "./config/db.js";
import routes from "./routes/index.js";
import { notFound, errorHandler } from "./middleware/error.middleware.js";

dotenv.config();

const app = express();

// =======================
// Database
// =======================
connectDB();

// =======================
// Security Middleware
// =======================
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);

app.use(helmet());
app.use(compression());

app.use(
  express.json({
    limit: "10mb",
  })
);

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(cookieParser());

app.use(
  morgan(process.env.NODE_ENV === "production" ? "combined" : "dev")
);

// =======================
// Health Check
// =======================
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    project: "TaskMatrix API",
    version: "1.0.0",
    status: "Running",
    timestamp: new Date(),
  });
});

app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server Healthy",
  });
});

// =======================
// API
// =======================
app.use("/api/v1", routes);

// =======================
// 404
// =======================
app.use(notFound);

// =======================
// Error Handler
// =======================
app.use(errorHandler);

export default app;