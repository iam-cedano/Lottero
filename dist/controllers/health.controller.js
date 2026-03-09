"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HealthController = void 0;
class HealthController {
    checkHealth = (req, res) => {
        res.json({ status: 'ok', message: 'Telegram Broadcast API is running' });
    };
}
exports.HealthController = HealthController;
