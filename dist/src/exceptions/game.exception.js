"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const spelling_util_1 = __importDefault(require("../utils/spelling.util"));
class GameException extends Error {
    constructor(casino, game) {
        const casinoCorrected = spelling_util_1.default.capitalizeFirstLetter(casino);
        const gameCorrected = spelling_util_1.default.capitalizeFirstLetter(game);
        super(`A game named ${gameCorrected} exists in ${casinoCorrected}`);
    }
}
exports.default = GameException;
