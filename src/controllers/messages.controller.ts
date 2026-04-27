import BaseException from "@/exceptions/base.exception";
import ValidationException from "@/exceptions/validation.exception";
import { EditMessageGroupRequest, MessageRequest } from "@/models/message.model";
import MessagesService from "@/services/messages.service";
import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";

@injectable()
export default class MessagesController {

    public constructor(
        @inject(MessagesService) private readonly messagesService: MessagesService,
    ) { }

    public sendMessage = async (
        req: Request<Record<string, string>, unknown, MessageRequest>,
        res: Response,
    ) => {
        try {
            const { recipient, data } = req.body;

            if (!recipient || recipient.trim() == "") {
                throw new ValidationException("Recipient is required and cannot be empty.");
            }

            if (!data || Object.keys(data).length == 0) {
                throw new ValidationException("Data is required and cannot be empty.");
            }

            if (!data.type || data.type.trim() == "") {
                throw new ValidationException("Data type is required and cannot be empty.");
            }

            const result = await this.messagesService.sendMessage(recipient, data);

            res.status(201).send(result);
        } catch (error) {
            if (!(error instanceof BaseException)) {
                res.status(500).json({ message: "An error has occured", error: error instanceof Error ? error.stack : undefined });
                return;
            }

            error.report(res);
        }
    };

    public editMessage = async (
        req: Request<Record<string, string>, unknown, EditMessageGroupRequest>,
        res: Response,
    ) => {
        try {
            const { type } = req.body;
            const { groupMessageId } = req.params;

            if (!type || type.trim() == "") {
                throw new ValidationException("Data type is required and cannot be empty.");
            }

            if (!groupMessageId || isNaN(Number(groupMessageId))) {
                throw new ValidationException("Group message ID is required and must be a valid number.");
            }

            const result = await this.messagesService.editMessage(Number(groupMessageId), req.body);

            res.status(200).send(result);
        } catch (error) {
            if (!(error instanceof BaseException)) {
                res.status(500).json({ message: "An error has occured", error: error instanceof Error ? error.stack : undefined });
                return;
            }

            error.report(res);
        }
    }
}