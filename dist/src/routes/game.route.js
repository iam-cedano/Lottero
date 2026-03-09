"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const game_controller_1 = __importDefault(require("../controllers/game.controller"));
const container_1 = __importDefault(require("../container"));
const router = (0, express_1.Router)();
const gameController = container_1.default.resolve(game_controller_1.default);
router.post("/game", gameController.createGame);
router.get("/games", gameController.getGames);
router.get("/game/:id", gameController.getGameById);
router.put("/game/:id", gameController.updateGame);
router.delete("/game/:id", gameController.deleteGame);
exports.default = router;
