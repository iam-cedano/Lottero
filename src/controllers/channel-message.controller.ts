import { Request, Response } from "express";
import { injectable } from "tsyringe";
import { CreateChannelMessageRequest } from "@/models/channel-message.model";
import ChannelMessageService from "@/services/channel-message.service";
import ChannelService from "@/services/channel.service";
import MessageService from "@/services/message.service";

@injectable()
export default class ChannelMessageController {
  constructor(
    private readonly channelMessageService: ChannelMessageService,
    private readonly channelService: ChannelService,
    private readonly messageService: MessageService,
  ) {}

  public createChannelMessage = async (
    req: Request<any, any, CreateChannelMessageRequest>,
    res: Response,
  ): Promise<void> => {
    try {
      const { channel_id, message_id } = req.body;

      if (!channel_id || !message_id) {
        res.status(400).json({ message: "Missing channel_id or message_id" });
        return;
      }

      const channel = await this.channelService.getChannelById(channel_id);
      if (!channel) {
        res.status(404).json({ message: "Channel not found" });
        return;
      }

      const message = await this.messageService.getMessageById(message_id);
      if (!message) {
        res.status(404).json({ message: "Message not found" });
        return;
      }

      const channelMessage =
        await this.channelMessageService.createChannelMessage({
          channel_id,
          message_id,
        });

      res.status(201).json(channelMessage);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Failed to create channel message", error });
    }
  };

  public getChannelMessages = async (
    _req: Request,
    res: Response,
  ): Promise<void> => {
    try {
      const channelMessages =
        await this.channelMessageService.getChannelMessages();
      res.status(200).json(channelMessages);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Failed to fetch channel messages", error });
    }
  };

  public getChannelMessageById = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    try {
      const id = parseInt(req.params.id as string, 10);
      if (isNaN(id)) {
        res.status(400).json({ message: "Invalid channel message ID" });
        return;
      }
      const channelMessage =
        await this.channelMessageService.getChannelMessageById(id);
      if (!channelMessage) {
        res.status(404).json({ message: "Channel message not found" });
        return;
      }
      res.status(200).json(channelMessage);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Failed to fetch channel message", error });
    }
  };

  public getChannelMessagesByChannelId = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    try {
      const channelId = parseInt(req.params.channelId as string, 10);
      if (isNaN(channelId)) {
        res.status(400).json({ message: "Invalid channel ID" });
        return;
      }
      const channelMessages =
        await this.channelMessageService.getChannelMessagesByChannelId(
          channelId,
        );
      res.status(200).json(channelMessages);
    } catch (error) {
      res.status(500).json({
        message: "Failed to fetch channel messages by channel id",
        error,
      });
    }
  };

  public updateChannelMessage = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    try {
      const id = parseInt(req.params.id as string, 10);
      if (isNaN(id)) {
        res.status(400).json({ message: "Invalid channel message ID" });
        return;
      }
      const { channel_id, message_id } = req.body;

      if (channel_id !== undefined) {
        const channel = await this.channelService.getChannelById(channel_id);
        if (!channel) {
          res.status(404).json({ message: "Channel not found" });
          return;
        }
      }

      if (message_id !== undefined) {
        const message = await this.messageService.getMessageById(message_id);
        if (!message) {
          res.status(404).json({ message: "Message not found" });
          return;
        }
      }

      const updatedChannelMessage =
        await this.channelMessageService.updateChannelMessage(id, {
          channel_id,
          message_id,
        });
      if (!updatedChannelMessage) {
        res.status(404).json({ message: "Channel message not found" });
        return;
      }
      res.status(200).json(updatedChannelMessage);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Failed to update channel message", error });
    }
  };

  public deleteChannelMessage = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    try {
      const id = parseInt(req.params.id as string, 10);
      if (isNaN(id)) {
        res.status(400).json({ message: "Invalid channel message ID" });
        return;
      }
      const success =
        await this.channelMessageService.deleteChannelMessage(id);
      if (!success) {
        res.status(404).json({ message: "Channel message not found" });
        return;
      }
      res.status(204).send();
    } catch (error) {
      res
        .status(500)
        .json({ message: "Failed to delete channel message", error });
    }
  };
}
