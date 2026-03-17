import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import { CreateGameRequest } from "@/models/game.model";
import GameService from "@/services/game.service";
import ValidationException from "@/exceptions/validation.exception";
import BaseException from "@/exceptions/base.exception";

@injectable()
export default class GameController {
  constructor(@inject(GameService) private readonly gameService: GameService) {}

  public createGame = async (
    req: Request<Record<string, string>, unknown, CreateGameRequest>,
    res: Response,
  ): Promise<void> => {
    try {
      const { name, alias } = req.body;

      if (!name) {
        throw new ValidationException("Missing name");
      }

      const game = await this.gameService.createGame({
        name,
        alias,
      });

      res.status(201).json(game);
    } catch (error) {
      if (!(error instanceof BaseException)) {
        res.status(500).json({ message: "An error has occured" });
        return;
      }

      error.report(res);
    }
  };

  public getGames = async (_req: Request, res: Response): Promise<void> => {
    try {
      const games = await this.gameService.getGames();
      res.status(200).json(games);
    } catch (error) {
      if (!(error instanceof BaseException)) {
        res.status(500).json({ message: "An error has occured" });
        return;
      }

      error.report(res);
    }
  };

  public getGameById = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id as string, 10);
      if (isNaN(id)) {
        throw new ValidationException("Parameter ID is missing");
      }
      const game = await this.gameService.getGameById(id);
      if (!game) {
        res.status(404).json({ message: "Game not found" });
        return;
      }
      res.status(200).json(game);
    } catch (error) {
      if (!(error instanceof BaseException)) {
        res.status(500).json({ message: "An error has occured" });
        return;
      }

      error.report(res);
    }
  };

  public updateGame = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id as string, 10);
      if (isNaN(id)) {
        throw new ValidationException("Parameter ID is missing");
      }
      const reqBody = req.body;
      const updatedGame = await this.gameService.updateGame(id, reqBody);

      res.status(200).json(updatedGame);
    } catch (error) {
      if (!(error instanceof BaseException)) {
        res.status(500).json({ message: "An error has occured" });
        return;
      }

      error.report(res);
    }
  };

  public deleteGame = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id as string, 10);
      if (isNaN(id)) {
        throw new ValidationException("Parameter ID is missing");
      }
      await this.gameService.deleteGame(id);
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
