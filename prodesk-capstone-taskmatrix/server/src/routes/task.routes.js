import { Router } from "express";

import { protect } from "../middleware/auth.middleware.js";

import * as taskController from "../controllers/task.controller.js";

const router = Router();

router.use(protect);

router.post("/", taskController.create);

router.get("/project/:projectId", taskController.list);

router.get("/:id", taskController.getById);

router.put("/:id", taskController.update);

router.delete("/:id", taskController.remove);

router.put("/reorder/:projectId", taskController.reorder);

export default router;