"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const health_routes_1 = __importDefault(require("../routes/health.routes"));
const channel_route_1 = __importDefault(require("../routes/channel.route"));
const channel_url_route_1 = __importDefault(require("../routes/channel-url.route"));
const casino_route_1 = __importDefault(require("../routes/casino.route"));
const game_route_1 = __importDefault(require("../routes/game.route"));
const router = (0, express_1.Router)();
router.use("/", health_routes_1.default);
router.use("/", channel_route_1.default);
router.use("/", channel_url_route_1.default);
router.use("/", casino_route_1.default);
router.use("/", game_route_1.default);
exports.default = router;
