import { Router } from "express";

import { protect } from "../middleware/auth.middleware.js";

import * as notificationController from "../controllers/notification.controller.js";

const router = Router();

router.use(protect);

router.get("/", notificationController.list);

router.get("/unread-count", notificationController.getUnreadCount);

router.put("/read-all", notificationController.markAllAsRead);

router.put("/:id/read", notificationController.markAsRead);

router.delete("/:id", notificationController.remove);

export default router;