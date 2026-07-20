import mongoose from "mongoose";

const organizationMemberSchema = new mongoose.Schema(
  {
    organization: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization",
      required: true,
      index: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    role: {
      type: String,
      enum: [
        "owner",
        "admin",
        "manager",
        "member",
      ],
      default: "member",
    },

    status: {
      type: String,
      enum: [
        "pending",
        "accepted",
        "rejected",
      ],
      default: "accepted",
    },
  },
  {
    timestamps: true,
  }
);

organizationMemberSchema.index(
  {
    organization: 1,
    user: 1,
  },
  {
    unique: true,
  }
);

export default mongoose.model(
  "OrganizationMember",
  organizationMemberSchema
);