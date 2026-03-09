"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const channel_controller_1 = __importDefault(require("../controllers/channel.controller"));
const container_1 = __importDefault(require("../container"));
const router = (0, express_1.Router)();
const channelController = container_1.default.resolve(channel_controller_1.default);
router.get("/message", channelController.sendMessage);
router.post("/channel", channelController.createChannel);
router.get("/channels", channelController.getChannels);
router.get("/channel/:id", channelController.getChannelById);
router.put("/channel/:id", channelController.updateChannel);
router.delete("/channel/:id", channelController.deleteChannel);
exports.default = router;
