import { Request, Response } from "express";
import { injectable } from "tsyringe";
import { CreateChannelRequest } from "@/models/channel.model";
import ChannelService from "@/services/channel.service";
import ChannelGroupService from "@/services/channel-group.service";

@injectable()
export default class ChannelController {
  constructor(
    private readonly channelService: ChannelService,
    private readonly channelGroupService: ChannelGroupService,
  ) {}

  public createChannel = async (
    req: Request<any, any, CreateChannelRequest>,
    res: Response,
  ): Promise<void> => {
    try {
      const { channel_group_id, language, chat_id } = req.body;

      if (!channel_group_id || !language || !chat_id) {
        res
          .status(400)
          .json({ message: "Missing channel_group_id, language, or chat_id" });
        return;
      }

      const existingChannelGroup =
        await this.channelGroupService.getChannelGroupById(channel_group_id);
      if (!existingChannelGroup) {
        res.status(404).json({ message: "Channel group not found" });
        return;
      }

      const existingLanguageUrl =
        await this.channelService.getChannelByChannelGroupIdAndLanguage(
          channel_group_id,
          language,
        );
      if (existingLanguageUrl) {
        res
          .status(409)
          .json({ message: "Language already defined for this channel group" });
        return;
      }

      const channel = await this.channelService.createChannel({
        channel_group_id,
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

  public getChannelsByChannelGroupId = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    try {
      const channelGroupId = parseInt(req.params.channelGroupId as string, 10);
      if (isNaN(channelGroupId)) {
        res.status(400).json({ message: "Invalid channel group ID" });
        return;
      }
      const channels =
        await this.channelService.getChannelsByChannelGroupId(channelGroupId);
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
      const { channel_group_id, language, chat_id } = req.body;

      const existingChannel = await this.channelService.getChannelById(id);
      if (!existingChannel) {
        res.status(404).json({ message: "Channel not found" });
        return;
      }

      const targetChannelGroupId =
        channel_group_id !== undefined
          ? channel_group_id
          : existingChannel.channel_group_id;
      const targetLanguage =
        language !== undefined ? language : existingChannel.language;

      if (
        targetChannelGroupId !== existingChannel.channel_group_id ||
        targetLanguage !== existingChannel.language
      ) {
        const duplicate =
          await this.channelService.getChannelByChannelGroupIdAndLanguage(
            targetChannelGroupId,
            targetLanguage,
          );
        if (duplicate) {
          res.status(409).json({
            message: "Language already defined for this channel group",
          });
          return;
        }
      }

      if (
        channel_group_id &&
        channel_group_id !== existingChannel.channel_group_id
      ) {
        const existingChannelGroup =
          await this.channelGroupService.getChannelGroupById(channel_group_id);
        if (!existingChannelGroup) {
          res.status(404).json({ message: "Channel group not found" });
          return;
        }
      }

      const updatedChannel = await this.channelService.updateChannel(id, {
        channel_group_id,
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
