import Task from "../models/Task.js";
import Project from "../models/Project.js";
import OrganizationMember from "../models/OrganizationMember.js";
import ApiError from "../utils/ApiError.js";

export const createTask = async (payload, userId) => {
  const project = await Project.findById(payload.project);

  if (!project) {
    throw new ApiError(404, "Project not found");
  }

  const member = await OrganizationMember.findOne({
    organization: project.organization,
    user: userId,
    status: "accepted",
  });

  if (!member) {
    throw new ApiError(403, "You are not a member of this project's organization");
  }

  const task = await Task.create({
    ...payload,
    reporter: userId,
  });

  return task.populate([
    { path: "assignee", select: "firstName lastName email avatar" },
    { path: "reporter", select: "firstName lastName email avatar" },
  ]);
};

export const getTasks = async (projectId, query = {}) => {
  const filter = { project: projectId, isArchived: false };

  if (query.status) filter.status = query.status;
  if (query.priority) filter.priority = query.priority;
  if (query.type) filter.type = query.type;
  if (query.assignee) filter.assignee = query.assignee;
  if (query.search) {
    filter.title = { $regex: query.search, $options: "i" };
  }

  return Task.find(filter)
    .sort({ order: 1, createdAt: -1 })
    .populate("assignee", "firstName lastName email avatar")
    .populate("reporter", "firstName lastName email avatar");
};

export const getTaskById = async (taskId) => {
  const task = await Task.findById(taskId)
    .populate("assignee", "firstName lastName email avatar")
    .populate("reporter", "firstName lastName email avatar");

  if (!task) {
    throw new ApiError(404, "Task not found");
  }

  return task;
};

export const updateTask = async (taskId, payload, userId) => {
  const task = await Task.findById(taskId);

  if (!task) {
    throw new ApiError(404, "Task not found");
  }

  const project = await Project.findById(task.project);
  const member = await OrganizationMember.findOne({
    organization: project.organization,
    user: userId,
    status: "accepted",
  });

  if (!member) {
    throw new ApiError(403, "You are not a member of this project's organization");
  }

  Object.assign(task, payload);
  await task.save();

  return task.populate([
    { path: "assignee", select: "firstName lastName email avatar" },
    { path: "reporter", select: "firstName lastName email avatar" },
  ]);
};

export const deleteTask = async (taskId, userId) => {
  const task = await Task.findById(taskId);

  if (!task) {
    throw new ApiError(404, "Task not found");
  }

  const project = await Project.findById(task.project);
  const member = await OrganizationMember.findOne({
    organization: project.organization,
    user: userId,
    status: "accepted",
  });

  if (!member) {
    throw new ApiError(403, "You are not a member of this project's organization");
  }

  task.isArchived = true;
  await task.save();

  return true;
};

export const reorderTasks = async (projectId, taskOrder) => {
  const operations = taskOrder.map(({ taskId, order }, index) => ({
    updateOne: {
      filter: { _id: taskId, project: projectId },
      update: { $set: { order: order ?? index } },
    },
  }));

  await Task.bulkWrite(operations);
  return true;
};