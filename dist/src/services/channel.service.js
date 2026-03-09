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
const channel_repository_1 = __importDefault(require("../repositories/channel.repository"));
let ChannelService = class ChannelService {
    channelRepository;
    constructor(channelRepository) {
        this.channelRepository = channelRepository;
    }
    async createChannel(data) {
        return this.channelRepository.create(data);
    }
    async getChannels() {
        return this.channelRepository.findAll();
    }
    async getChannelById(id) {
        return this.channelRepository.findById(id);
    }
    async updateChannel(id, data) {
        return this.channelRepository.update(id, data);
    }
    async deleteChannel(id) {
        return this.channelRepository.delete(id);
    }
};
ChannelService = __decorate([
    (0, tsyringe_1.injectable)(),
    __metadata("design:paramtypes", [channel_repository_1.default])
], ChannelService);
exports.default = ChannelService;
