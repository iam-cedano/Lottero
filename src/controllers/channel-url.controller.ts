import { Request, Response } from "express";
import { injectable } from "tsyringe";
import { CreateChannelUrlRequest } from "@/models/channel-url.model";
import ChannelUrlService from "@/services/channel-url.service";
import ChannelService from "@/services/channel.service";

@injectable()
export default class ChannelUrlController {
  constructor(
    private readonly channelUrlService: ChannelUrlService,
    private readonly channelService: ChannelService,
  ) {}

  public createChannelUrl = async (
    req: Request<any, any, CreateChannelUrlRequest>,
    res: Response,
  ): Promise<void> => {
    try {
      const { channel_id, language, channel } = req.body;

      if (!channel_id || !language || !channel) {
        res
          .status(400)
          .json({ message: "Missing channel_id, language, or channel" });
        return;
      }

      const existingChannel =
        await this.channelService.getChannelById(channel_id);
      if (!existingChannel) {
        res.status(404).json({ message: "Channel not found" });
        return;
      }

      const existingLanguageUrl =
        await this.channelUrlService.getChannelUrlByChannelIdAndLanguage(
          channel_id,
          language,
        );
      if (existingLanguageUrl) {
        res
          .status(409)
          .json({ message: "Language already defined for this channel" });
        return;
      }

      const channelUrl = await this.channelUrlService.createChannelUrl({
        channel_id,
        language,
        channel,
      });

      res.status(201).json(channelUrl);
    } catch (error) {
      res.status(500).json({ message: "Failed to create channel url", error });
    }
  };

  public getChannelUrls = async (
    _req: Request,
    res: Response,
  ): Promise<void> => {
    try {
      const channelUrls = await this.channelUrlService.getChannelUrls();
      res.status(200).json(channelUrls);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch channel urls", error });
    }
  };

  public getChannelUrlById = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    try {
      const id = parseInt(req.params.id as string, 10);
      if (isNaN(id)) {
        res.status(400).json({ message: "Invalid channel url ID" });
        return;
      }
      const channelUrl = await this.channelUrlService.getChannelUrlById(id);
      if (!channelUrl) {
        res.status(404).json({ message: "Channel url not found" });
        return;
      }
      res.status(200).json(channelUrl);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch channel url", error });
    }
  };

  public getChannelUrlsByChannelId = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    try {
      const channelId = parseInt(req.params.channelId as string, 10);
      if (isNaN(channelId)) {
        res.status(400).json({ message: "Invalid channel ID" });
        return;
      }
      const channelUrls =
        await this.channelUrlService.getChannelUrlsByChannelId(channelId);
      res.status(200).json(channelUrls);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Failed to fetch channel urls by channel id", error });
    }
  };

  public updateChannelUrl = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    try {
      const id = parseInt(req.params.id as string, 10);
      if (isNaN(id)) {
        res.status(400).json({ message: "Invalid channel url ID" });
        return;
      }
      const { channel_id, language, channel } = req.body;

      const existingUrl = await this.channelUrlService.getChannelUrlById(id);
      if (!existingUrl) {
        res.status(404).json({ message: "Channel url not found" });
        return;
      }

      const targetChannelId =
        channel_id !== undefined ? channel_id : existingUrl.channel_id;
      const targetLanguage =
        language !== undefined ? language : existingUrl.language;

      if (
        targetChannelId !== existingUrl.channel_id ||
        targetLanguage !== existingUrl.language
      ) {
        const duplicate =
          await this.channelUrlService.getChannelUrlByChannelIdAndLanguage(
            targetChannelId,
            targetLanguage,
          );
        if (duplicate) {
          res
            .status(409)
            .json({ message: "Language already defined for this channel" });
          return;
        }
      }

      if (channel_id && channel_id !== existingUrl.channel_id) {
        const existingChannel =
          await this.channelService.getChannelById(channel_id);
        if (!existingChannel) {
          res.status(404).json({ message: "Channel not found" });
          return;
        }
      }

      const updatedChannelUrl = await this.channelUrlService.updateChannelUrl(
        id,
        {
          channel_id,
          language,
          channel,
        },
      );
      if (!updatedChannelUrl) {
        res.status(404).json({ message: "Channel url not found" });
        return;
      }
      res.status(200).json(updatedChannelUrl);
    } catch (error) {
      res.status(500).json({ message: "Failed to update channel url", error });
    }
  };

  public deleteChannelUrl = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    try {
      const id = parseInt(req.params.id as string, 10);
      if (isNaN(id)) {
        res.status(400).json({ message: "Invalid channel url ID" });
        return;
      }
      const success = await this.channelUrlService.deleteChannelUrl(id);
      if (!success) {
        res.status(404).json({ message: "Channel url not found" });
        return;
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete channel url", error });
    }
  };
}
