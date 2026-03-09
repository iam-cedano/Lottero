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
const channel_service_1 = __importDefault(require("../services/channel.service"));
const casino_service_1 = __importDefault(require("../services/casino.service"));
const game_service_1 = __importDefault(require("../services/game.service"));
let ChannelController = class ChannelController {
    channelService;
    casinoService;
    gameService;
    constructor(channelService, casinoService, gameService) {
        this.channelService = channelService;
        this.casinoService = casinoService;
        this.gameService = gameService;
    }
    sendMessage(req, _res) {
        const { channel, data } = req.body;
    }
    createChannel = async (req, res) => {
        try {
            const { casino_id, game_id } = req.body;
            if (!casino_id || !game_id) {
                res.status(400).json({ message: "Missing casino_id or game_id" });
                return;
            }
            const casino = await this.casinoService.getCasinoById(casino_id);
            if (!casino) {
                res.status(404).json({ message: "Casino not found" });
                return;
            }
            const game = await this.gameService.getGameById(game_id);
            if (!game) {
                res.status(404).json({ message: "Game not found" });
                return;
            }
            const channel = await this.channelService.createChannel({
                casino_id,
                game_id,
            });
            res.status(201).json(channel);
        }
        catch (error) {
            res.status(500).json({ message: "Failed to create channel", error });
        }
    };
    getChannels = async (_req, res) => {
        try {
            const channels = await this.channelService.getChannels();
            res.status(200).json(channels);
        }
        catch (error) {
            res.status(500).json({ message: "Failed to fetch channels", error });
        }
    };
    getChannelById = async (req, res) => {
        try {
            const id = parseInt(req.params.id, 10);
            if (isNaN(id)) {
                res.status(400).json({ message: "Invalid channel ID" });
                return;
            }
            const channel = await this.channelService.getChannelById(id);
            if (!channel) {
                res.status(404).json({ message: "Channel not found" });
                return;
            }
            res.status(200).json(channel);
        }
        catch (error) {
            res.status(500).json({ message: "Failed to fetch channel", error });
        }
    };
    updateChannel = async (req, res) => {
        try {
            const id = parseInt(req.params.id, 10);
            if (isNaN(id)) {
                res.status(400).json({ message: "Invalid channel ID" });
                return;
            }
            const { casino_id, game_id } = req.body;
            if (!casino_id || !game_id) {
                res.status(400).json({ message: "Missing casino_id or game_id" });
                return;
            }
            const casino = await this.casinoService.getCasinoById(casino_id);
            if (!casino) {
                res.status(404).json({ message: "Casino not found" });
                return;
            }
            const game = await this.gameService.getGameById(game_id);
            if (!game) {
                res.status(404).json({ message: "Game not found" });
                return;
            }
            const updatedChannel = await this.channelService.updateChannel(id, {
                casino_id,
                game_id,
            });
            if (!updatedChannel) {
                res.status(404).json({ message: "Channel not found" });
                return;
            }
            res.status(200).json(updatedChannel);
        }
        catch (error) {
            res.status(500).json({ message: "Failed to update channel", error });
        }
    };
    deleteChannel = async (req, res) => {
        try {
            const id = parseInt(req.params.id, 10);
            if (isNaN(id)) {
                res.status(400).json({ message: "Invalid channel ID" });
                return;
            }
            const success = await this.channelService.deleteChannel(id);
            if (!success) {
                res.status(404).json({ message: "Channel not found" });
                return;
            }
            res.status(204).send();
        }
        catch (error) {
            res.status(500).json({ message: "Failed to delete channel", error });
        }
    };
};
ChannelController = __decorate([
    (0, tsyringe_1.injectable)(),
    __metadata("design:paramtypes", [channel_service_1.default,
        casino_service_1.default,
        game_service_1.default])
], ChannelController);
exports.default = ChannelController;
