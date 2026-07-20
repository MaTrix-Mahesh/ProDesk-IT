import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import * as invitationService from "../services/invitation.service.js";

export const create = asyncHandler(async (req, res) => {
  const { organizationId, email, role } = req.body;
  const invitation = await invitationService.createInvitation({
    organizationId,
    email,
    role: role || "member",
    inviterId: req.user._id,
  });
  res.status(201).json(new ApiResponse(201, invitation, "Invitation sent"));
});

export const accept = asyncHandler(async (req, res) => {
  const { token } = req.params;
  const invitation = await invitationService.acceptInvitation(token, req.user._id);
  res.json(new ApiResponse(200, invitation, "Invitation accepted"));
});

export const cancel = asyncHandler(async (req, res) => {
  const invitation = await invitationService.cancelInvitation(req.params.id, req.user._id);
  res.json(new ApiResponse(200, invitation, "Invitation cancelled"));
});

export const list = asyncHandler(async (req, res) => {
  const { organizationId } = req.params;
  const invitations = await invitationService.getOrganizationInvitations(organizationId);
  res.json(new ApiResponse(200, invitations, "Invitations fetched"));
});