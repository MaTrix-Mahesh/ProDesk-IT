import Task from "../models/Task.js";
import Project from "../models/Project.js";
import OrganizationMember from "../models/OrganizationMember.js";
import ActivityLog from "../models/ActivityLog.js";

export const getDashboardStats = async (organizationId) => {
  const [
    totalTasks,
    tasksByStatus,
    tasksByPriority,
    recentActivities,
    memberCount,
    projectCount,
  ] = await Promise.all([
    Task.countDocuments({ isArchived: false }).populate({
      path: "project",
      match: { organization: organizationId },
    }),
    Task.aggregate([
      {
        $lookup: {
          from: "projects",
          localField: "project",
          foreignField: "_id",
          as: "project",
        },
      },
      { $unwind: "$project" },
      { $match: { "project.organization": organizationId, isArchived: false } },
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]),
    Task.aggregate([
      {
        $lookup: {
          from: "projects",
          localField: "project",
          foreignField: "_id",
          as: "project",
        },
      },
      { $unwind: "$project" },
      { $match: { "project.organization": organizationId, isArchived: false } },
      { $group: { _id: "$priority", count: { $sum: 1 } } },
    ]),
    ActivityLog.find({ organization: organizationId })
      .sort({ createdAt: -1 })
      .limit(10)
      .populate("actor", "firstName lastName avatar"),
    OrganizationMember.countDocuments({ organization: organizationId, status: "accepted" }),
    Project.countDocuments({ organization: organizationId, status: "active" }),
  ]);

  return {
    totalTasks,
    tasksByStatus: tasksByStatus.reduce((acc, { _id, count }) => ({ ...acc, [_id]: count }), {}),
    tasksByPriority: tasksByPriority.reduce((acc, { _id, count }) => ({ ...acc, [_id]: count }), {}),
    recentActivities,
    memberCount,
    projectCount,
  };
};

export const getTaskAnalytics = async (organizationId) => {
  const now = new Date();
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

  const [createdTrend, overdueTasks, unassignedTasks] = await Promise.all([
    Task.aggregate([
      {
        $lookup: {
          from: "projects",
          localField: "project",
          foreignField: "_id",
          as: "project",
        },
      },
      { $unwind: "$project" },
      { $match: { "project.organization": organizationId, createdAt: { $gte: thirtyDaysAgo } } },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]),
    Task.find({ dueDate: { $lt: now, $ne: null }, status: { $nin: ["done", "cancelled"] }, isArchived: false })
      .populate({
        path: "project",
        match: { organization: organizationId },
      })
      .populate("assignee", "firstName lastName email"),
    Task.find({ assignee: null, isArchived: false })
      .populate({
        path: "project",
        match: { organization: organizationId },
      }),
  ]);

  return {
    createdTrend,
    overdueTasks: overdueTasks.filter((t) => t.project),
    unassignedTasks: unassignedTasks.filter((t) => t.project),
  };
};