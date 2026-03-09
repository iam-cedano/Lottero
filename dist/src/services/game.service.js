"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tsyringe_1 = require("tsyringe");
const game_repository_1 = __importDefault(require("../repositories/game.repository"));
let GameService = class GameService {
    gameRepository;
    constructor(gameRepository) {
        this.gameRepository = gameRepository;
    }
    async createGame(data) {
        return this.gameRepository.create(data);
    }
    async getGames() {
        return this.gameRepository.findAll();
    }
    async getGameById(id) {
        return this.gameRepository.findById(id);
    }
    async updateGame(id, data) {
        return this.gameRepository.update(id, data);
    }
    async deleteGame(id) {
        return this.gameRepository.delete(id);
    }
};
GameService = __decorate([
    (0, tsyringe_1.injectable)(),
    __metadata("design:paramtypes", [game_repository_1.default])
], GameService);
exports.default = GameService;
