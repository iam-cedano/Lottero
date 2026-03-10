"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const channel_statistic_controller_1 = __importDefault(require("../controllers/channel-statistic.controller"));
const container_1 = __importDefault(require("../container"));
const router = (0, express_1.Router)();
const channelStatisticController = container_1.default.resolve(channel_statistic_controller_1.default);
router.post("/channel-statistic", channelStatisticController.createChannelStatistic);
router.get("/channel-statistics", channelStatisticController.getChannelStatistics);
router.get("/channel-statistic/:id", channelStatisticController.getChannelStatisticById);
router.put("/channel-statistic/:id", channelStatisticController.updateChannelStatistic);
router.delete("/channel-statistic/:id", channelStatisticController.deleteChannelStatistic);
exports.default = router;
