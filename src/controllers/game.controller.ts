import { Request, Response } from "express";
import { injectable } from "tsyringe";
import { CreateGameRequest } from "@/models/game.model";
import GameService from "@/services/game.service";
import ValidationException from "@/exceptions/validation.exception";

@injectable()
export default class GameController {
  constructor(private readonly gameService: GameService) {}

  public createGame = async (
    req: Request<any, any, CreateGameRequest>,
    res: Response,
  ): Promise<void> => {
    try {
      const { name, alias } = req.body;

      if (!name) {
        res.status(400).json({ message: "Missing name" });
        return;
      }

      if (!/^[\p{L}\s]+$/u.test(name)) {
        throw new ValidationException(
          "Name cannot contain numbers or special characters",
        );
      }

      if (/\p{Lu}/u.test(name)) {
        throw new ValidationException(
          "Name cannot contain capitalized characters",
        );
      }

      const game = await this.gameService.createGame({
        name,
        alias,
      });

      res.status(201).json(game);
    } catch (error) {
      if (error instanceof ValidationException) {
        res.status(400).json({ message: error.message });
        return;
      }
      res.status(500).json({ message: "Failed to create game", error });
    }
  };

  public getGames = async (_req: Request, res: Response): Promise<void> => {
    try {
      const games = await this.gameService.getGames();
      res.status(200).json(games);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch games", error });
    }
  };

  public getGameById = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id as string, 10);
      if (isNaN(id)) {
        res.status(400).json({ message: "Invalid game ID" });
        return;
      }
      const game = await this.gameService.getGameById(id);
      if (!game) {
        res.status(404).json({ message: "Game not found" });
        return;
      }
      res.status(200).json(game);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch game", error });
    }
  };

  public updateGame = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id as string, 10);
      if (isNaN(id)) {
        res.status(400).json({ message: "Invalid game ID" });
        return;
      }
      const { name, alias } = req.body;

      if (!name) {
        res.status(400).json({ message: "Missing name" });
        return;
      }

      if (!/^[\p{L}\s]+$/u.test(name)) {
        throw new ValidationException(
          "Name cannot contain numbers or special characters",
        );
      }

      if (/\p{Lu}/u.test(name)) {
        throw new ValidationException(
          "Name cannot contain capitalized characters",
        );
      }

      const updatedGame = await this.gameService.updateGame(id, {
        name,
        alias,
      });
      if (!updatedGame) {
        res.status(404).json({ message: "Game not found" });
        return;
      }
      res.status(200).json(updatedGame);
    } catch (error) {
      if (error instanceof ValidationException) {
        res.status(400).json({ message: error.message });
        return;
      }
      res.status(500).json({ message: "Failed to update game", error });
    }
  };

  public deleteGame = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id as string, 10);
      if (isNaN(id)) {
        res.status(400).json({ message: "Invalid game ID" });
        return;
      }
      const success = await this.gameService.deleteGame(id);
      if (!success) {
        res.status(404).json({ message: "Game not found" });
        return;
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete game", error });
    }
  };
}
