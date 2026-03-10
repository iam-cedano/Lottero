import { Request, Response } from "express";
import { injectable } from "tsyringe";
import {
  CreateChannelGroupStatisticRequest,
  UpdateChannelGroupStatisticRequest,
} from "@/models/channel-group-statistic.model";
import ChannelGroupStatisticService from "@/services/channel-group-statistic.service";
import ChannelGroupService from "@/services/channel-group.service";

@injectable()
export default class ChannelGroupStatisticController {
  constructor(
    private readonly channelGroupStatisticService: ChannelGroupStatisticService,
    private readonly channelGroupService: ChannelGroupService,
  ) {}

  public createChannelGroupStatistic = async (
    req: Request<any, any, CreateChannelGroupStatisticRequest>,
    res: Response,
  ): Promise<void> => {
    try {
      const { channel_group_id, the_date, data } = req.body;

      if (!channel_group_id || !the_date || !data) {
        res
          .status(400)
          .json({ message: "Missing channel_group_id, the_date, or data" });
        return;
      }

      const channelGroup =
        await this.channelGroupService.getChannelGroupById(channel_group_id);
      if (!channelGroup) {
        res.status(404).json({ message: "Channel group not found" });
        return;
      }

      const channelGroupStatistic =
        await this.channelGroupStatisticService.createChannelGroupStatistic({
          channel_group_id,
          the_date: new Date(the_date),
          data,
        });

      res.status(201).json(channelGroupStatistic);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Failed to create channel group statistic", error });
    }
  };

  public getChannelGroupStatistics = async (
    _req: Request,
    res: Response,
  ): Promise<void> => {
    try {
      const channelGroupStatistics =
        await this.channelGroupStatisticService.getChannelGroupStatistics();
      res.status(200).json(channelGroupStatistics);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Failed to fetch channel group statistics", error });
    }
  };

  public getChannelGroupStatisticById = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    try {
      const id = parseInt(req.params.id as string, 10);
      if (isNaN(id)) {
        res.status(400).json({ message: "Invalid channel group statistic ID" });
        return;
      }
      const channelGroupStatistic =
        await this.channelGroupStatisticService.getChannelGroupStatisticById(
          id,
        );
      if (!channelGroupStatistic) {
        res.status(404).json({ message: "Channel group statistic not found" });
        return;
      }
      res.status(200).json(channelGroupStatistic);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Failed to fetch channel group statistic", error });
    }
  };

  public updateChannelGroupStatistic = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    try {
      const id = parseInt(req.params.id as string, 10);
      if (isNaN(id)) {
        res.status(400).json({ message: "Invalid channel group statistic ID" });
        return;
      }
      const { channel_group_id, the_date, data } =
        req.body as UpdateChannelGroupStatisticRequest;

      if (channel_group_id) {
        const channelGroup =
          await this.channelGroupService.getChannelGroupById(channel_group_id);
        if (!channelGroup) {
          res.status(404).json({ message: "Channel group not found" });
          return;
        }
      }

      const updateData: any = {};
      if (channel_group_id !== undefined)
        updateData.channel_group_id = channel_group_id;
      if (the_date !== undefined) updateData.the_date = new Date(the_date);
      if (data !== undefined) updateData.data = data;

      const updatedChannelGroupStatistic =
        await this.channelGroupStatisticService.updateChannelGroupStatistic(
          id,
          updateData,
        );
      if (!updatedChannelGroupStatistic) {
        res.status(404).json({ message: "Channel group statistic not found" });
        return;
      }
      res.status(200).json(updatedChannelGroupStatistic);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Failed to update channel group statistic", error });
    }
  };

  public deleteChannelGroupStatistic = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    try {
      const id = parseInt(req.params.id as string, 10);
      if (isNaN(id)) {
        res.status(400).json({ message: "Invalid channel group statistic ID" });
        return;
      }
      const success =
        await this.channelGroupStatisticService.deleteChannelGroupStatistic(id);
      if (!success) {
        res.status(404).json({ message: "Channel group statistic not found" });
        return;
      }
      res.status(204).send();
    } catch (error) {
      res
        .status(500)
        .json({ message: "Failed to delete channel group statistic", error });
    }
  };
}
