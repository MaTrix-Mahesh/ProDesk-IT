import { Router } from "express";
import { protect } from "../middleware/auth.middleware.js";
import * as dashboardController from "../controllers/dashboard.controller.js";

const router = Router();
router.use(protect);
router.get("/:organizationId/stats", dashboardController.getStats);
router.get("/:organizationId/analytics", dashboardController.getAnalytics);
export default router;