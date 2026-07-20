import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import * as notificationService from "../services/notification.service.js";

export const list = asyncHandler(async (req, res) => {
  const notifications = await notificationService.getNotifications(req.user._id, req.query);

  res.json(new ApiResponse(200, notifications, "Notifications fetched successfully"));
});

export const markAsRead = asyncHandler(async (req, res) => {
  const notification = await notificationService.markAsRead(req.params.id, req.user._id);

  res.json(new ApiResponse(200, notification, "Notification marked as read"));
});

export const markAllAsRead = asyncHandler(async (req, res) => {
  await notificationService.markAllAsRead(req.user._id);

  res.json(new ApiResponse(200, null, "All notifications marked as read"));
});

export const getUnreadCount = asyncHandler(async (req, res) => {
  const count = await notificationService.getUnreadCount(req.user._id);

  res.json(new ApiResponse(200, { count }, "Unread count fetched successfully"));
});

export const remove = asyncHandler(async (req, res) => {
  await notificationService.deleteNotification(req.params.id, req.user._id);

  res.json(new ApiResponse(200, null, "Notification deleted successfully"));
});