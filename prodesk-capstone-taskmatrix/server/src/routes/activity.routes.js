import { Router } from "express";
import { protect } from "../middleware/auth.middleware.js";
import * as activityController from "../controllers/activity.controller.js";

const router = Router();
router.use(protect);
router.get("/", activityController.list);
export default router;