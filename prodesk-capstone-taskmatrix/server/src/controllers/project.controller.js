import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import { createProjectSchema } from "../validators/project.validator.js";
import * as projectService from "../services/project.service.js";

export const create = asyncHandler(async (req, res) => {
  const payload = createProjectSchema.parse(req.body);

  const project = await projectService.createProject(
    payload,
    req.user._id
  );

  res.status(201).json(
    new ApiResponse(
      201,
      project,
      "Project created successfully"
    )
  );
});

export const list = asyncHandler(async (req, res) => {
  const projects =
    await projectService.getProjects(
      req.params.organizationId
    );

  res.json(
    new ApiResponse(
      200,
      projects,
      "Projects fetched successfully"
    )
  );
});