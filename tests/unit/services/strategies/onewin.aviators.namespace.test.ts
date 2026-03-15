import "reflect-metadata";
import { describe, it, expect, beforeEach, vi } from "vitest";
import OneWinAviators from "@/services/strategies/onewin.aviators.namespace";
import GroupRepository from "@/repositories/group.repository";
import { MessageData } from "@/models/group.model";

describe("OneWinAviators.SimpleStrategyService", () => {
  let strategyService: OneWinAviators.SimpleStrategyService;
  let groupRepoMock: unknown;

  beforeEach(() => {
    groupRepoMock = {
      findByCasinoAndGame: vi.fn().mockResolvedValue([]),
    };
    strategyService = new OneWinAviators.SimpleStrategyService(
      groupRepoMock as GroupRepository,
    );
  });

  it("should resolve on sendMessage", async () => {
    const groups = await strategyService.sendMessage({
      chatId: 1,
      messageId: 1,
      text: "test",
    });

    expect(groupRepoMock).toHaveBeenCalled();
  });

  it("should resolve on editMessage", async () => {
    await expect(
      strategyService.editMessage({} as unknown as MessageData),
    ).resolves.toBeUndefined();
  });

  it("should resolve on deleteMessage", async () => {
    await expect(
      strategyService.deleteMessage({} as unknown as MessageData),
    ).resolves.toBeUndefined();
  });
});
