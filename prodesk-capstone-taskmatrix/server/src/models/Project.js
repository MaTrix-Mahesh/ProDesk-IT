import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    organization: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization",
      required: true,
      index: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    key: {
      type: String,
      required: true,
      uppercase: true,
      trim: true,
      maxlength: 10,
    },

    description: {
      type: String,
      default: "",
      maxlength: 1000,
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    status: {
      type: String,
      enum: ["active", "archived"],
      default: "active",
    },

    startDate: Date,
    endDate: Date,
  },
  {
    timestamps: true,
  }
);

projectSchema.index(
  {
    organization: 1,
    key: 1,
  },
  {
    unique: true,
  }
);

export default mongoose.model("Project", projectSchema);