"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const channel_controller_1 = __importDefault(require("../controllers/channel.controller"));
const router = (0, express_1.Router)();
const channelController = new channel_controller_1.default();
router.get('/message', channelController.sendMessage);
exports.default = router;
