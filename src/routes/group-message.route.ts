import { Router } from "express";
import GroupMessageController from "@/controllers/group-message.controller";
import container from "@/container";

const router = Router();
const groupMessageController = container.resolve(GroupMessageController);

router.post("/groupMessage", groupMessageController.createGroupMessage);
router.get("/groupMessages", groupMessageController.getGroupMessages);
router.get("/groupMessage/:id", groupMessageController.getMessageById);
router.put("/groupMessage/:id", groupMessageController.updateGroupMessage);
router.delete("/groupMessage/:id", groupMessageController.deleteGroupMessage);

export default router;
