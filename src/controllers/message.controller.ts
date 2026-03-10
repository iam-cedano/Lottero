import { Request, Response } from "express";
import { injectable } from "tsyringe";
import { CreateMessageRequest, UpdateMessageRequest } from "@/models/message.model";
import MessageService from "@/services/message.service";

@injectable()
export default class MessageController {
  constructor(private readonly messageService: MessageService) {}

  public createMessage = async (
    req: Request<any, any, CreateMessageRequest>,
    res: Response,
  ): Promise<void> => {
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
    } catch (error) {
      res.status(500).json({ message: "Failed to create message", error });
    }
  };

  public getMessages = async (_req: Request, res: Response): Promise<void> => {
    try {
      const messages = await this.messageService.getMessages();
      res.status(200).json(messages);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch messages", error });
    }
  };

  public getMessageById = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    try {
      const id = parseInt(req.params.id as string, 10);
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
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch message", error });
    }
  };

  public updateMessage = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id as string, 10);
      if (isNaN(id)) {
        res.status(400).json({ message: "Invalid message ID" });
        return;
      }
      const { content, action }: UpdateMessageRequest = req.body;

      const updatedMessage = await this.messageService.updateMessage(id, {
        content,
        action,
      });
      if (!updatedMessage) {
        res.status(404).json({ message: "Message not found" });
        return;
      }
      res.status(200).json(updatedMessage);
    } catch (error) {
      res.status(500).json({ message: "Failed to update message", error });
    }
  };

  public deleteMessage = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id as string, 10);
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
    } catch (error) {
      res.status(500).json({ message: "Failed to delete message", error });
    }
  };
}
