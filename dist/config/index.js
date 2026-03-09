"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.config = {
    port: process.env.PORT || 3000,
    botToken: process.env.TELEGRAM_BOT_TOKEN,
    defaultChannelId: process.env.TELEGRAM_CHANNEL_ID,
    apiSecretKey: process.env.API_SECRET_KEY,
};
