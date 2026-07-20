import mongoose from "mongoose";
import logger from "../utils/logger.js";

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI;

    if (!mongoURI) {
      throw new Error("MONGO_URI is not defined in .env");
    }

    const conn = await mongoose.connect(mongoURI);

    logger.info(
      `✅ MongoDB Connected: ${conn.connection.host}/${conn.connection.name}`
    );
  } catch (error) {
    logger.error("❌ MongoDB Connection Failed");
    logger.error(error.message);
    process.exit(1);
  }
};

export default connectDB;