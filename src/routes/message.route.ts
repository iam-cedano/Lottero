import { Router } from "express";
import MessageController from "@/controllers/message.controller";
import container from "@/container";

const router = Router();
const messageController = container.resolve(MessageController);

router.post("/message", messageController.createMessage);
router.get("/messages", messageController.getMessages);
router.get("/message/:id", messageController.getMessageById);
router.put("/message/:id", messageController.updateMessage);
router.delete("/message/:id", messageController.deleteMessage);

export default router;
