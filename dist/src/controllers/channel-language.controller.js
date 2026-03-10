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
const channel_language_service_1 = __importDefault(require("../services/channel-language.service"));
const channel_service_1 = __importDefault(require("../services/channel.service"));
let ChannelLanguageController = class ChannelLanguageController {
    channelLanguageService;
    channelService;
    constructor(channelLanguageService, channelService) {
        this.channelLanguageService = channelLanguageService;
        this.channelService = channelService;
    }
    createChannelLanguage = async (req, res) => {
        try {
            const { channel_id, language, channel } = req.body;
            if (!channel_id || !language || !channel) {
                res
                    .status(400)
                    .json({ message: "Missing channel_id, language, or channel" });
                return;
            }
            const existingChannel = await this.channelService.getChannelById(channel_id);
            if (!existingChannel) {
                res.status(404).json({ message: "Channel not found" });
                return;
            }
            const existingLanguageUrl = await this.channelLanguageService.getChannelLanguageByChannelIdAndLanguage(channel_id, language);
            if (existingLanguageUrl) {
                res
                    .status(409)
                    .json({ message: "Language already defined for this channel" });
                return;
            }
            const channelLanguage = await this.channelLanguageService.createChannelLanguage({
                channel_id,
                language,
                channel,
            });
            res.status(201).json(channelLanguage);
        }
        catch (error) {
            res
                .status(500)
                .json({ message: "Failed to create channel language", error });
        }
    };
    getChannelLanguages = async (_req, res) => {
        try {
            const channelLanguages = await this.channelLanguageService.getChannelLanguages();
            res.status(200).json(channelLanguages);
        }
        catch (error) {
            res
                .status(500)
                .json({ message: "Failed to fetch channel languages", error });
        }
    };
    getChannelLanguageById = async (req, res) => {
        try {
            const id = parseInt(req.params.id, 10);
            if (isNaN(id)) {
                res.status(400).json({ message: "Invalid channel language ID" });
                return;
            }
            const channelLanguage = await this.channelLanguageService.getChannelLanguageById(id);
            if (!channelLanguage) {
                res.status(404).json({ message: "Channel language not found" });
                return;
            }
            res.status(200).json(channelLanguage);
        }
        catch (error) {
            res
                .status(500)
                .json({ message: "Failed to fetch channel language", error });
        }
    };
    getChannelLanguagesByChannelId = async (req, res) => {
        try {
            const channelId = parseInt(req.params.channelId, 10);
            if (isNaN(channelId)) {
                res.status(400).json({ message: "Invalid channel ID" });
                return;
            }
            const channelLanguages = await this.channelLanguageService.getChannelLanguagesByChannelId(channelId);
            res.status(200).json(channelLanguages);
        }
        catch (error) {
            res
                .status(500)
                .json({
                message: "Failed to fetch channel languages by channel id",
                error,
            });
        }
    };
    updateChannelLanguage = async (req, res) => {
        try {
            const id = parseInt(req.params.id, 10);
            if (isNaN(id)) {
                res.status(400).json({ message: "Invalid channel language ID" });
                return;
            }
            const { channel_id, language, channel } = req.body;
            const existingUrl = await this.channelLanguageService.getChannelLanguageById(id);
            if (!existingUrl) {
                res.status(404).json({ message: "Channel language not found" });
                return;
            }
            const targetChannelId = channel_id !== undefined ? channel_id : existingUrl.channel_id;
            const targetLanguage = language !== undefined ? language : existingUrl.language;
            if (targetChannelId !== existingUrl.channel_id ||
                targetLanguage !== existingUrl.language) {
                const duplicate = await this.channelLanguageService.getChannelLanguageByChannelIdAndLanguage(targetChannelId, targetLanguage);
                if (duplicate) {
                    res
                        .status(409)
                        .json({ message: "Language already defined for this channel" });
                    return;
                }
            }
            if (channel_id && channel_id !== existingUrl.channel_id) {
                const existingChannel = await this.channelService.getChannelById(channel_id);
                if (!existingChannel) {
                    res.status(404).json({ message: "Channel not found" });
                    return;
                }
            }
            const updatedChannelLanguage = await this.channelLanguageService.updateChannelLanguage(id, {
                channel_id,
                language,
                channel,
            });
            if (!updatedChannelLanguage) {
                res.status(404).json({ message: "Channel language not found" });
                return;
            }
            res.status(200).json(updatedChannelLanguage);
        }
        catch (error) {
            res
                .status(500)
                .json({ message: "Failed to update channel language", error });
        }
    };
    deleteChannelLanguage = async (req, res) => {
        try {
            const id = parseInt(req.params.id, 10);
            if (isNaN(id)) {
                res.status(400).json({ message: "Invalid channel language ID" });
                return;
            }
            const success = await this.channelLanguageService.deleteChannelLanguage(id);
            if (!success) {
                res.status(404).json({ message: "Channel language not found" });
                return;
            }
            res.status(204).send();
        }
        catch (error) {
            res
                .status(500)
                .json({ message: "Failed to delete channel language", error });
        }
    };
};
ChannelLanguageController = __decorate([
    (0, tsyringe_1.injectable)(),
    __metadata("design:paramtypes", [channel_language_service_1.default,
        channel_service_1.default])
], ChannelLanguageController);
exports.default = ChannelLanguageController;
