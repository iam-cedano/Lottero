import "reflect-metadata";
import { describe, it, expect, beforeEach } from "vitest";
import OneWinGames from "@/services/games/onewin.games.namespace";
import CasinoRepository from "@/repositories/casino.repository";
import GroupRepository from "@/repositories/group.repository";
import { MessageData } from "@/models/group.model";

describe("OneWinGames.Aviator", () => {
  let aviatorService: OneWinGames.Aviator;
  let casinoRepoMock: unknown;
  let groupRepoMock: unknown;

  beforeEach(() => {
    casinoRepoMock = {};
    groupRepoMock = {};
    aviatorService = new OneWinGames.Aviator(
      casinoRepoMock as CasinoRepository,
      groupRepoMock as GroupRepository
    );
  });

  it("should throw error on sendMessage", async () => {
    await expect(aviatorService.sendMessage({} as unknown as MessageData)).rejects.toThrow("Method not implemented.");
  });

  it("should throw error on editMessage", async () => {
    await expect(aviatorService.editMessage({} as unknown as MessageData)).rejects.toThrow("Method not implemented.");
  });

  it("should throw error on deleteMessage", async () => {
    await expect(aviatorService.deleteMessage({} as unknown as MessageData)).rejects.toThrow("Method not implemented.");
  });
});
