import { Router } from 'express';
import asyncHandler from '../utils/asyncHandler.js';
import ApiResponse from '../utils/ApiResponse.js';

const router = Router();

router.get(
  '/health',
  asyncHandler(async (req, res) => {
    const response = new ApiResponse(200, { status: 'ok' }, 'Health check passed');
    res.status(200).json(response);
  })
);

export default router;
