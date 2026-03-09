"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const channel_url_controller_1 = __importDefault(require("../controllers/channel-url.controller"));
const container_1 = __importDefault(require("../container"));
const router = (0, express_1.Router)();
const channelUrlController = container_1.default.resolve(channel_url_controller_1.default);
router.post("/channel-url", channelUrlController.createChannelUrl);
router.get("/channel-urls", channelUrlController.getChannelUrls);
router.get("/channel-url/:id", channelUrlController.getChannelUrlById);
router.get("/channel/:channelId/urls", channelUrlController.getChannelUrlsByChannelId);
router.put("/channel-url/:id", channelUrlController.updateChannelUrl);
router.delete("/channel-url/:id", channelUrlController.deleteChannelUrl);
exports.default = router;
