"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const broadcast_controller_1 = require("../controllers/broadcast.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.Router)();
const broadcastController = new broadcast_controller_1.BroadcastController();
router.post('/', auth_middleware_1.authenticate, broadcastController.broadcastMessage);
exports.default = router;
