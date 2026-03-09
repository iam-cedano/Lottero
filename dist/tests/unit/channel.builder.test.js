"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const casino_exception_1 = __importDefault(require("../../src/exceptions/casino.exception"));
const game_exception_1 = __importDefault(require("../../src/exceptions/game.exception"));
const channel_builder_1 = __importDefault(require("../../src/services/channel.builder"));
const vitest_1 = require("vitest");
(0, vitest_1.describe)("Channel Builder", () => {
    (0, vitest_1.it)("should throw an exception when the casino is not found", () => {
        (0, vitest_1.expect)(() => {
            const channelService = channel_builder_1.default.getChannel("non_existent_casino");
        }).toThrow(casino_exception_1.default);
    });
    (0, vitest_1.it)("should throw an exception when the game is not found", () => {
        (0, vitest_1.expect)(() => {
            const channelService = channel_builder_1.default.getChannel("one_win", "non_existent_game");
        }).toThrow(game_exception_1.default);
    });
});
