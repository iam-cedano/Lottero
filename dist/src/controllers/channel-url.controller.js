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
const channel_url_service_1 = __importDefault(require("../services/channel-url.service"));
const channel_service_1 = __importDefault(require("../services/channel.service"));
let ChannelUrlController = class ChannelUrlController {
    channelUrlService;
    channelService;
    constructor(channelUrlService, channelService) {
        this.channelUrlService = channelUrlService;
        this.channelService = channelService;
    }
    createChannelUrl = async (req, res) => {
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
            const existingLanguageUrl = await this.channelUrlService.getChannelUrlByChannelIdAndLanguage(channel_id, language);
            if (existingLanguageUrl) {
                res
                    .status(409)
                    .json({ message: "Language already defined for this channel" });
                return;
            }
            const channelUrl = await this.channelUrlService.createChannelUrl({
                channel_id,
                language,
                channel,
            });
            res.status(201).json(channelUrl);
        }
        catch (error) {
            res.status(500).json({ message: "Failed to create channel url", error });
        }
    };
    getChannelUrls = async (_req, res) => {
        try {
            const channelUrls = await this.channelUrlService.getChannelUrls();
            res.status(200).json(channelUrls);
        }
        catch (error) {
            res.status(500).json({ message: "Failed to fetch channel urls", error });
        }
    };
    getChannelUrlById = async (req, res) => {
        try {
            const id = parseInt(req.params.id, 10);
            if (isNaN(id)) {
                res.status(400).json({ message: "Invalid channel url ID" });
                return;
            }
            const channelUrl = await this.channelUrlService.getChannelUrlById(id);
            if (!channelUrl) {
                res.status(404).json({ message: "Channel url not found" });
                return;
            }
            res.status(200).json(channelUrl);
        }
        catch (error) {
            res.status(500).json({ message: "Failed to fetch channel url", error });
        }
    };
    getChannelUrlsByChannelId = async (req, res) => {
        try {
            const channelId = parseInt(req.params.channelId, 10);
            if (isNaN(channelId)) {
                res.status(400).json({ message: "Invalid channel ID" });
                return;
            }
            const channelUrls = await this.channelUrlService.getChannelUrlsByChannelId(channelId);
            res.status(200).json(channelUrls);
        }
        catch (error) {
            res
                .status(500)
                .json({ message: "Failed to fetch channel urls by channel id", error });
        }
    };
    updateChannelUrl = async (req, res) => {
        try {
            const id = parseInt(req.params.id, 10);
            if (isNaN(id)) {
                res.status(400).json({ message: "Invalid channel url ID" });
                return;
            }
            const { channel_id, language, channel } = req.body;
            const existingUrl = await this.channelUrlService.getChannelUrlById(id);
            if (!existingUrl) {
                res.status(404).json({ message: "Channel url not found" });
                return;
            }
            const targetChannelId = channel_id !== undefined ? channel_id : existingUrl.channel_id;
            const targetLanguage = language !== undefined ? language : existingUrl.language;
            if (targetChannelId !== existingUrl.channel_id ||
                targetLanguage !== existingUrl.language) {
                const duplicate = await this.channelUrlService.getChannelUrlByChannelIdAndLanguage(targetChannelId, targetLanguage);
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
            const updatedChannelUrl = await this.channelUrlService.updateChannelUrl(id, {
                channel_id,
                language,
                channel,
            });
            if (!updatedChannelUrl) {
                res.status(404).json({ message: "Channel url not found" });
                return;
            }
            res.status(200).json(updatedChannelUrl);
        }
        catch (error) {
            res.status(500).json({ message: "Failed to update channel url", error });
        }
    };
    deleteChannelUrl = async (req, res) => {
        try {
            const id = parseInt(req.params.id, 10);
            if (isNaN(id)) {
                res.status(400).json({ message: "Invalid channel url ID" });
                return;
            }
            const success = await this.channelUrlService.deleteChannelUrl(id);
            if (!success) {
                res.status(404).json({ message: "Channel url not found" });
                return;
            }
            res.status(204).send();
        }
        catch (error) {
            res.status(500).json({ message: "Failed to delete channel url", error });
        }
    };
};
ChannelUrlController = __decorate([
    (0, tsyringe_1.injectable)(),
    __metadata("design:paramtypes", [channel_url_service_1.default,
        channel_service_1.default])
], ChannelUrlController);
exports.default = ChannelUrlController;
