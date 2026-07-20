import User from "../models/User.js";
import ApiError from "../utils/ApiError.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../config/jwt.js";

const sanitizeUser = (user) => ({
  id: user._id,
  firstName: user.firstName,
  lastName: user.lastName,
  fullName: user.fullName,
  username: user.username,
  email: user.email,
  role: user.role,
  avatar: user.avatar,
  isVerified: user.isVerified,
  isActive: user.isActive,
  createdAt: user.createdAt,
});

export const registerUser = async (payload) => {
  const existingEmail = await User.findOne({
    email: payload.email,
  });

  if (existingEmail) {
    throw new ApiError(409, "Email already exists");
  }

  const existingUsername = await User.findOne({
    username: payload.username,
  });

  if (existingUsername) {
    throw new ApiError(409, "Username already exists");
  }

  const user = await User.create(payload);

  return sanitizeUser(user);
};

export const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email }).select(
    "+password +refreshToken"
  );

  if (!user) {
    throw new ApiError(401, "Invalid email or password");
  }

  if (!user.isActive) {
    throw new ApiError(403, "Your account has been disabled");
  }

  const matched = await user.comparePassword(password);

  if (!matched) {
    throw new ApiError(401, "Invalid email or password");
  }

  const accessToken = generateAccessToken({
    id: user._id,
    role: user.role,
  });

  const refreshToken = generateRefreshToken({
    id: user._id,
  });

  user.refreshToken = refreshToken;
  user.lastLogin = new Date();

  await user.save();

  return {
    accessToken,
    refreshToken,
    user: sanitizeUser(user),
  };
};

export const logoutUser = async (userId) => {
  await User.findByIdAndUpdate(userId, {
    refreshToken: null,
  });

  return true;
};