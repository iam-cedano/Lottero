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
const group_service_1 = __importDefault(require("../services/group.service"));
const group_message_service_1 = __importDefault(require("../services/group-message.service"));
let ChannelMessageController = class ChannelMessageController {
    channelMessageService;
    groupService;
    groupMessageService;
    constructor(channelMessageService, groupService, groupMessageService) {
        this.channelMessageService = channelMessageService;
        this.groupService = groupService;
        this.groupMessageService = groupMessageService;
    }
    createChannelMessage = async (req, res) => {
        try {
            const { group_id, group_message_id } = req.body;
            if (!group_id || !group_message_id) {
                res
                    .status(400)
                    .json({
                    groupMessage: "Missing group_id or group_message_id",
                });
                return;
            }
            const group = await this.groupService.getGroupById(group_id);
            if (!group) {
                res.status(404).json({ groupMessage: "Channel group not found" });
                return;
            }
            const groupMessage = await this.groupMessageService.getMessageById(group_message_id);
            if (!groupMessage) {
                res.status(404).json({ groupMessage: "GroupMessage not found" });
                return;
            }
            const channelMessage = await this.channelMessageService.createChannelMessage({
                group_id,
                group_message_id,
            });
            res.status(201).json(channelMessage);
        }
        catch (error) {
            res
                .status(500)
                .json({
                groupMessage: "Failed to create channel group groupMessage",
                error,
            });
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
                .json({
                groupMessage: "Failed to fetch channel group groupMessages",
                error,
            });
        }
    };
    getChannelMessageById = async (req, res) => {
        try {
            const id = parseInt(req.params.id, 10);
            if (isNaN(id)) {
                res
                    .status(400)
                    .json({ groupMessage: "Invalid channel group groupMessage ID" });
                return;
            }
            const channelMessage = await this.channelMessageService.getChannelMessageById(id);
            if (!channelMessage) {
                res
                    .status(404)
                    .json({ groupMessage: "Channel group groupMessage not found" });
                return;
            }
            res.status(200).json(channelMessage);
        }
        catch (error) {
            res
                .status(500)
                .json({
                groupMessage: "Failed to fetch channel group groupMessage",
                error,
            });
        }
    };
    getChannelMessagesByGroupId = async (req, res) => {
        try {
            const groupId = parseInt(req.params.groupId, 10);
            if (isNaN(groupId)) {
                res.status(400).json({ groupMessage: "Invalid channel group ID" });
                return;
            }
            const channelMessages = await this.channelMessageService.getChannelMessagesByGroupId(groupId);
            res.status(200).json(channelMessages);
        }
        catch (error) {
            res.status(500).json({
                groupMessage: "Failed to fetch channel group groupMessages by channel group id",
                error,
            });
        }
    };
    updateChannelMessage = async (req, res) => {
        try {
            const id = parseInt(req.params.id, 10);
            if (isNaN(id)) {
                res
                    .status(400)
                    .json({ groupMessage: "Invalid channel group groupMessage ID" });
                return;
            }
            const { group_id, group_message_id } = req.body;
            if (group_id !== undefined) {
                const group = await this.groupService.getGroupById(group_id);
                if (!group) {
                    res.status(404).json({ groupMessage: "Channel group not found" });
                    return;
                }
            }
            if (group_message_id !== undefined) {
                const groupMessage = await this.groupMessageService.getMessageById(group_message_id);
                if (!groupMessage) {
                    res.status(404).json({ groupMessage: "GroupMessage not found" });
                    return;
                }
            }
            const updatedChannelMessage = await this.channelMessageService.updateChannelMessage(id, {
                group_id,
                group_message_id,
            });
            if (!updatedChannelMessage) {
                res
                    .status(404)
                    .json({ groupMessage: "Channel group groupMessage not found" });
                return;
            }
            res.status(200).json(updatedChannelMessage);
        }
        catch (error) {
            res
                .status(500)
                .json({
                groupMessage: "Failed to update channel group groupMessage",
                error,
            });
        }
    };
    deleteChannelMessage = async (req, res) => {
        try {
            const id = parseInt(req.params.id, 10);
            if (isNaN(id)) {
                res
                    .status(400)
                    .json({ groupMessage: "Invalid channel group groupMessage ID" });
                return;
            }
            const success = await this.channelMessageService.deleteChannelMessage(id);
            if (!success) {
                res
                    .status(404)
                    .json({ groupMessage: "Channel group groupMessage not found" });
                return;
            }
            res.status(204).send();
        }
        catch (error) {
            res
                .status(500)
                .json({
                groupMessage: "Failed to delete channel group groupMessage",
                error,
            });
        }
    };
};
ChannelMessageController = __decorate([
    (0, tsyringe_1.injectable)(),
    __metadata("design:paramtypes", [channel_message_service_1.default,
        group_service_1.default,
        group_message_service_1.default])
], ChannelMessageController);
exports.default = ChannelMessageController;
