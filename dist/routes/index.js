"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const health_routes_1 = __importDefault(require("../routes/health.routes"));
const broadcast_routes_1 = __importDefault(require("../routes/broadcast.routes"));
const channel_route_1 = __importDefault(require("../routes/channel.route"));
const router = (0, express_1.Router)();
router.use('/health', health_routes_1.default);
router.use('/api/broadcast', broadcast_routes_1.default);
router.use('/', channel_route_1.default);
exports.default = router;
