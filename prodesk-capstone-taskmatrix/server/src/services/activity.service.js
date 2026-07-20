import ActivityLog from "../models/ActivityLog.js";

export const logActivity = async ({ organization, project, task, actor, action, entityType, entityId, metadata = {} }) => {
  return ActivityLog.create({
    organization,
    project,
    task,
    actor,
    action,
    entityType,
    entityId,
    metadata,
  });
};

export const getActivityLogs = async ({ organization, project, task, limit = 50, skip = 0 }) => {
  const filter = {};
  if (organization) filter.organization = organization;
  if (project) filter.project = project;
  if (task) filter.task = task;

  const [logs, total] = await Promise.all([
    ActivityLog.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("actor", "firstName lastName email avatar"),
    ActivityLog.countDocuments(filter),
  ]);

  return { logs, total, limit, skip };
};