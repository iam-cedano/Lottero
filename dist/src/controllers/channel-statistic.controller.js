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
const channel_statistic_service_1 = __importDefault(require("../services/channel-statistic.service"));
const channel_service_1 = __importDefault(require("../services/channel.service"));
let ChannelStatisticController = class ChannelStatisticController {
    channelStatisticService;
    channelService;
    constructor(channelStatisticService, channelService) {
        this.channelStatisticService = channelStatisticService;
        this.channelService = channelService;
    }
    createChannelStatistic = async (req, res) => {
        try {
            const { channel_id, the_date, data } = req.body;
            if (!channel_id || !the_date || !data) {
                res
                    .status(400)
                    .json({ message: "Missing channel_id, the_date, or data" });
                return;
            }
            const channel = await this.channelService.getChannelById(channel_id);
            if (!channel) {
                res.status(404).json({ message: "Channel not found" });
                return;
            }
            const channelStatistic = await this.channelStatisticService.createChannelStatistic({
                channel_id,
                the_date: new Date(the_date),
                data,
            });
            res.status(201).json(channelStatistic);
        }
        catch (error) {
            res
                .status(500)
                .json({ message: "Failed to create channel statistic", error });
        }
    };
    getChannelStatistics = async (_req, res) => {
        try {
            const channelStatistics = await this.channelStatisticService.getChannelStatistics();
            res.status(200).json(channelStatistics);
        }
        catch (error) {
            res
                .status(500)
                .json({ message: "Failed to fetch channel statistics", error });
        }
    };
    getChannelStatisticById = async (req, res) => {
        try {
            const id = parseInt(req.params.id, 10);
            if (isNaN(id)) {
                res.status(400).json({ message: "Invalid channel statistic ID" });
                return;
            }
            const channelStatistic = await this.channelStatisticService.getChannelStatisticById(id);
            if (!channelStatistic) {
                res.status(404).json({ message: "Channel statistic not found" });
                return;
            }
            res.status(200).json(channelStatistic);
        }
        catch (error) {
            res
                .status(500)
                .json({ message: "Failed to fetch channel statistic", error });
        }
    };
    updateChannelStatistic = async (req, res) => {
        try {
            const id = parseInt(req.params.id, 10);
            if (isNaN(id)) {
                res.status(400).json({ message: "Invalid channel statistic ID" });
                return;
            }
            const { channel_id, the_date, data } = req.body;
            if (channel_id) {
                const channel = await this.channelService.getChannelById(channel_id);
                if (!channel) {
                    res.status(404).json({ message: "Channel not found" });
                    return;
                }
            }
            const updateData = {};
            if (channel_id !== undefined)
                updateData.channel_id = channel_id;
            if (the_date !== undefined)
                updateData.the_date = new Date(the_date);
            if (data !== undefined)
                updateData.data = data;
            const updatedChannelStatistic = await this.channelStatisticService.updateChannelStatistic(id, updateData);
            if (!updatedChannelStatistic) {
                res.status(404).json({ message: "Channel statistic not found" });
                return;
            }
            res.status(200).json(updatedChannelStatistic);
        }
        catch (error) {
            res
                .status(500)
                .json({ message: "Failed to update channel statistic", error });
        }
    };
    deleteChannelStatistic = async (req, res) => {
        try {
            const id = parseInt(req.params.id, 10);
            if (isNaN(id)) {
                res.status(400).json({ message: "Invalid channel statistic ID" });
                return;
            }
            const success = await this.channelStatisticService.deleteChannelStatistic(id);
            if (!success) {
                res.status(404).json({ message: "Channel statistic not found" });
                return;
            }
            res.status(204).send();
        }
        catch (error) {
            res
                .status(500)
                .json({ message: "Failed to delete channel statistic", error });
        }
    };
};
ChannelStatisticController = __decorate([
    (0, tsyringe_1.injectable)(),
    __metadata("design:paramtypes", [channel_statistic_service_1.default,
        channel_service_1.default])
], ChannelStatisticController);
exports.default = ChannelStatisticController;
