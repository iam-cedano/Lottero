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
const channel_message_service_1 = __importDefault(require("../services/channel-message.service"));
const channel_service_1 = __importDefault(require("../services/channel.service"));
const message_service_1 = __importDefault(require("../services/message.service"));
let ChannelMessageController = class ChannelMessageController {
    channelMessageService;
    channelService;
    messageService;
    constructor(channelMessageService, channelService, messageService) {
        this.channelMessageService = channelMessageService;
        this.channelService = channelService;
        this.messageService = messageService;
    }
    createChannelMessage = async (req, res) => {
        try {
            const { channel_id, message_id } = req.body;
            if (!channel_id || !message_id) {
                res.status(400).json({ message: "Missing channel_id or message_id" });
                return;
            }
            const channel = await this.channelService.getChannelById(channel_id);
            if (!channel) {
                res.status(404).json({ message: "Channel not found" });
                return;
            }
            const message = await this.messageService.getMessageById(message_id);
            if (!message) {
                res.status(404).json({ message: "Message not found" });
                return;
            }
            const channelMessage = await this.channelMessageService.createChannelMessage({
                channel_id,
                message_id,
            });
            res.status(201).json(channelMessage);
        }
        catch (error) {
            res
                .status(500)
                .json({ message: "Failed to create channel message", error });
        }
    };
    getChannelMessages = async (_req, res) => {
        try {
            const channelMessages = await this.channelMessageService.getChannelMessages();
            res.status(200).json(channelMessages);
        }
        catch (error) {
            res
                .status(500)
                .json({ message: "Failed to fetch channel messages", error });
        }
    };
    getChannelMessageById = async (req, res) => {
        try {
            const id = parseInt(req.params.id, 10);
            if (isNaN(id)) {
                res.status(400).json({ message: "Invalid channel message ID" });
                return;
            }
            const channelMessage = await this.channelMessageService.getChannelMessageById(id);
            if (!channelMessage) {
                res.status(404).json({ message: "Channel message not found" });
                return;
            }
            res.status(200).json(channelMessage);
        }
        catch (error) {
            res
                .status(500)
                .json({ message: "Failed to fetch channel message", error });
        }
    };
    getChannelMessagesByChannelId = async (req, res) => {
        try {
            const channelId = parseInt(req.params.channelId, 10);
            if (isNaN(channelId)) {
                res.status(400).json({ message: "Invalid channel ID" });
                return;
            }
            const channelMessages = await this.channelMessageService.getChannelMessagesByChannelId(channelId);
            res.status(200).json(channelMessages);
        }
        catch (error) {
            res.status(500).json({
                message: "Failed to fetch channel messages by channel id",
                error,
            });
        }
    };
    updateChannelMessage = async (req, res) => {
        try {
            const id = parseInt(req.params.id, 10);
            if (isNaN(id)) {
                res.status(400).json({ message: "Invalid channel message ID" });
                return;
            }
            const { channel_id, message_id } = req.body;
            if (channel_id !== undefined) {
                const channel = await this.channelService.getChannelById(channel_id);
                if (!channel) {
                    res.status(404).json({ message: "Channel not found" });
                    return;
                }
            }
            if (message_id !== undefined) {
                const message = await this.messageService.getMessageById(message_id);
                if (!message) {
                    res.status(404).json({ message: "Message not found" });
                    return;
                }
            }
            const updatedChannelMessage = await this.channelMessageService.updateChannelMessage(id, {
                channel_id,
                message_id,
            });
            if (!updatedChannelMessage) {
                res.status(404).json({ message: "Channel message not found" });
                return;
            }
            res.status(200).json(updatedChannelMessage);
        }
        catch (error) {
            res
                .status(500)
                .json({ message: "Failed to update channel message", error });
        }
    };
    deleteChannelMessage = async (req, res) => {
        try {
            const id = parseInt(req.params.id, 10);
            if (isNaN(id)) {
                res.status(400).json({ message: "Invalid channel message ID" });
                return;
            }
            const success = await this.channelMessageService.deleteChannelMessage(id);
            if (!success) {
                res.status(404).json({ message: "Channel message not found" });
                return;
            }
            res.status(204).send();
        }
        catch (error) {
            res
                .status(500)
                .json({ message: "Failed to delete channel message", error });
        }
    };
};
ChannelMessageController = __decorate([
    (0, tsyringe_1.injectable)(),
    __metadata("design:paramtypes", [channel_message_service_1.default,
        channel_service_1.default,
        message_service_1.default])
], ChannelMessageController);
exports.default = ChannelMessageController;
