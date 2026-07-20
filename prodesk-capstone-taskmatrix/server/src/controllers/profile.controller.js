import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";

export const getProfile = asyncHandler(
  async (req, res) => {
    return res.json(
      new ApiResponse(
        200,
        req.user,
        "Profile fetched successfully"
      )
    );
  }
);