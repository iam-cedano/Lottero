import BaseException from "@/exceptions/base.exception";
import ValidationException from "@/exceptions/validation.exception";
import { MessageRequest } from "@/models/message.model";
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

            if (!data.command || data.command.trim() == "") {
                throw new ValidationException(
                    "Command in data is required and cannot be empty.",
                );
            }

            if (data.command != "message") {
                throw new ValidationException("Command must be 'message'");
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
}