"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HealthController {
    checkHealth = (_req, res) => {
        res.status(200).json({ status: "ok", message: "Lottero API is running" });
    };
}
exports.default = HealthController;
