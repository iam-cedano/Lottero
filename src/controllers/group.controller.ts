import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import {
  MessageRequest,
  CreateGroupRequest,
  UpdateGroupRequest,
} from "@/models/group.model";
import GroupService from "@/services/group.service";
import BaseException from "@/exceptions/base.exception";
import ValidationException from "@/exceptions/validation.exception";

@injectable()
export default class GroupController {
  constructor(
    @inject(GroupService) private readonly groupService: GroupService,
  ) {}

  public sendMessage = async (
    req: Request<Record<string, string>, unknown, MessageRequest>,
    res: Response,
  ) => {
    try {
      const { channel, data } = req.body;

      if (!channel) {
        throw new ValidationException("Channel is required");
      }

      if (!data || Object.keys(data).length === 0) {
        throw new ValidationException("Data is required");
      }

      if (!data.command || data.command == "") {
        throw new ValidationException(
          "Command in data is required and cannot be empty.",
        );
      }

      const result = await this.groupService.sendMessage(channel, data);

      res.status(201).send(result);
    } catch (error) {
      if (!(error instanceof BaseException)) {
        res.status(500).json({ message: "An error has occured" });
        return;
      }

      error.report(res);
    }
  };

  public addChannelToGroup = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    try {
      const id = parseInt(req.params.id as string, 10);
      if (isNaN(id)) {
        throw new ValidationException("Parameter ID is missing");
      }

      const channel_id = parseInt(req.params.channel_id as string, 10);
      if (isNaN(channel_id)) {
        throw new ValidationException("Channel ID is missing or invalid");
      }

      const assignment = await this.groupService.addChannelToGroup(
        id,
        channel_id,
      );
      res.status(201).json(assignment);
    } catch (error) {
      if (!(error instanceof BaseException)) {
        res.status(500).json({ message: "An error has occured" });
        return;
      }

      error.report(res);
    }
  };

  public removeChannelFromGroup = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    try {
      const id = parseInt(req.params.id as string, 10);
      if (isNaN(id)) {
        throw new ValidationException("Parameter ID is missing");
      }

      const channel_id = parseInt(req.params.channel_id as string, 10);
      if (isNaN(channel_id)) {
        throw new ValidationException("Channel ID is missing or invalid");
      }

      await this.groupService.removeChannelFromGroup(id, channel_id);

      res
        .status(200)
        .json({ message: "Channel removed from group successfully" });
    } catch (error) {
      if (!(error instanceof BaseException)) {
        res.status(500).json({ message: "An error has occured" });
        return;
      }

      error.report(res);
    }
  };

  public createGroup = async (
    req: Request<Record<string, string>, unknown, CreateGroupRequest>,
    res: Response,
  ): Promise<void> => {
    try {
      const { casino_id, game_id, strategy, strategy_alias } = req.body;
      const created = new Date();

      const group = await this.groupService.createGroup({
        casino_id,
        game_id,
        strategy,
        strategy_alias,
        created,
      });

      res.status(201).json(group);
    } catch (error) {
      if (!(error instanceof BaseException)) {
        res.status(500).json({ message: "An error has occured" });
        return;
      }

      error.report(res);
    }
  };

  public getGroups = async (_req: Request, res: Response): Promise<void> => {
    try {
      const groups = await this.groupService.getGroups();
      const groupsWithChannels = await Promise.all(
        groups.map(async (group) => {
          const channels = await this.groupService.getGroupChannels(group.id);
          return {
            ...group,
            channels,
          };
        }),
      );
      res.status(200).json(groupsWithChannels);
    } catch (error) {
      if (!(error instanceof BaseException)) {
        res.status(500).json({ message: "An error has occured" });
        return;
      }

      error.report(res);
    }
  };

  public getGroupById = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id as string, 10);
      if (isNaN(id)) {
        throw new ValidationException("Parameter ID is missing");
      }
      const group = await this.groupService.getGroupById(id);
      if (!group) {
        res.status(404).json({ message: "Channel group not found" });
        return;
      }

      const channels = await this.groupService.getGroupChannels(group.id);
      const groupWithChannels = {
        ...group,
        channels,
      };

      res.status(200).json(groupWithChannels);
    } catch (error) {
      if (!(error instanceof BaseException)) {
        res.status(500).json({ message: "An error has occured" });
        return;
      }

      error.report(res);
    }
  };

  public updateGroup = async (
    req: Request<Record<string, string>, unknown, Partial<UpdateGroupRequest>>,
    res: Response,
  ): Promise<void> => {
    try {
      const id = parseInt(req.params.id as string, 10);
      if (isNaN(id)) {
        throw new ValidationException("Parameter ID is missing");
      }

      const requestBody = req.body;
      const updatedGroup = await this.groupService.updateGroup(id, requestBody);

      res.status(200).json(updatedGroup);
    } catch (error) {
      if (!(error instanceof BaseException)) {
        res.status(500).json({ message: "An error has occured" });
        return;
      }

      error.report(res);
    }
  };

  public deleteGroup = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id as string, 10);
      if (isNaN(id)) {
        throw new ValidationException("Parameter ID is missing");
      }
      await this.groupService.deleteGroup(id);
      res.status(204).send();
    } catch (error) {
      if (!(error instanceof BaseException)) {
        res.status(500).json({ message: "An error has occured" });
        return;
      }

      error.report(res);
    }
  };
}
