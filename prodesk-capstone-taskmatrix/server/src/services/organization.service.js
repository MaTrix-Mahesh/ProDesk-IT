import Organization from "../models/Organization.js";
import OrganizationMember from "../models/OrganizationMember.js";
import ApiError from "../utils/ApiError.js";

export const createOrganization = async (payload, userId) => {
  const exists = await Organization.findOne({
    slug: payload.slug,
  });

  if (exists) {
    throw new ApiError(409, "Organization slug already exists");
  }

  const organization = await Organization.create({
    ...payload,
    owner: userId,
  });

  await OrganizationMember.create({
    organization: organization._id,
    user: userId,
    role: "owner",
  });

  return organization;
};

export const getOrganizations = async (userId) => {
  const memberships = await OrganizationMember.find({
    user: userId,
    status: "accepted",
  }).populate({
    path: "organization",
    select: "name slug description logo owner isActive createdAt",
  });

  return memberships.map((m) => m.organization);
};

export const getOrganizationById = async (organizationId, userId) => {
  const member = await OrganizationMember.findOne({
    organization: organizationId,
    user: userId,
    status: "accepted",
  });

  if (!member) {
    throw new ApiError(403, "You are not a member of this organization");
  }

  const organization = await Organization.findById(organizationId);

  if (!organization) {
    throw new ApiError(404, "Organization not found");
  }

  return organization;
};

export const deleteOrganization = async (organizationId, userId) => {
  const organization = await Organization.findById(organizationId);

  if (!organization) {
    throw new ApiError(404, "Organization not found");
  }

  if (organization.owner.toString() !== userId.toString()) {
    throw new ApiError(403, "Only the owner can delete the organization");
  }

  await OrganizationMember.deleteMany({ organization: organizationId });
  await Organization.findByIdAndDelete(organizationId);

  return true;
};