import MessagesController from "@/controllers/messages.controller";
import { Router } from "express";
import { container } from "tsyringe";

const router = Router();

const messagesController = container.resolve(MessagesController);

router.post('/messages', messagesController.sendMessage);
router.put('/messages/:groupMessageId', messagesController.editMessage);

export default router;