import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    task: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
      required: true,
      index: true,
    },

    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    body: {
      type: String,
      required: true,
      maxlength: 10000,
      trim: true,
    },

    attachments: [
      {
        url: { type: String },
        public_id: { type: String },
        filename: { type: String },
      },
    ],

    isEdited: {
      type: Boolean,
      default: false,
    },

    parentComment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

commentSchema.index({ task: 1, createdAt: -1 });

export default mongoose.model("Comment", commentSchema);