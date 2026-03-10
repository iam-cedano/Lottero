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
const message_service_1 = __importDefault(require("../services/message.service"));
let MessageController = class MessageController {
    messageService;
    constructor(messageService) {
        this.messageService = messageService;
    }
    createMessage = async (req, res) => {
        try {
            const { content, action } = req.body;
            if (!content || !action) {
                res.status(400).json({ message: "Missing content or action" });
                return;
            }
            const message = await this.messageService.createMessage({
                content,
                action,
            });
            res.status(201).json(message);
        }
        catch (error) {
            res.status(500).json({ message: "Failed to create message", error });
        }
    };
    getMessages = async (_req, res) => {
        try {
            const messages = await this.messageService.getMessages();
            res.status(200).json(messages);
        }
        catch (error) {
            res.status(500).json({ message: "Failed to fetch messages", error });
        }
    };
    getMessageById = async (req, res) => {
        try {
            const id = parseInt(req.params.id, 10);
            if (isNaN(id)) {
                res.status(400).json({ message: "Invalid message ID" });
                return;
            }
            const message = await this.messageService.getMessageById(id);
            if (!message) {
                res.status(404).json({ message: "Message not found" });
                return;
            }
            res.status(200).json(message);
        }
        catch (error) {
            res.status(500).json({ message: "Failed to fetch message", error });
        }
    };
    updateMessage = async (req, res) => {
        try {
            const id = parseInt(req.params.id, 10);
            if (isNaN(id)) {
                res.status(400).json({ message: "Invalid message ID" });
                return;
            }
            const { content, action } = req.body;
            const updatedMessage = await this.messageService.updateMessage(id, {
                content,
                action,
            });
            if (!updatedMessage) {
                res.status(404).json({ message: "Message not found" });
                return;
            }
            res.status(200).json(updatedMessage);
        }
        catch (error) {
            res.status(500).json({ message: "Failed to update message", error });
        }
    };
    deleteMessage = async (req, res) => {
        try {
            const id = parseInt(req.params.id, 10);
            if (isNaN(id)) {
                res.status(400).json({ message: "Invalid message ID" });
                return;
            }
            const success = await this.messageService.deleteMessage(id);
            if (!success) {
                res.status(404).json({ message: "Message not found" });
                return;
            }
            res.status(204).send();
        }
        catch (error) {
            res.status(500).json({ message: "Failed to delete message", error });
        }
    };
};
MessageController = __decorate([
    (0, tsyringe_1.injectable)(),
    __metadata("design:paramtypes", [message_service_1.default])
], MessageController);
exports.default = MessageController;
