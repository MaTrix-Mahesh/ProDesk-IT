import Notification from "../models/Notification.js";
import ApiError from "../utils/ApiError.js";

export const createNotification = async ({ recipient, type, title, message, data = {} }) => {
  const notification = await Notification.create({
    recipient,
    type,
    title,
    message,
    data,
  });

  return notification;
};

export const getNotifications = async (userId, query = {}) => {
  const filter = { recipient: userId };

  if (query.unreadOnly === "true") {
    filter.isRead = false;
  }

  return Notification.find(filter)
    .sort({ createdAt: -1 })
    .limit(parseInt(query.limit) || 50);
};

export const markAsRead = async (notificationId, userId) => {
  const notification = await Notification.findOneAndUpdate(
    { _id: notificationId, recipient: userId },
    { isRead: true, readAt: new Date() },
    { new: true }
  );

  if (!notification) {
    throw new ApiError(404, "Notification not found");
  }

  return notification;
};

export const markAllAsRead = async (userId) => {
  await Notification.updateMany(
    { recipient: userId, isRead: false },
    { isRead: true, readAt: new Date() }
  );

  return true;
};

export const getUnreadCount = async (userId) => {
  return Notification.countDocuments({ recipient: userId, isRead: false });
};

export const deleteNotification = async (notificationId, userId) => {
  const notification = await Notification.findOneAndDelete({
    _id: notificationId,
    recipient: userId,
  });

  if (!notification) {
    throw new ApiError(404, "Notification not found");
  }

  return true;
};