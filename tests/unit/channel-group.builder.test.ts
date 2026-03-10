import CasinoException from "@/exceptions/casino.exception";
import GameException from "@/exceptions/game.exception";
import ChannelGroupBuilder from "@/services/channel-group.builder";
import { describe, expect, it } from "vitest";

describe("Channel Group Builder", () => {
  it("should throw an exception when the casino is not found", () => {
    expect(() => {
      const channelGroupService = ChannelGroupBuilder.getChannelGroup(
        "non_existent_casino",
      );
    }).toThrow(CasinoException);
  });

  it("should throw an exception when the game is not found", () => {
    expect(() => {
      const channelGroupService = ChannelGroupBuilder.getChannelGroup(
        "one_win",
        "non_existent_game",
      );
    }).toThrow(GameException);
  });
});
