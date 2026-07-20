import { randomBytes } from "crypto";
import Invitation from "../models/Invitation.js";
import OrganizationMember from "../models/OrganizationMember.js";
import Organization from "../models/Organization.js";
import User from "../models/User.js";
import ApiError from "../utils/ApiError.js";

export const createInvitation = async ({ organizationId, email, role, inviterId }) => {
  const org = await Organization.findById(organizationId);
  if (!org) throw new ApiError(404, "Organization not found");

  const member = await OrganizationMember.findOne({ organization: organizationId, user: inviterId });
  if (!member || !["owner", "admin"].includes(member.role)) {
    throw new ApiError(403, "Only owner or admin can invite members");
  }

  const existing = await OrganizationMember.findOne({ organization: organizationId }).populate({
    path: "user",
    match: { email },
  });
  if (existing?.user) throw new ApiError(409, "User is already a member");

  const existingInvite = await Invitation.findOne({
    organization: organizationId,
    email,
    status: "pending",
  });
  if (existingInvite) throw new ApiError(409, "Invitation already sent to this email");

  const token = randomBytes(32).toString("hex");
  const invitation = await Invitation.create({
    organization: organizationId,
    email,
    inviter: inviterId,
    role,
    token,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  });

  return invitation;
};

export const acceptInvitation = async (token, userId) => {
  const invitation = await Invitation.findOne({ token, status: "pending" });
  if (!invitation) throw new ApiError(404, "Invalid or expired invitation");
  if (invitation.expiresAt < new Date()) {
    invitation.status = "expired";
    await invitation.save();
    throw new ApiError(410, "Invitation has expired");
  }

  const user = await User.findById(userId);
  if (user.email !== invitation.email) {
    throw new ApiError(403, "This invitation was sent to a different email");
  }

  await OrganizationMember.create({
    organization: invitation.organization,
    user: userId,
    role: invitation.role,
    status: "accepted",
  });

  invitation.status = "accepted";
  invitation.acceptedAt = new Date();
  await invitation.save();

  return invitation;
};

export const cancelInvitation = async (invitationId, userId) => {
  const invitation = await Invitation.findById(invitationId);
  if (!invitation) throw new ApiError(404, "Invitation not found");
  if (invitation.inviter.toString() !== userId.toString()) {
    throw new ApiError(403, "Only the inviter can cancel");
  }
  invitation.status = "cancelled";
  await invitation.save();
  return invitation;
};

export const getOrganizationInvitations = async (organizationId) => {
  return Invitation.find({ organization: organizationId })
    .populate("inviter", "firstName lastName email")
    .sort({ createdAt: -1 });
};