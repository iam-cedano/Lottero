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
const channel_message_repository_1 = __importDefault(require("../repositories/channel-message.repository"));
let ChannelMessageService = class ChannelMessageService {
    channelMessageRepository;
    constructor(channelMessageRepository) {
        this.channelMessageRepository = channelMessageRepository;
    }
    async createChannelMessage(data) {
        return this.channelMessageRepository.create(data);
    }
    async getChannelMessages() {
        return this.channelMessageRepository.findAll();
    }
    async getChannelMessageById(id) {
        return this.channelMessageRepository.findById(id);
    }
    async getChannelMessagesByChannelId(channelId) {
        return this.channelMessageRepository.findByChannelId(channelId);
    }
    async getChannelMessagesByMessageId(messageId) {
        return this.channelMessageRepository.findByMessageId(messageId);
    }
    async updateChannelMessage(id, data) {
        return this.channelMessageRepository.update(id, data);
    }
    async deleteChannelMessage(id) {
        return this.channelMessageRepository.delete(id);
    }
};
ChannelMessageService = __decorate([
    (0, tsyringe_1.injectable)(),
    __metadata("design:paramtypes", [channel_message_repository_1.default])
], ChannelMessageService);
exports.default = ChannelMessageService;
