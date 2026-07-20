import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import * as taskService from "../services/task.service.js";
import { createTaskSchema, updateTaskSchema } from "../validators/task.validator.js";

export const create = asyncHandler(async (req, res) => {
  const payload = createTaskSchema.parse(req.body);

  const task = await taskService.createTask(payload, req.user._id);

  res.status(201).json(new ApiResponse(201, task, "Task created successfully"));
});

export const list = asyncHandler(async (req, res) => {
  const { projectId } = req.params;
  const tasks = await taskService.getTasks(projectId, req.query);

  res.json(new ApiResponse(200, tasks, "Tasks fetched successfully"));
});

export const getById = asyncHandler(async (req, res) => {
  const task = await taskService.getTaskById(req.params.id);

  res.json(new ApiResponse(200, task, "Task fetched successfully"));
});

export const update = asyncHandler(async (req, res) => {
  const payload = updateTaskSchema.parse(req.body);

  const task = await taskService.updateTask(req.params.id, payload, req.user._id);

  res.json(new ApiResponse(200, task, "Task updated successfully"));
});

export const remove = asyncHandler(async (req, res) => {
  await taskService.deleteTask(req.params.id, req.user._id);

  res.json(new ApiResponse(200, null, "Task deleted successfully"));
});

export const reorder = asyncHandler(async (req, res) => {
  const { projectId } = req.params;
  const { taskOrder } = req.body;

  await taskService.reorderTasks(projectId, taskOrder);

  res.json(new ApiResponse(200, null, "Tasks reordered successfully"));
});