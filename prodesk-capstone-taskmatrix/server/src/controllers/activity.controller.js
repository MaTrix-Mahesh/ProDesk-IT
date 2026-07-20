import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import * as activityService from "../services/activity.service.js";

export const list = asyncHandler(async (req, res) => {
  const { organization, project, task, limit, skip } = req.query;
  const result = await activityService.getActivityLogs({
    organization,
    project,
    task,
    limit: parseInt(limit) || 50,
    skip: parseInt(skip) || 0,
  });
  res.json(new ApiResponse(200, result, "Activity logs fetched"));
});