import { z } from "zod";

export const createProjectSchema = z.object({
  organization: z.string().min(24).max(24),

  name: z.string().trim().min(3).max(100),

  key: z
    .string()
    .trim()
    .min(2)
    .max(10)
    .transform((v) => v.toUpperCase()),

  description: z.string().optional(),

  startDate: z.string().optional(),

  endDate: z.string().optional(),
});