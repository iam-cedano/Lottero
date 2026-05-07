import MessageController from "@/controllers/message.controller";
import { Router } from "express";
import { container } from "tsyringe";

const router = Router();

const messageController = container.resolve(MessageController);

router.post('/messages', messageController.sendMessage);
router.put('/messages/:groupMessageId', messageController.editMessage);

export default router;