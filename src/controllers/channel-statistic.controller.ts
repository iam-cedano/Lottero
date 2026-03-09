import { Request, Response } from "express";
import { injectable } from "tsyringe";
import {
  CreateChannelStatisticRequest,
  UpdateChannelStatisticRequest,
} from "@/models/channel-statistic.model";
import ChannelStatisticService from "@/services/channel-statistic.service";
import ChannelService from "@/services/channel.service";

@injectable()
export default class ChannelStatisticController {
  constructor(
    private readonly channelStatisticService: ChannelStatisticService,
    private readonly channelService: ChannelService,
  ) {}

  public createChannelStatistic = async (
    req: Request<any, any, CreateChannelStatisticRequest>,
    res: Response,
  ): Promise<void> => {
    try {
      const { channel_id, the_date, data } = req.body;

      if (!channel_id || !the_date || !data) {
        res
          .status(400)
          .json({ message: "Missing channel_id, the_date, or data" });
        return;
      }

      const channel = await this.channelService.getChannelById(channel_id);
      if (!channel) {
        res.status(404).json({ message: "Channel not found" });
        return;
      }

      const channelStatistic =
        await this.channelStatisticService.createChannelStatistic({
          channel_id,
          the_date: new Date(the_date),
          data,
        });

      res.status(201).json(channelStatistic);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Failed to create channel statistic", error });
    }
  };

  public getChannelStatistics = async (
    _req: Request,
    res: Response,
  ): Promise<void> => {
    try {
      const channelStatistics =
        await this.channelStatisticService.getChannelStatistics();
      res.status(200).json(channelStatistics);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Failed to fetch channel statistics", error });
    }
  };

  public getChannelStatisticById = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    try {
      const id = parseInt(req.params.id as string, 10);
      if (isNaN(id)) {
        res.status(400).json({ message: "Invalid channel statistic ID" });
        return;
      }
      const channelStatistic =
        await this.channelStatisticService.getChannelStatisticById(id);
      if (!channelStatistic) {
        res.status(404).json({ message: "Channel statistic not found" });
        return;
      }
      res.status(200).json(channelStatistic);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Failed to fetch channel statistic", error });
    }
  };

  public updateChannelStatistic = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    try {
      const id = parseInt(req.params.id as string, 10);
      if (isNaN(id)) {
        res.status(400).json({ message: "Invalid channel statistic ID" });
        return;
      }
      const { channel_id, the_date, data } =
        req.body as UpdateChannelStatisticRequest;

      if (channel_id) {
        const channel = await this.channelService.getChannelById(channel_id);
        if (!channel) {
          res.status(404).json({ message: "Channel not found" });
          return;
        }
      }

      const updateData: any = {};
      if (channel_id !== undefined) updateData.channel_id = channel_id;
      if (the_date !== undefined) updateData.the_date = new Date(the_date);
      if (data !== undefined) updateData.data = data;

      const updatedChannelStatistic =
        await this.channelStatisticService.updateChannelStatistic(
          id,
          updateData,
        );
      if (!updatedChannelStatistic) {
        res.status(404).json({ message: "Channel statistic not found" });
        return;
      }
      res.status(200).json(updatedChannelStatistic);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Failed to update channel statistic", error });
    }
  };

  public deleteChannelStatistic = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    try {
      const id = parseInt(req.params.id as string, 10);
      if (isNaN(id)) {
        res.status(400).json({ message: "Invalid channel statistic ID" });
        return;
      }
      const success =
        await this.channelStatisticService.deleteChannelStatistic(id);
      if (!success) {
        res.status(404).json({ message: "Channel statistic not found" });
        return;
      }
      res.status(204).send();
    } catch (error) {
      res
        .status(500)
        .json({ message: "Failed to delete channel statistic", error });
    }
  };
}
