import { Game } from "@/entities/game.entity";
import GameRepository from "@/repositories/game.repository";
import GameService from "@/services/game.service";
import { describe, it, beforeEach, expect, vi } from "vitest";

describe("GameService", () => {
  const gameRepositoryMock = {} as GameRepository;
  let gameService: GameService;

  beforeEach(() => {
    gameRepositoryMock.create = vi.fn();
    gameRepositoryMock.findByName = vi.fn();
    gameRepositoryMock.findById = vi.fn();
    gameRepositoryMock.update = vi.fn();
    gameRepositoryMock.delete = vi.fn();
    gameRepositoryMock.findAll = vi.fn();

    gameService = new GameService(gameRepositoryMock);
  });

  describe("getGameById", () => {
    it("should return a game", async () => {
      const game: Game = {
        id: 1,
        name: "driver",
        alias: "Driver",
        status: true,
      };

      vi.spyOn(gameRepositoryMock, "findById").mockResolvedValueOnce(game);

      const result = await gameService.getGameById(1);

      expect(result).toBe(game);
      expect(gameRepositoryMock.findById).toHaveBeenCalledWith(1);
    });

    it("should return null when game not found", async () => {
      vi.spyOn(gameRepositoryMock, "findById").mockResolvedValueOnce(null);

      const result = await gameService.getGameById(1);

      expect(result).toBeNull();
      expect(gameRepositoryMock.findById).toHaveBeenCalledWith(1);
    });
  });

  describe("getGames", () => {
    it("should return all games", async () => {
      const games: Game[] = [
        {
          id: 1,
          name: "driver",
          alias: "Driver",
          status: true,
        },
        {
          id: 2,
          name: "rise",
          alias: "Rise",
          status: true,
        },
      ];

      vi.spyOn(gameRepositoryMock, "findAll").mockResolvedValue(games);

      const result = await gameService.getGames();

      expect(result).toEqual(games);
      expect(gameRepositoryMock.findAll).toHaveBeenCalled();
    });
  });

  describe("createGame", () => {
    it("should create a new game", async () => {
      const game: Game = {
        id: 1,
        name: "driver",
        alias: "driver",
        status: true,
      };

      vi.spyOn(gameRepositoryMock, "create").mockResolvedValue(game);
      vi.spyOn(gameRepositoryMock, "findByName").mockResolvedValue(null);

      const result = await gameService.createGame(game);

      expect(result).toEqual(game);
      expect(gameRepositoryMock.create).toHaveBeenCalledWith(game);
    });

    it("should throw an error when game already exists", async () => {
      const game: Game = {
        id: 1,
        name: "driver",
        alias: "driver",
        status: true,
      };

      vi.spyOn(gameRepositoryMock, "findByName").mockResolvedValue(game);

      await expect(gameService.createGame(game)).rejects.toThrow(
        "Game name already registered",
      );
    });

    it("should throw an error when name is not valid", async () => {
      const game: Game = {
        id: 1,
        name: "Driver",
        alias: "driver",
        status: true,
      };

      await expect(gameService.createGame(game)).rejects.toThrow(
        "Name cannot contain numbers, capitalized and special characters (except for underscores)",
      );
    });
  });

  describe("updateGame", () => {
    it("should update a game", async () => {
      const existingGame: Game = {
        id: 1,
        name: "driver",
        alias: "Driver",
        status: true,
      };

      const updateData: Partial<Game> = {
        name: "racer",
        alias: "Racer",
      };

      const updatedGame: Game = {
        ...existingGame,
        ...updateData,
      };

      vi.spyOn(gameRepositoryMock, "findById").mockResolvedValue(existingGame);
      vi.spyOn(gameRepositoryMock, "update").mockResolvedValue(updatedGame);

      const result = await gameService.updateGame(1, updateData);

      expect(gameRepositoryMock.findById).toHaveBeenCalledWith(1);
      expect(gameRepositoryMock.update).toHaveBeenCalledWith(1, {
        ...existingGame,
        ...updateData,
      });
      expect(result).toEqual(updatedGame);
    });

    it("should throw an error when game is not found", async () => {
      const updateData: Partial<Game> = {
        name: "driver",
        alias: "Driver",
      };

      vi.spyOn(gameRepositoryMock, "findById").mockResolvedValue(null);

      await expect(gameService.updateGame(1, updateData)).rejects.toThrow(
        "Game not found",
      );
    });

    it("should throw an error when name is not valid", async () => {
      const existingGame: Game = {
        id: 1,
        name: "driver",
        alias: "Driver",
        status: true,
      };

      const updateData: Partial<Game> = {
        name: "Driver",
      };

      vi.spyOn(gameRepositoryMock, "findById").mockResolvedValue(existingGame);

      await expect(gameService.updateGame(1, updateData)).rejects.toThrow(
        "Name cannot contain numbers, capitalized and special characters (except for underscores)",
      );
    });
  });

  describe("deleteGame", () => {
    it("should delete a game", async () => {
      const existingGame: Game = {
        id: 1,
        name: "driver",
        alias: "Driver",
        status: true,
      };

      vi.spyOn(gameRepositoryMock, "findById").mockResolvedValue(existingGame);
      vi.spyOn(gameRepositoryMock, "delete").mockResolvedValue(true);

      const result = await gameService.deleteGame(1);

      expect(gameRepositoryMock.findById).toHaveBeenCalledWith(1);
      expect(gameRepositoryMock.delete).toHaveBeenCalledWith(1);
      expect(result).toBe(true);
    });

    it("should throw an error when game is not found", async () => {
      vi.spyOn(gameRepositoryMock, "findById").mockResolvedValue(null);

      await expect(gameService.deleteGame(1)).rejects.toThrow("Game not found");
    });
  });
});
