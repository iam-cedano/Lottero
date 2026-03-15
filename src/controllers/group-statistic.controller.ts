import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import {
  CreateGroupStatisticRequest,
  UpdateGroupStatisticRequest,
} from "@/models/group-statistic.model";
import GroupStatisticService from "@/services/group-statistic.service";
import GroupService from "@/services/group.service";

@injectable()
export default class GroupStatisticController {
  constructor(
    @inject(GroupStatisticService)
    private readonly groupStatisticService: GroupStatisticService,
    @inject(GroupService) private readonly groupService: GroupService,
  ) {}

  public createGroupStatistic = async (
    req: Request<Record<string, string>, unknown, CreateGroupStatisticRequest>,
    res: Response,
  ): Promise<void> => {
    try {
      const { group_id, the_date, data } = req.body;

      if (!group_id || !the_date || !data) {
        res
          .status(400)
          .json({ message: "Missing group_id, the_date, or data" });
        return;
      }

      const group = await this.groupService.getGroupById(group_id);
      if (!group) {
        res.status(404).json({ message: "Channel group not found" });
        return;
      }

      const groupStatistic =
        await this.groupStatisticService.createGroupStatistic({
          group_id,
          the_date: new Date(the_date),
          data,
        });

      res.status(201).json(groupStatistic);
    } catch (error: unknown) {
      res
        .status(500)
        .json({ message: "Failed to create channel group statistic", error });
    }
  };

  public getGroupStatistics = async (
    _req: Request,
    res: Response,
  ): Promise<void> => {
    try {
      const groupStatistics =
        await this.groupStatisticService.getGroupStatistics();
      res.status(200).json(groupStatistics);
    } catch (error: unknown) {
      res
        .status(500)
        .json({ message: "Failed to fetch channel group statistics", error });
    }
  };

  public getGroupStatisticById = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    try {
      const id = parseInt(req.params.id as string, 10);
      if (isNaN(id)) {
        res.status(400).json({ message: "Invalid channel group statistic ID" });
        return;
      }
      const groupStatistic =
        await this.groupStatisticService.getGroupStatisticById(id);
      if (!groupStatistic) {
        res.status(404).json({ message: "Channel group statistic not found" });
        return;
      }
      res.status(200).json(groupStatistic);
    } catch (error: unknown) {
      res
        .status(500)
        .json({ message: "Failed to fetch channel group statistic", error });
    }
  };

  public updateGroupStatistic = async (
    req: Request<Record<string, string>, unknown, UpdateGroupStatisticRequest>,
    res: Response,
  ): Promise<void> => {
    try {
      const id = parseInt(req.params.id as string, 10);
      if (isNaN(id)) {
        res.status(400).json({ message: "Invalid channel group statistic ID" });
        return;
      }
      const { group_id, the_date, data } =
        req.body;

      if (group_id) {
        const group = await this.groupService.getGroupById(group_id);
        if (!group) {
          res.status(404).json({ message: "Channel group not found" });
          return;
        }
      }

      const updateData: Record<string, unknown> = {};
      if (group_id !== undefined) updateData.group_id = group_id;
      if (the_date !== undefined) updateData.the_date = new Date(the_date);
      if (data !== undefined) updateData.data = data;

      const updatedGroupStatistic =
        await this.groupStatisticService.updateGroupStatistic(id, updateData);
      if (!updatedGroupStatistic) {
        res.status(404).json({ message: "Channel group statistic not found" });
        return;
      }
      res.status(200).json(updatedGroupStatistic);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Failed to update channel group statistic", error });
    }
  };

  public deleteGroupStatistic = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    try {
      const id = parseInt(req.params.id as string, 10);
      if (isNaN(id)) {
        res.status(400).json({ message: "Invalid channel group statistic ID" });
        return;
      }
      const success = await this.groupStatisticService.deleteGroupStatistic(id);
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
