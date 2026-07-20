import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import * as dashboardService from "../services/dashboard.service.js";

export const getStats = asyncHandler(async (req, res) => {
  const { organizationId } = req.params;
  const stats = await dashboardService.getDashboardStats(organizationId);
  res.json(new ApiResponse(200, stats, "Dashboard stats fetched"));
});

export const getAnalytics = asyncHandler(async (req, res) => {
  const { organizationId } = req.params;
  const analytics = await dashboardService.getTaskAnalytics(organizationId);
  res.json(new ApiResponse(200, analytics, "Analytics fetched"));
});