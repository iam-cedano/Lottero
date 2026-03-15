import "reflect-metadata";
import { describe, it, expect, beforeEach } from "vitest";
import OneWinBroadcasts from "@/services/broadcasts/onewin.broadcasts.namespace";
import CasinoRepository from "@/repositories/casino.repository";
import GroupRepository from "@/repositories/group.repository";
import { MessageData } from "@/models/group.model";

describe("OneWinBroadcasts.GlobalService", () => {
  let globalService: OneWinBroadcasts.GlobalService;
  let casinoRepoMock: unknown;
  let groupRepoMock: unknown;

  beforeEach(() => {
    casinoRepoMock = {};
    groupRepoMock = {};
    globalService = new OneWinBroadcasts.GlobalService(
      casinoRepoMock as CasinoRepository,
      groupRepoMock as GroupRepository
    );
  });

  it("should throw error on sendMessage", async () => {
    await expect(globalService.sendMessage({} as unknown as MessageData)).rejects.toThrow("Method not implemented.");
  });

  it("should throw error on editMessage", async () => {
    await expect(globalService.editMessage({} as unknown as MessageData)).rejects.toThrow("Method not implemented.");
  });

  it("should throw error on deleteMessage", async () => {
    await expect(globalService.deleteMessage({} as unknown as MessageData)).rejects.toThrow("Method not implemented.");
  });
});
