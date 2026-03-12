import CasinoException from "@/exceptions/casino.exception";
import GameException from "@/exceptions/game.exception";
import GroupBuilder from "@/builders/group.builder";
import { describe, expect, it } from "vitest";

describe("Group Builder", () => {
  it("should throw an exception when the casino is not found", () => {
    expect(() => {
      const channelGroupService = GroupBuilder.getGroup("non_existent_casino");
    }).toThrow(CasinoException);
  });

  it("should throw an exception when the game is not found", () => {
    expect(() => {
      const channelGroupService = GroupBuilder.getGroup(
        "one_win",
        "non_existent_game",
      );
    }).toThrow(GameException);
  });
});
