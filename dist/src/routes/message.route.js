"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const message_controller_1 = __importDefault(require("../controllers/message.controller"));
const container_1 = __importDefault(require("../container"));
const router = (0, express_1.Router)();
const messageController = container_1.default.resolve(message_controller_1.default);
router.post("/message", messageController.createMessage);
router.get("/messages", messageController.getMessages);
router.get("/message/:id", messageController.getMessageById);
router.put("/message/:id", messageController.updateMessage);
router.delete("/message/:id", messageController.deleteMessage);
exports.default = router;
