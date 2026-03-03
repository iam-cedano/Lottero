"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// Environment variables
const PORT = process.env.PORT || 3000;
const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const DEFAULT_CHANNEL_ID = process.env.TELEGRAM_CHANNEL_ID;
const API_SECRET_KEY = process.env.API_SECRET_KEY; // Optional, to protect the API
// Simple middleware to protect our API
function authenticate(req, res, next) {
    if (!API_SECRET_KEY)
        return next(); // Skip if no secret key is configured
    const authHeader = req.headers.authorization;
    if (authHeader === `Bearer ${API_SECRET_KEY}`) {
        return next();
    }
    return res.status(401).json({ error: 'Unauthorized: Invalid API Key' });
}
// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'ok', message: 'Telegram Broadcast API is running' });
});
// Broadcast endpoint
app.post('/api/broadcast', authenticate, async (req, res) => {
    const { message, channelId } = req.body;
    const targetChannel = channelId || DEFAULT_CHANNEL_ID;
    if (!message) {
        return res.status(400).json({ error: 'Message content is required.' });
    }
    if (!targetChannel) {
        return res.status(400).json({ error: 'Channel ID is required. Pass it in the body or set TELEGRAM_CHANNEL_ID.' });
    }
    if (!BOT_TOKEN) {
        return res.status(500).json({ error: 'Telegram Bot Token is not configured on the server.' });
    }
    try {
        const telegramUrl = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
        const response = await axios_1.default.post(telegramUrl, {
            chat_id: targetChannel,
            text: message,
            parse_mode: 'HTML' // Allows bold, italic, links etc using basic HTML
        });
        res.json({
            success: true,
            message: 'Broadcast sent successfully!',
            messageId: response.data.result.message_id
        });
    }
    catch (error) {
        console.error('Error broadcasting to Telegram:', error?.response?.data || error.message);
        res.status(500).json({
            success: false,
            error: 'Failed to send message to Telegram',
            details: error?.response?.data?.description || error.message
        });
    }
});
app.listen(PORT, () => {
    console.log(`🚀 Telegram Broadcast API is running on port ${PORT}`);
    if (!BOT_TOKEN)
        console.warn('⚠️  WARNING: TELEGRAM_BOT_TOKEN is not set.');
    if (!DEFAULT_CHANNEL_ID)
        console.warn('⚠️  WARNING: TELEGRAM_CHANNEL_ID is not set.');
    if (API_SECRET_KEY)
        console.log('🔒 API is protected with a secret key.');
});
