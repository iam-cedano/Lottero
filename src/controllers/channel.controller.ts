import { Request, Response } from "express";
import { injectable } from "tsyringe";
import { MessageRequest, CreateChannelRequest } from "@/models/channel.model";
import ChannelService from "@/services/channel.service";
import CasinoService from "@/services/casino.service";
import GameService from "@/services/game.service";

@injectable()
export default class ChannelController {
  constructor(
    private readonly channelService: ChannelService,
    private readonly casinoService: CasinoService,
    private readonly gameService: GameService,
  ) {}

  public sendMessage(req: Request<any, any, MessageRequest>, _res: Response) {
    const { channel, data } = req.body;
  }

  public createChannel = async (
    req: Request<any, any, CreateChannelRequest>,
    res: Response,
  ): Promise<void> => {
    try {
      const { casino_id, game_id } = req.body;

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

      const channel = await this.channelService.createChannel({
        casino_id,
        game_id,
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

  public updateChannel = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id as string, 10);
      if (isNaN(id)) {
        res.status(400).json({ message: "Invalid channel ID" });
        return;
      }
      const { casino_id, game_id } = req.body;

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

      const updatedChannel = await this.channelService.updateChannel(id, {
        casino_id,
        game_id,
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
