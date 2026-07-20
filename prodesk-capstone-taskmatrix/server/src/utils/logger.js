import winston from "winston";

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || "info",

  format: winston.format.combine(
    winston.format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    winston.format.errors({
      stack: true,
    }),
    winston.format.printf(({ level, message, timestamp, stack }) => {
      if (stack) {
        return `[${timestamp}] ${level.toUpperCase()} : ${stack}`;
      }

      return `[${timestamp}] ${level.toUpperCase()} : ${message}`;
    })
  ),

  transports: [
    new winston.transports.Console(),
  ],
});

export default logger;