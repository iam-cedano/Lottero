import { Request, Response } from "express";
import { injectable } from "tsyringe";
import {
  MessageRequest,
  CreateChannelGroupRequest,
} from "@/models/channel-group.model";
import ChannelGroupService from "@/services/channel-group.service";
import CasinoService from "@/services/casino.service";
import GameService from "@/services/game.service";

@injectable()
export default class ChannelGroupController {
  constructor(
    private readonly channelGroupService: ChannelGroupService,
    private readonly casinoService: CasinoService,
    private readonly gameService: GameService,
  ) {}

  public sendMessage(req: Request<any, any, MessageRequest>, _res: Response) {
    const { channel_group, data } = req.body;
  }

  public createChannelGroup = async (
    req: Request<any, any, CreateChannelGroupRequest>,
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

      const game = await this.gameService.getGameById(game_id);
      if (!game) {
        res.status(404).json({ message: "Game not found" });
        return;
      }

      const channelGroup = await this.channelGroupService.createChannelGroup({
        casino_id,
        game_id,
        strategy,
        created,
      });

      res.status(201).json(channelGroup);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Failed to create channel group", error });
    }
  };

  public getChannelGroups = async (
    _req: Request,
    res: Response,
  ): Promise<void> => {
    try {
      const channelGroups = await this.channelGroupService.getChannelGroups();
      res.status(200).json(channelGroups);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Failed to fetch channel groups", error });
    }
  };

  public getChannelGroupById = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    try {
      const id = parseInt(req.params.id as string, 10);
      if (isNaN(id)) {
        res.status(400).json({ message: "Invalid channel group ID" });
        return;
      }
      const channelGroup =
        await this.channelGroupService.getChannelGroupById(id);
      if (!channelGroup) {
        res.status(404).json({ message: "Channel group not found" });
        return;
      }
      res.status(200).json(channelGroup);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch channel group", error });
    }
  };

  public updateChannelGroup = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
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

      const updatedChannelGroup =
        await this.channelGroupService.updateChannelGroup(id, {
          casino_id,
          game_id,
          strategy,
          created: created ? new Date(created) : undefined,
        });
      if (!updatedChannelGroup) {
        res.status(404).json({ message: "Channel group not found" });
        return;
      }
      res.status(200).json(updatedChannelGroup);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Failed to update channel group", error });
    }
  };

  public deleteChannelGroup = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    try {
      const id = parseInt(req.params.id as string, 10);
      if (isNaN(id)) {
        res.status(400).json({ message: "Invalid channel group ID" });
        return;
      }
      const success = await this.channelGroupService.deleteChannelGroup(id);
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
