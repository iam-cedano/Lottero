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
const channel_statistic_repository_1 = __importDefault(require("../repositories/channel-statistic.repository"));
let ChannelStatisticService = class ChannelStatisticService {
    channelStatisticRepository;
    constructor(channelStatisticRepository) {
        this.channelStatisticRepository = channelStatisticRepository;
    }
    async createChannelStatistic(data) {
        return this.channelStatisticRepository.create(data);
    }
    async getChannelStatistics() {
        return this.channelStatisticRepository.findAll();
    }
    async getChannelStatisticById(id) {
        return this.channelStatisticRepository.findById(id);
    }
    async updateChannelStatistic(id, data) {
        return this.channelStatisticRepository.update(id, data);
    }
    async deleteChannelStatistic(id) {
        return this.channelStatisticRepository.delete(id);
    }
    async getChannelStatisticByChannelId(channelId) {
        return this.channelStatisticRepository.findByChannelId(channelId);
    }
    async getChannelStatisticByChannelAndDate(channelId, date) {
        return this.channelStatisticRepository.findByChannelAndDate(channelId, date);
    }
};
ChannelStatisticService = __decorate([
    (0, tsyringe_1.injectable)(),
    __metadata("design:paramtypes", [channel_statistic_repository_1.default])
], ChannelStatisticService);
exports.default = ChannelStatisticService;
