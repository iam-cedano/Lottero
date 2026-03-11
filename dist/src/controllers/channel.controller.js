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
const group_service_1 = __importDefault(require("../services/group.service"));
let ChannelController = class ChannelController {
    channelService;
    groupService;
    constructor(channelService, groupService) {
        this.channelService = channelService;
        this.groupService = groupService;
    }
    createChannel = async (req, res) => {
        try {
            const { language, chat_id } = req.body;
            if (!language || !chat_id) {
                res
                    .status(400)
                    .json({ message: "Missing language, or chat_id" });
                return;
            }
            const channel = await this.channelService.createChannel({
                language,
                chat_id,
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
    getChannelsByGroupId = async (req, res) => {
        try {
            const groupId = parseInt(req.params.groupId, 10);
            if (isNaN(groupId)) {
                res.status(400).json({ message: "Invalid channel group ID" });
                return;
            }
            const channels = await this.channelService.getChannelsByGroupId(groupId);
            res.status(200).json(channels);
        }
        catch (error) {
            res.status(500).json({
                message: "Failed to fetch channels by channel group id",
                error,
            });
        }
    };
    updateChannel = async (req, res) => {
        try {
            const id = parseInt(req.params.id, 10);
            if (isNaN(id)) {
                res.status(400).json({ message: "Invalid channel ID" });
                return;
            }
            const { group_id, language, chat_id } = req.body;
            const existingChannel = await this.channelService.getChannelById(id);
            if (!existingChannel) {
                res.status(404).json({ message: "Channel not found" });
                return;
            }
            const targetLanguage = language !== undefined ? language : existingChannel.language;
            const updatedChannel = await this.channelService.updateChannel(id, {
                language,
                chat_id,
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
        group_service_1.default])
], ChannelController);
exports.default = ChannelController;
