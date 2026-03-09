import CasinoException from "@/exceptions/casino.exception";
import GameException from "@/exceptions/game.exception";
import ChannelBuilder from "@/services/channel.builder";
import { describe, expect, it } from "vitest";

describe("Channel Builder", () => {
  it("should throw an exception when the casino is not found", () => {
    expect(() => {
      const channelService = ChannelBuilder.getChannel("non_existent_casino");
    }).toThrow(CasinoException);
  });

  it("should throw an exception when the game is not found", () => {
    expect(() => {
      const channelService = ChannelBuilder.getChannel(
        "one_win",
        "non_existent_game",
      );
    }).toThrow(GameException);
  });
});
