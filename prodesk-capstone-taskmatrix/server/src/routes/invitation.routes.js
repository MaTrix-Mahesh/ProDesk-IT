import { Router } from "express";
import { protect } from "../middleware/auth.middleware.js";
import * as invitationController from "../controllers/invitation.controller.js";

const router = Router();
router.use(protect);
router.post("/", invitationController.create);
router.get("/:organizationId", invitationController.list);
router.post("/:token/accept", invitationController.accept);
router.delete("/:id", invitationController.cancel);
export default router;