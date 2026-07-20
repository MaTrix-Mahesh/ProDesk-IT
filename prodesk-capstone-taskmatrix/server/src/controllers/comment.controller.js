import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import * as commentService from "../services/comment.service.js";
import { createCommentSchema, updateCommentSchema } from "../validators/comment.validator.js";

export const create = asyncHandler(async (req, res) => {
  const payload = createCommentSchema.parse(req.body);

  const comment = await commentService.createComment(payload, req.user._id);

  res.status(201).json(new ApiResponse(201, comment, "Comment created successfully"));
});

export const list = asyncHandler(async (req, res) => {
  const { taskId } = req.params;
  const comments = await commentService.getComments(taskId);

  res.json(new ApiResponse(200, comments, "Comments fetched successfully"));
});

export const getReplies = asyncHandler(async (req, res) => {
  const replies = await commentService.getReplies(req.params.commentId);

  res.json(new ApiResponse(200, replies, "Replies fetched successfully"));
});

export const update = asyncHandler(async (req, res) => {
  const { body } = updateCommentSchema.parse(req.body);

  const comment = await commentService.updateComment(req.params.id, body, req.user._id);

  res.json(new ApiResponse(200, comment, "Comment updated successfully"));
});

export const remove = asyncHandler(async (req, res) => {
  await commentService.deleteComment(req.params.id, req.user._id);

  res.json(new ApiResponse(200, null, "Comment deleted successfully"));
});