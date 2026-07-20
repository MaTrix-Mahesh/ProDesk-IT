import { Router } from "express";

import { protect } from "../middleware/auth.middleware.js";

import { getProfile } from "../controllers/profile.controller.js";

const router = Router();

router.get("/", protect, getProfile);

export default router;