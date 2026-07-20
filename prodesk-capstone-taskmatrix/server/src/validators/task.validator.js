import { z } from "zod";

export const createTaskSchema = z.object({
  project: z.string().min(24).max(24),

  title: z.string().trim().min(1, "Title is required").max(200),

  description: z.string().max(5000).optional(),

  type: z.enum(["task", "bug", "feature", "improvement", "epic"]).optional(),

  status: z.enum(["backlog", "todo", "in_progress", "in_review", "done", "cancelled"]).optional(),

  priority: z.enum(["none", "low", "medium", "high", "urgent"]).optional(),

  assignee: z.string().min(24).max(24).nullable().optional(),

  labels: z.array(z.string().trim()).optional(),

  dueDate: z.string().optional(),

  estimatedHours: z.number().min(0).optional(),

  actualHours: z.number().min(0).optional(),
});

export const updateTaskSchema = z.object({
  title: z.string().trim().min(1).max(200).optional(),
  description: z.string().max(5000).optional(),
  type: z.enum(["task", "bug", "feature", "improvement", "epic"]).optional(),
  status: z.enum(["backlog", "todo", "in_progress", "in_review", "done", "cancelled"]).optional(),
  priority: z.enum(["none", "low", "medium", "high", "urgent"]).optional(),
  assignee: z.string().min(24).max(24).nullable().optional(),
  labels: z.array(z.string().trim()).optional(),
  dueDate: z.string().nullable().optional(),
  estimatedHours: z.number().min(0).nullable().optional(),
  actualHours: z.number().min(0).nullable().optional(),
  order: z.number().optional(),
});