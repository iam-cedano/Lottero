"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const channel_language_controller_1 = __importDefault(require("../controllers/channel-language.controller"));
const container_1 = __importDefault(require("../container"));
const router = (0, express_1.Router)();
const channelLanguageController = container_1.default.resolve(channel_language_controller_1.default);
router.post("/channel-language", channelLanguageController.createChannelLanguage);
router.get("/channel-languages", channelLanguageController.getChannelLanguages);
router.get("/channel-language/:id", channelLanguageController.getChannelLanguageById);
router.get("/channel/:channelId/languages", channelLanguageController.getChannelLanguagesByChannelId);
router.put("/channel-language/:id", channelLanguageController.updateChannelLanguage);
router.delete("/channel-language/:id", channelLanguageController.deleteChannelLanguage);
exports.default = router;
