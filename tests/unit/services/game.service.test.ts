/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi, beforeEach } from "vitest";
import GameService from "@/services/game.service";
import GameRepository from "@/repositories/game.repository";
import { Game } from "@/entities/game.entity";

describe("GameService", () => {
  let gameService: GameService;
  let gameRepositoryMock: any;

  beforeEach(() => {
    gameRepositoryMock = {
      create: vi.fn(),
      findAll: vi.fn(),
      findById: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    };
    gameService = new GameService(gameRepositoryMock as GameRepository);
  });

  it("should create a game", async () => {
// eslint-disable-next-line @typescript-eslint/no-explicit-any
    const gameData: Partial<Game> = { name: "Test Game" } as any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const expectedGame: Game = { id: 1, name: "Test Game" } as any;
    gameRepositoryMock.create.mockResolvedValue(expectedGame);

    const result = await gameService.createGame(gameData);

    expect(gameRepositoryMock.create).toHaveBeenCalledWith(gameData);
    expect(result).toEqual(expectedGame);
  });

  it("should get all games", async () => {
    const expectedGames: Game[] = [{ id: 1, name: "Test Game" } as unknown as any];
    gameRepositoryMock.findAll.mockResolvedValue(expectedGames);

    const result = await gameService.getGames();

    expect(gameRepositoryMock.findAll).toHaveBeenCalled();
    expect(result).toEqual(expectedGames);
  });

  it("should get game by id", async () => {
    const gameId = 1;
    const expectedGame: Game = { id: 1, name: "Test Game" } as unknown as any;
    gameRepositoryMock.findById.mockResolvedValue(expectedGame);

    const result = await gameService.getGameById(gameId);

    expect(gameRepositoryMock.findById).toHaveBeenCalledWith(gameId);
    expect(result).toEqual(expectedGame);
  });

  it("should update a game", async () => {
    const gameId = 1;
    const updateData: Partial<Game> = { name: "Updated Game" } as unknown as any;
    const expectedGame: Game = { id: 1, name: "Updated Game" } as unknown as any;
    gameRepositoryMock.update.mockResolvedValue(expectedGame);

    const result = await gameService.updateGame(gameId, updateData);

    expect(gameRepositoryMock.update).toHaveBeenCalledWith(gameId, updateData);
    expect(result).toEqual(expectedGame);
  });

  it("should delete a game", async () => {
    const gameId = 1;
    gameRepositoryMock.delete.mockResolvedValue(true);

    const result = await gameService.deleteGame(gameId);

    expect(gameRepositoryMock.delete).toHaveBeenCalledWith(gameId);
    expect(result).toBe(true);
  });
});
