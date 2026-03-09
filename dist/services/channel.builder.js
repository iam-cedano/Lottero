"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const casino_exception_1 = __importDefault(require("../exceptions/casino.exception"));
const OneWin_service_1 = __importDefault(require("../services/aviator/OneWin.service"));
const OneWinBroadcast_service_1 = __importDefault(require("../services/casinos/OneWinBroadcast.service"));
class ChannelBuilder {
    static Channels = {
        'one_win': {
            'broadcast': new OneWinBroadcast_service_1.default(),
            'aviator': new OneWin_service_1.default()
        }
    };
    static getChannel(casino, game) {
        // If channel broadcast class doesn't exist, raise an exception
        if (ChannelBuilder.Channels[casino]['all'] == null) {
            throw new casino_exception_1.default(casino);
        }
        // If game is defined, check if the game exists at the casino.
        if (game != null && ChannelBuilder.Channels[casino][game] == null) {
            throw new casino_exception_1.default(game);
        }
        return game != null ? ChannelBuilder.Channels[casino][game] : ChannelBuilder.Channels[casino]['broadcast'];
    }
}
exports.default = ChannelBuilder;
