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
const message_repository_1 = __importDefault(require("../repositories/message.repository"));
let MessageService = class MessageService {
    messageRepository;
    constructor(messageRepository) {
        this.messageRepository = messageRepository;
    }
    async createMessage(data) {
        return this.messageRepository.create(data);
    }
    async getMessages() {
        return this.messageRepository.findAll();
    }
    async getMessageById(id) {
        return this.messageRepository.findById(id);
    }
    async updateMessage(id, data) {
        return this.messageRepository.update(id, data);
    }
    async deleteMessage(id) {
        return this.messageRepository.delete(id);
    }
};
MessageService = __decorate([
    (0, tsyringe_1.injectable)(),
    __metadata("design:paramtypes", [message_repository_1.default])
], MessageService);
exports.default = MessageService;
