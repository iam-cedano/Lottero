"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const config_1 = require("../config");
class BroadcastService {
    async broadcastMessage(data) {
        const targetChannel = data.channelId || config_1.config.defaultChannelId;
        if (!data.message) {
            throw new Error('Message content is required.');
        }
        if (!targetChannel) {
            throw new Error('Channel ID is required. Pass it in the body or set TELEGRAM_CHANNEL_ID.');
        }
        if (!config_1.config.botToken) {
            throw new Error('Telegram Bot Token is not configured on the server.');
        }
        // const botService = ChannelService.getBotService(data.game) // Will return a Singleton instance
        const telegramUrl = `https://api.telegram.org/bot${config_1.config.botToken}/sendMessage`;
        try {
            const response = await axios_1.default.post(telegramUrl, {
                chat_id: targetChannel,
                text: data.message,
                parse_mode: 'HTML'
            });
            return response.data;
        }
        catch (error) {
            throw new Error(error?.response?.data?.description || error.message);
        }
    }
}
exports.default = BroadcastService;
