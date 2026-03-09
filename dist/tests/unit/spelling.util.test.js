"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const spelling_util_1 = __importDefault(require("../../src/utils/spelling.util"));
const vitest_1 = require("vitest");
(0, vitest_1.describe)("Spelling util", () => {
    (0, vitest_1.it)("should capitalize the first letter of a string", () => {
        (0, vitest_1.expect)(spelling_util_1.default.capitalizeFirstLetter("hello")).toBe("Hello");
    });
});
