import MessageController from "@/controllers/message.controller";
import { Router } from "express";
import { container } from "tsyringe";

const router = Router();

const messageController = container.resolve(MessageController);

router.post('/messages', messageController.sendGroupMessage);
router.put('/messages/:groupMessageId', messageController.editGroupMessage);
router.delete('/messages/:groupMessageId', messageController.deleteGroupMessage);
router.patch('/messages/:groupMessageId', messageController.editGroupMessage);
router.put('/message/:messageId', messageController.editMessage);

export default router;