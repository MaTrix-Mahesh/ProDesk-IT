import { Router } from "express";

import { protect } from "../middleware/auth.middleware.js";

import * as commentController from "../controllers/comment.controller.js";

const router = Router();

router.use(protect);

router.post("/", commentController.create);

router.get("/task/:taskId", commentController.list);

router.get("/replies/:commentId", commentController.getReplies);

router.put("/:id", commentController.update);

router.delete("/:id", commentController.remove);

export default router;