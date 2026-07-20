import { Router } from "express";

import { protect } from "../middleware/auth.middleware.js";

import * as organizationController from "../controllers/organization.controller.js";

const router = Router();

router.use(protect);

router.get("/", organizationController.getMine);

router.get("/:id", organizationController.getById);

router.post("/", organizationController.create);

router.delete("/:id", organizationController.remove);

export default router;