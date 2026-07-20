import { z } from "zod";

export const registerSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(2, "First name must be at least 2 characters")
    .max(50),

  lastName: z
    .string()
    .trim()
    .min(2, "Last name must be at least 2 characters")
    .max(50),

  username: z
    .string()
    .trim()
    .toLowerCase()
    .min(3)
    .max(30)
    .regex(/^[a-zA-Z0-9_]+$/, "Username can contain only letters, numbers and underscore"),

  email: z
    .string()
    .trim()
    .email("Invalid email address")
    .toLowerCase(),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain one uppercase letter")
    .regex(/[a-z]/, "Password must contain one lowercase letter")
    .regex(/[0-9]/, "Password must contain one number")
    .regex(/[^A-Za-z0-9]/, "Password must contain one special character"),
});

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .email()
    .toLowerCase(),

  password: z
    .string()
    .min(1, "Password is required"),
});

export const refreshSchema = z.object({
  refreshToken: z
    .string()
    .min(10, "Invalid refresh token"),
});