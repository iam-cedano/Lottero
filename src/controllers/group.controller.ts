import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import { MessageRequest, CreateGroupRequest } from "@/models/group.model";
import GroupService from "@/services/group.service";
import CasinoService from "@/services/casino.service";
import GameService from "@/services/game.service";
import ChannelService from "@/services/channel.service";

@injectable()
export default class GroupController {
  constructor(
    @inject(GroupService) private readonly groupService: GroupService,
    @inject(CasinoService) private readonly casinoService: CasinoService,
    @inject(GameService) private readonly gameService: GameService,
    @inject(ChannelService) private readonly channelService: ChannelService,
  ) {}

  public sendMessage = async (
    req: Request<Record<string, string>, unknown, MessageRequest>,
    res: Response,
  ) => {
    try {
      const { channel, data } = req.body;

      if (channel == undefined) {
        res.status(400).json({ message: "Channel is required" });

        return;
      }

      if (data == undefined) {
        res.status(400).json({ message: "Data is required" });

        return;
      }

      const success = await this.groupService.sendMessage(channel, data);

      if (!success) {
        res
          .status(400)
          .json({ message: "Failed to send message: Invalid channel or data" });

        return;
      }

      res.status(201).send({ message: "Message sent successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to send message", error });
    }
  };

  public addChannelToGroup = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    try {
      const id = parseInt(req.params.id as string, 10);
      if (isNaN(id)) {
        res.status(400).json({ message: "Invalid group ID" });
        return;
      }

      const channel_id = parseInt(req.params.channel_id as string, 10);
      if (isNaN(channel_id)) {
        res.status(400).json({ message: "Invalid channel ID" });
        return;
      }

      const existingGroup = await this.groupService.getGroupById(id);
      if (!existingGroup) {
        res.status(404).json({ message: "Group not found" });
        return;
      }

      const existingChannel =
        await this.channelService.getChannelById(channel_id);
      if (!existingChannel) {
        res.status(404).json({ message: "Channel not found" });
        return;
      }

      const isAlreadyInGroup = await this.groupService.isChannelInGroup(
        id,
        channel_id,
      );
      if (isAlreadyInGroup) {
        res.status(400).json({ message: "Channel is already in the group" });
        return;
      }

      const assignment = await this.groupService.addChannelToGroup(
        id,
        channel_id,
      );
      res.status(201).json(assignment);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Failed to add channel to group", error });
    }
  };

  public removeChannelFromGroup = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    try {
      const id = parseInt(req.params.id as string, 10);
      if (isNaN(id)) {
        res.status(400).json({ message: "Invalid group ID" });
        return;
      }

      const channel_id = parseInt(req.params.channel_id as string, 10);
      if (isNaN(channel_id)) {
        res.status(400).json({ message: "Invalid channel ID" });
        return;
      }

      const existingGroup = await this.groupService.getGroupById(id);
      if (!existingGroup) {
        res.status(404).json({ message: "Group not found" });
        return;
      }

      const existingChannel =
        await this.channelService.getChannelById(channel_id);
      if (!existingChannel) {
        res.status(404).json({ message: "Channel not found" });
        return;
      }

      const success = await this.groupService.removeChannelFromGroup(
        id,
        channel_id,
      );
      if (!success) {
        res.status(404).json({ message: "Channel not found in this group" });
        return;
      }

      res
        .status(200)
        .json({ message: "Channel removed from group successfully" });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Failed to remove channel from group", error });
    }
  };

  public createGroup = async (
    req: Request<Record<string, string>, unknown, CreateGroupRequest>,
    res: Response,
  ): Promise<void> => {
    try {
      const { casino_id, game_id, strategy } = req.body;
      const created = new Date();

      if (!casino_id || !game_id || !strategy) {
        res
          .status(400)
          .json({ message: "Missing casino_id, game_id or strategy" });
        return;
      }

      const casino = await this.casinoService.getCasinoById(casino_id);
      if (!casino) {
        res.status(404).json({ message: "Casino not found" });
        return;
      }

      if (!casino.status) {
        res.status(400).json({ message: "Casino is not active" });
        return;
      }

      const game = await this.gameService.getGameById(game_id);
      if (!game) {
        res.status(404).json({ message: "Game not found" });
        return;
      }

      if (!game.status) {
        res.status(400).json({ message: "Game is not active" });
        return;
      }

      const group = await this.groupService.createGroup({
        casino_id,
        game_id,
        strategy,
        created,
      });

      res.status(201).json(group);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Failed to create channel group", error });
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
      res
        .status(500)
        .json({ message: "Failed to fetch channel groups", error });
    }
  };

  public getGroupById = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id as string, 10);
      if (isNaN(id)) {
        res.status(400).json({ message: "Invalid channel group ID" });
        return;
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
      res.status(500).json({ message: "Failed to fetch channel group", error });
    }
  };

  public updateGroup = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id as string, 10);
      if (isNaN(id)) {
        res.status(400).json({ message: "Invalid channel group ID" });
        return;
      }
      const { casino_id, game_id, strategy, created } = req.body;

      if (!casino_id || !game_id) {
        res.status(400).json({ message: "Missing casino_id or game_id" });
        return;
      }

      const casino = await this.casinoService.getCasinoById(casino_id);
      if (!casino) {
        res.status(404).json({ message: "Casino not found" });
        return;
      }

      const game = await this.gameService.getGameById(game_id);
      if (!game) {
        res.status(404).json({ message: "Game not found" });
        return;
      }

      const updatedGroup = await this.groupService.updateGroup(id, {
        casino_id,
        game_id,
        strategy,
        created: created ? new Date(created) : undefined,
      });
      if (!updatedGroup) {
        res.status(404).json({ message: "Channel group not found" });
        return;
      }
      res.status(200).json(updatedGroup);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Failed to update channel group", error });
    }
  };

  public deleteGroup = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id as string, 10);
      if (isNaN(id)) {
        res.status(400).json({ message: "Invalid channel group ID" });
        return;
      }
      const success = await this.groupService.deleteGroup(id);
      if (!success) {
        res.status(404).json({ message: "Channel group not found" });
        return;
      }
      res.status(204).send();
    } catch (error) {
      res
        .status(500)
        .json({ message: "Failed to delete channel group", error });
    }
  };
}
