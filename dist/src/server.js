"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const app_1 = __importDefault(require("./app"));
const config_1 = require("./config");
const PORT = config_1.config.port;
console.info("Starting Server!");
app_1.default.listen(PORT, () => {
    console.log(`🚀 Telegram Broadcast API is running on port ${PORT}`);
    if (!config_1.config.botToken)
        console.warn("⚠️  WARNING: TELEGRAM_BOT_TOKEN is not set.");
    if (!config_1.config.defaultChannelId)
        console.warn("⚠️  WARNING: TELEGRAM_CHANNEL_ID is not set.");
    if (config_1.config.apiSecretKey)
        console.log("🔒 API is protected with a secret key.");
});
