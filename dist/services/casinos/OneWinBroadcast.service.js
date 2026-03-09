"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const channel_service_1 = __importDefault(require("../../services/channel.service"));
class OneWinBroadcastService extends channel_service_1.default {
    sendMessage() {
        throw new Error('Not implemented yet.');
    }
}
exports.default = OneWinBroadcastService;
