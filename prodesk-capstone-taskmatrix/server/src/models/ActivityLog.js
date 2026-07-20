import mongoose from "mongoose";

const activityLogSchema = new mongoose.Schema(
  {
    organization: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization",
      required: true,
      index: true,
    },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      default: null,
      index: true,
    },
    task: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
      default: null,
    },
    actor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    action: {
      type: String,
      required: true,
      enum: [
        "task.created",
        "task.updated",
        "task.deleted",
        "task.status_changed",
        "task.assigned",
        "task.priority_changed",
        "comment.created",
        "comment.updated",
        "comment.deleted",
        "project.created",
        "project.updated",
        "project.archived",
        "member.added",
        "member.removed",
        "member.role_changed",
        "organization.created",
        "organization.updated",
      ],
    },
    entityType: {
      type: String,
      enum: ["task", "project", "comment", "organization", "member"],
      required: true,
    },
    entityId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    metadata: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

activityLogSchema.index({ organization: 1, createdAt: -1 });
activityLogSchema.index({ project: 1, createdAt: -1 });
activityLogSchema.index({ task: 1, createdAt: -1 });

export default mongoose.model("ActivityLog", activityLogSchema);