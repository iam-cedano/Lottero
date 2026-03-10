"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const channel_message_controller_1 = __importDefault(require("../controllers/channel-message.controller"));
const container_1 = __importDefault(require("../container"));
const router = (0, express_1.Router)();
const channelMessageController = container_1.default.resolve(channel_message_controller_1.default);
router.post("/channel-message", channelMessageController.createChannelMessage);
router.get("/channel-messages", channelMessageController.getChannelMessages);
router.get("/channel-message/:id", channelMessageController.getChannelMessageById);
router.get("/channel/:channelId/messages", channelMessageController.getChannelMessagesByChannelId);
router.put("/channel-message/:id", channelMessageController.updateChannelMessage);
router.delete("/channel-message/:id", channelMessageController.deleteChannelMessage);
exports.default = router;
