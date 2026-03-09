"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const casino_controller_1 = __importDefault(require("../controllers/casino.controller"));
const container_1 = __importDefault(require("../container"));
const router = (0, express_1.Router)();
const casinoController = container_1.default.resolve(casino_controller_1.default);
router.post("/casino", casinoController.createCasino);
router.get("/casinos", casinoController.getCasinos);
router.get("/casino/:id", casinoController.getCasinoById);
router.put("/casino/:id", casinoController.updateCasino);
router.delete("/casino/:id", casinoController.deleteCasino);
exports.default = router;
