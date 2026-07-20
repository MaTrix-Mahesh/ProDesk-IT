import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
      index: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },

    description: {
      type: String,
      default: "",
      maxlength: 5000,
    },

    type: {
      type: String,
      enum: ["task", "bug", "feature", "improvement", "epic"],
      default: "task",
    },

    status: {
      type: String,
      enum: ["backlog", "todo", "in_progress", "in_review", "done", "cancelled"],
      default: "todo",
    },

    priority: {
      type: String,
      enum: ["none", "low", "medium", "high", "urgent"],
      default: "none",
    },

    assignee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    reporter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    labels: [
      {
        type: String,
        trim: true,
      },
    ],

    dueDate: {
      type: Date,
      default: null,
    },

    estimatedHours: {
      type: Number,
      default: null,
      min: 0,
    },

    actualHours: {
      type: Number,
      default: null,
      min: 0,
    },

    order: {
      type: Number,
      default: 0,
    },

    isArchived: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

taskSchema.index({ project: 1, status: 1 });
taskSchema.index({ project: 1, order: 1 });
taskSchema.index({ assignee: 1, status: 1 });

export default mongoose.model("Task", taskSchema);