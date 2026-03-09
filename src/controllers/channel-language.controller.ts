import { Request, Response } from "express";
import { injectable } from "tsyringe";
import { CreateChannelLanguageRequest } from "@/models/channel-language.model";
import ChannelLanguageService from "@/services/channel-language.service";
import ChannelService from "@/services/channel.service";

@injectable()
export default class ChannelLanguageController {
  constructor(
    private readonly channelLanguageService: ChannelLanguageService,
    private readonly channelService: ChannelService,
  ) {}

  public createChannelLanguage = async (
    req: Request<any, any, CreateChannelLanguageRequest>,
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
        await this.channelLanguageService.getChannelLanguageByChannelIdAndLanguage(
          channel_id,
          language,
        );
      if (existingLanguageUrl) {
        res
          .status(409)
          .json({ message: "Language already defined for this channel" });
        return;
      }

      const channelLanguage =
        await this.channelLanguageService.createChannelLanguage({
          channel_id,
          language,
          channel,
        });

      res.status(201).json(channelLanguage);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Failed to create channel language", error });
    }
  };

  public getChannelLanguages = async (
    _req: Request,
    res: Response,
  ): Promise<void> => {
    try {
      const channelLanguages =
        await this.channelLanguageService.getChannelLanguages();
      res.status(200).json(channelLanguages);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Failed to fetch channel languages", error });
    }
  };

  public getChannelLanguageById = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    try {
      const id = parseInt(req.params.id as string, 10);
      if (isNaN(id)) {
        res.status(400).json({ message: "Invalid channel language ID" });
        return;
      }
      const channelLanguage =
        await this.channelLanguageService.getChannelLanguageById(id);
      if (!channelLanguage) {
        res.status(404).json({ message: "Channel language not found" });
        return;
      }
      res.status(200).json(channelLanguage);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Failed to fetch channel language", error });
    }
  };

  public getChannelLanguagesByChannelId = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    try {
      const channelId = parseInt(req.params.channelId as string, 10);
      if (isNaN(channelId)) {
        res.status(400).json({ message: "Invalid channel ID" });
        return;
      }
      const channelLanguages =
        await this.channelLanguageService.getChannelLanguagesByChannelId(
          channelId,
        );
      res.status(200).json(channelLanguages);
    } catch (error) {
      res
        .status(500)
        .json({
          message: "Failed to fetch channel languages by channel id",
          error,
        });
    }
  };

  public updateChannelLanguage = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    try {
      const id = parseInt(req.params.id as string, 10);
      if (isNaN(id)) {
        res.status(400).json({ message: "Invalid channel language ID" });
        return;
      }
      const { channel_id, language, channel } = req.body;

      const existingUrl =
        await this.channelLanguageService.getChannelLanguageById(id);
      if (!existingUrl) {
        res.status(404).json({ message: "Channel language not found" });
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
          await this.channelLanguageService.getChannelLanguageByChannelIdAndLanguage(
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

      const updatedChannelLanguage =
        await this.channelLanguageService.updateChannelLanguage(id, {
          channel_id,
          language,
          channel,
        });
      if (!updatedChannelLanguage) {
        res.status(404).json({ message: "Channel language not found" });
        return;
      }
      res.status(200).json(updatedChannelLanguage);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Failed to update channel language", error });
    }
  };

  public deleteChannelLanguage = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    try {
      const id = parseInt(req.params.id as string, 10);
      if (isNaN(id)) {
        res.status(400).json({ message: "Invalid channel language ID" });
        return;
      }
      const success =
        await this.channelLanguageService.deleteChannelLanguage(id);
      if (!success) {
        res.status(404).json({ message: "Channel language not found" });
        return;
      }
      res.status(204).send();
    } catch (error) {
      res
        .status(500)
        .json({ message: "Failed to delete channel language", error });
    }
  };
}
