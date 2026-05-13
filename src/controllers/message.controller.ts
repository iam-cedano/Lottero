import BaseException from "@/exceptions/base.exception";
import ValidationException from "@/exceptions/validation.exception";
import { EditGroupMessageRequest, MessageGroupRequest } from "@/models/message.model";
import MessageService from "@/services/message.service";
import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";

@injectable()
export default class MessageController {

    public constructor(
        @inject(MessageService) private readonly messageService: MessageService,
    ) { }

    public sendGroupMessage = async (
        req: Request<Record<string, string>, unknown, MessageGroupRequest>,
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

            const result = await this.messageService.sendGroupMessage(recipient, data);

            res.status(201).send(result);
        } catch (error) {
            if (!(error instanceof BaseException)) {
                res.status(500).json({ message: "An error has occured", error: error instanceof Error ? error.stack : undefined });
                return;
            }

            error.report(res);
        }
    };

    public editGroupMessage = async (
        req: Request<Record<string, string>, unknown, EditGroupMessageRequest>,
        res: Response,
    ) => {
        try {
            const data = req.body;
            const { groupMessageId } = req.params;

            if (!data.type || data.type.trim() == "") {
                throw new ValidationException("Data type is required and cannot be empty.");
            }

            if (!groupMessageId || isNaN(Number(groupMessageId))) {
                throw new ValidationException("Group message ID is required and must be a valid number.");
            }

            const result = await this.messageService.editGroupMessage(Number(groupMessageId), data);

            res.status(200).send(result);
        } catch (error) {
            if (!(error instanceof BaseException)) {
                res.status(500).json({ message: "An error has occured", error: error instanceof Error ? error.stack : undefined });
                return;
            }

            error.report(res);
        }
    }

    public deleteGroupMessage = async (req: Request, res: Response) => {
        try {
            const { groupMessageId } = req.params;

            if (!groupMessageId || isNaN(Number(groupMessageId))) {
                throw new ValidationException("Group message ID is required and must be a valid number.");
            }

            await this.messageService.deleteGroupMessage(Number(groupMessageId));

            res.status(204).send(null);
        } catch (error) {
            if (!(error instanceof BaseException)) {
                res.status(500).json({ message: "An error has occured", error: error instanceof Error ? error.stack : undefined });
                return;
            }

            error.report(res);
        }
    }

    public editMessage = async () => {
        throw new Error("Not implemented yet");
    }


}