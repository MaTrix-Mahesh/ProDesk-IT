import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import { createOrganizationSchema } from "../validators/organization.validator.js";
import * as organizationService from "../services/organization.service.js";

export const create = asyncHandler(async (req, res) => {
  const payload = createOrganizationSchema.parse(req.body);

  const organization = await organizationService.createOrganization(
    payload,
    req.user._id
  );

  return res.status(201).json(
    new ApiResponse(
      201,
      organization,
      "Organization created successfully"
    )
  );
});

export const getMine = asyncHandler(async (req, res) => {
  const organizations =
    await organizationService.getOrganizations(req.user._id);

  return res.json(
    new ApiResponse(
      200,
      organizations,
      "Organizations fetched successfully"
    )
  );
});

export const getById = asyncHandler(async (req, res) => {
  const organization =
    await organizationService.getOrganizationById(
      req.params.id,
      req.user._id
    );

  return res.json(
    new ApiResponse(
      200,
      organization,
      "Organization fetched successfully"
    )
  );
});

export const remove = asyncHandler(async (req, res) => {
  await organizationService.deleteOrganization(
    req.params.id,
    req.user._id
  );

  return res.json(
    new ApiResponse(
      200,
      null,
      "Organization deleted successfully"
    )
  );
});