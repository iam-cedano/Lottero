"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BroadcastController = void 0;
const broadcast_service_1 = __importDefault(require("../services/broadcast.service"));
class BroadcastController {
    broadcastService = new broadcast_service_1.default();
    broadcastMessage = async (req, res) => {
        try {
            const result = await this.broadcastService.broadcastMessage(req.body);
            res.json({
                success: true,
                message: 'Broadcast sent successfully!',
                messageId: result.result.message_id
            });
        }
        catch (error) {
            console.error('Error broadcasting to Telegram:', error.message);
            res.status(500).json({
                success: false,
                error: 'Failed to send message to Telegram',
                details: error.message
            });
        }
    };
}
exports.BroadcastController = BroadcastController;
