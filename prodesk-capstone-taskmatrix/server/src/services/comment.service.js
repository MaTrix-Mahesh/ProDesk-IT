import Comment from "../models/Comment.js";
import Task from "../models/Task.js";
import Project from "../models/Project.js";
import OrganizationMember from "../models/OrganizationMember.js";
import ApiError from "../utils/ApiError.js";

export const createComment = async (payload, userId) => {
  const task = await Task.findById(payload.task);

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

  const comment = await Comment.create({
    ...payload,
    author: userId,
  });

  return comment.populate("author", "firstName lastName email avatar");
};

export const getComments = async (taskId) => {
  return Comment.find({ task: taskId, parentComment: null })
    .sort({ createdAt: -1 })
    .populate("author", "firstName lastName email avatar");
};

export const getReplies = async (commentId) => {
  return Comment.find({ parentComment: commentId })
    .sort({ createdAt: 1 })
    .populate("author", "firstName lastName email avatar");
};

export const updateComment = async (commentId, body, userId) => {
  const comment = await Comment.findById(commentId);

  if (!comment) {
    throw new ApiError(404, "Comment not found");
  }

  if (comment.author.toString() !== userId.toString()) {
    throw new ApiError(403, "You can only edit your own comments");
  }

  comment.body = body;
  comment.isEdited = true;
  await comment.save();

  return comment.populate("author", "firstName lastName email avatar");
};

export const deleteComment = async (commentId, userId) => {
  const comment = await Comment.findById(commentId);

  if (!comment) {
    throw new ApiError(404, "Comment not found");
  }

  if (comment.author.toString() !== userId.toString()) {
    throw new ApiError(403, "You can only delete your own comments");
  }

  await Comment.deleteMany({ parentComment: commentId });
  await Comment.findByIdAndDelete(commentId);

  return true;
};