import { z } from "zod";

export const createCommentSchema = z.object({
  task: z.string().min(24).max(24),

  body: z.string().trim().min(1, "Comment body is required").max(10000),

  parentComment: z.string().min(24).max(24).nullable().optional(),
});

export const updateCommentSchema = z.object({
  body: z.string().trim().min(1, "Comment body is required").max(10000),
});