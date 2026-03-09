"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("../../../src/app"));
const supertest_1 = __importDefault(require("supertest"));
const vitest_1 = require("vitest");
(0, vitest_1.describe)("Channel Routes", () => {
    (0, vitest_1.it)("Should return 200", async () => {
        const response = await (0, supertest_1.default)(app_1.default).get("/message");
        (0, vitest_1.expect)(response.statusCode).toBe(200);
    });
});
