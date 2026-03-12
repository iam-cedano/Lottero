import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import { CreateChannelRequest } from "@/models/channel.model";
import ChannelService from "@/services/channel.service";
import GroupService from "@/services/group.service";

@injectable()
export default class ChannelController {
  constructor(
    @inject(ChannelService) private readonly channelService: ChannelService,
    @inject(GroupService) private readonly groupService: GroupService,
  ) {}

  public createChannel = async (
    req: Request<any, any, CreateChannelRequest>,
    res: Response,
  ): Promise<void> => {
    try {
      const { language, chat_id } = req.body;

      if (!language || !chat_id) {
        res.status(400).json({ message: "Missing language, or chat_id" });
        return;
      }

      const channel = await this.channelService.createChannel({
        language,
        chat_id,
      });

      res.status(201).json(channel);
    } catch (error) {
      res.status(500).json({ message: "Failed to create channel", error });
    }
  };

  public getChannels = async (_req: Request, res: Response): Promise<void> => {
    try {
      const channels = await this.channelService.getChannels();
      res.status(200).json(channels);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch channels", error });
    }
  };

  public getChannelById = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    try {
      const id = parseInt(req.params.id as string, 10);
      if (isNaN(id)) {
        res.status(400).json({ message: "Invalid channel ID" });
        return;
      }
      const channel = await this.channelService.getChannelById(id);
      if (!channel) {
        res.status(404).json({ message: "Channel not found" });
        return;
      }
      res.status(200).json(channel);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch channel", error });
    }
  };

  public getChannelsByGroupId = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    try {
      const groupId = parseInt(req.params.groupId as string, 10);
      if (isNaN(groupId)) {
        res.status(400).json({ message: "Invalid channel group ID" });
        return;
      }
      const channels = await this.channelService.getChannelsByGroupId(groupId);
      res.status(200).json(channels);
    } catch (error) {
      res.status(500).json({
        message: "Failed to fetch channels by channel group id",
        error,
      });
    }
  };

  public updateChannel = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id as string, 10);
      if (isNaN(id)) {
        res.status(400).json({ message: "Invalid channel ID" });
        return;
      }
      const { group_id, language, chat_id } = req.body;

      const existingChannel = await this.channelService.getChannelById(id);
      if (!existingChannel) {
        res.status(404).json({ message: "Channel not found" });
        return;
      }

      const targetLanguage =
        language !== undefined ? language : existingChannel.language;

      const updatedChannel = await this.channelService.updateChannel(id, {
        language,
        chat_id,
      });
      if (!updatedChannel) {
        res.status(404).json({ message: "Channel not found" });
        return;
      }
      res.status(200).json(updatedChannel);
    } catch (error) {
      res.status(500).json({ message: "Failed to update channel", error });
    }
  };

  public deleteChannel = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id as string, 10);
      if (isNaN(id)) {
        res.status(400).json({ message: "Invalid channel ID" });
        return;
      }
      const success = await this.channelService.deleteChannel(id);
      if (!success) {
        res.status(404).json({ message: "Channel not found" });
        return;
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete channel", error });
    }
  };
}
