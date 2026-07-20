import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";

import {
  registerSchema,
  loginSchema,
} from "../validators/auth.validator.js";

import {
  registerUser,
  loginUser,
  logoutUser,
} from "../services/auth.service.js";

export const register = asyncHandler(async (req, res) => {
  const payload = registerSchema.parse(req.body);

  const user = await registerUser(payload);

  return res.status(201).json(
    new ApiResponse(
      201,
      user,
      "User registered successfully"
    )
  );
});

export const login = asyncHandler(async (req, res) => {
  const payload = loginSchema.parse(req.body);

  const result = await loginUser(payload);

  res.cookie("refreshToken", result.refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        accessToken: result.accessToken,
        user: result.user,
      },
      "Login successful"
    )
  );
});

export const logout = asyncHandler(async (req, res) => {
  await logoutUser(req.user.id);

  res.clearCookie("refreshToken");

  return res.status(200).json(
    new ApiResponse(
      200,
      null,
      "Logout successful"
    )
  );
});