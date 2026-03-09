"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const spelling_util_1 = __importDefault(require("../utils/spelling.util"));
class CasinoException extends Error {
    constructor(casino) {
        const casinoCorrected = spelling_util_1.default.capitalizeFirstLetter(casino);
        super(`${casinoCorrected} doesn't exist`);
    }
}
exports.default = CasinoException;
