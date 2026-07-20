import Project from "../models/Project.js";
import OrganizationMember from "../models/OrganizationMember.js";
import ApiError from "../utils/ApiError.js";

export const createProject = async (payload, userId) => {
  const member = await OrganizationMember.findOne({
    organization: payload.organization,
    user: userId,
    status: "accepted",
  });

  if (!member) {
    throw new ApiError(
      403,
      "You are not a member of this organization"
    );
  }

  const exists = await Project.findOne({
    organization: payload.organization,
    key: payload.key,
  });

  if (exists) {
    throw new ApiError(409, "Project key already exists");
  }

  const project = await Project.create({
    ...payload,
    owner: userId,
    members: [userId],
  });

  return project.populate(["owner", "organization"]);
};

export const getProjects = async (organizationId) => {
  return Project.find({
    organization: organizationId,
    status: "active",
  })
    .populate("owner", "firstName lastName email")
    .populate("members", "firstName lastName");
};

export const getProjectById = async (projectId) => {
  const project = await Project.findById(projectId)
    .populate("owner", "firstName lastName email")
    .populate("organization", "name slug")
    .populate("members", "firstName lastName email");

  if (!project) {
    throw new ApiError(404, "Project not found");
  }

  return project;
};

export const updateProject = async (projectId, payload, userId) => {
  const project = await Project.findById(projectId);

  if (!project) {
    throw new ApiError(404, "Project not found");
  }

  if (project.owner.toString() !== userId.toString()) {
    throw new ApiError(403, "Only the project owner can update this project");
  }

  Object.assign(project, payload);
  await project.save();

  return project.populate(["owner", "organization"]);
};

export const deleteProject = async (projectId, userId) => {
  const project = await Project.findById(projectId);

  if (!project) {
    throw new ApiError(404, "Project not found");
  }

  if (project.owner.toString() !== userId.toString()) {
    throw new ApiError(403, "Only the project owner can delete this project");
  }

  project.status = "archived";
  await project.save();

  return true;
};