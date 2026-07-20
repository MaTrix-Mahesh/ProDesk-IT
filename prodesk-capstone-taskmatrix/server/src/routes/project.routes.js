import { Router } from "express";

import { protect } from "../middleware/auth.middleware.js";

import * as projectController from "../controllers/project.controller.js";

const router = Router();

router.use(protect);

router.post("/", projectController.create);

router.get(
  "/organization/:organizationId",
  projectController.list
);

export default router;