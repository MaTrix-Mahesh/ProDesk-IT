import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import logger from "../utils/logger.js";

let io = null;

export const initializeSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL || "http://localhost:5173",
      credentials: true,
    },
  });

  io.use((socket, next) => {
    const token =
      socket.handshake.auth?.token ||
      socket.handshake.query?.token;

    if (!token) {
      return next(new Error("Authentication required"));
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
      socket.userId = decoded.id;
      next();
    } catch {
      next(new Error("Invalid token"));
    }
  });

  io.on("connection", (socket) => {
    logger.info(`User connected: ${socket.userId}`);

    socket.join(`user:${socket.userId}`);

    socket.on("join:organization", (orgId) => {
      socket.join(`org:${orgId}`);
    });

    socket.on("leave:organization", (orgId) => {
      socket.leave(`org:${orgId}`);
    });

    socket.on("join:project", (projectId) => {
      socket.join(`project:${projectId}`);
    });

    socket.on("leave:project", (projectId) => {
      socket.leave(`project:${projectId}`);
    });

    socket.on("disconnect", () => {
      logger.info(`User disconnected: ${socket.userId}`);
    });
  });

  return io;
};

export const getIO = () => {
  if (!io) {
    throw new Error("Socket.io not initialized");
  }
  return io;
};

export const emitToUser = (userId, event, data) => {
  getIO().to(`user:${userId}`).emit(event, data);
};

export const emitToOrganization = (orgId, event, data) => {
  getIO().to(`org:${orgId}`).emit(event, data);
};

export const emitToProject = (projectId, event, data) => {
  getIO().to(`project:${projectId}`).emit(event, data);
};