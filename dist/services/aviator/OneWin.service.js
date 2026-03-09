"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const channel_service_1 = __importDefault(require("../../services/channel.service"));
class OneWinAviator extends channel_service_1.default {
    async sendMessage() {
        throw new Error("Method not implemented.");
    }
}
exports.default = OneWinAviator;
