"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const container_1 = __importDefault(require("../container"));
const casino_exception_1 = __importDefault(require("../exceptions/casino.exception"));
const game_exception_1 = __importDefault(require("../exceptions/game.exception"));
class ChannelBuilder {
    static getChannel(casino, game) {
        const token = game ? `${casino}_${game}` : `${casino}_broadcast`;
        if (!container_1.default.isRegistered(token)) {
            if (!game) {
                throw new casino_exception_1.default(casino);
            }
            else {
                if (!container_1.default.isRegistered(`${casino}_broadcast`)) {
                    throw new casino_exception_1.default(casino);
                }
                throw new game_exception_1.default(casino, game);
            }
        }
        return container_1.default.resolve(token);
    }
}
exports.default = ChannelBuilder;
