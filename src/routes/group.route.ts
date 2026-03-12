import { Router } from "express";
import container from "@/container";
import GroupController from "@/controllers/group.controller";

const router = Router();
const groupController = container.resolve(GroupController);

router.post("/message", groupController.sendMessage);

router.post("/group", groupController.createGroup);

router.post(
  "/group/:id/channel/:channel_id",
  groupController.addChannelToGroup,
);
router.delete(
  "/group/:id/channel/:channel_id",
  groupController.removeChannelFromGroup,
);
router.get("/groups", groupController.getGroups);
router.get("/group/:id", groupController.getGroupById);
router.put("/group/:id", groupController.updateGroup);
router.delete("/group/:id", groupController.deleteGroup);

export default router;
