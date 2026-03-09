"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Actions = exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.config = {
    port: process.env.PORT || 3000,
    botToken: process.env.TELEGRAM_BOT_TOKEN,
    defaultChannelId: process.env.TELEGRAM_CHANNEL_ID,
    apiSecretKey: process.env.API_SECRET_KEY,
    db: {
        host: process.env.DB_HOST || "localhost",
        port: parseInt(process.env.DB_PORT || "5432"),
        user: process.env.DB_USER || "lottero",
        password: process.env.DB_PASSWORD || "lottero_secret",
        name: process.env.DB_NAME || "lottero",
    },
};
var Actions;
(function (Actions) {
    Actions["SEND_MESSAGE"] = "send_message";
    Actions["EDIT_MESSAGE"] = "edit_message";
    Actions["DELETE_MESSAGE"] = "delete_message";
    Actions["BET"] = "bet";
})(Actions || (exports.Actions = Actions = {}));
