import { describe, expect, it, vi, beforeEach } from "vitest";
import GroupService from "@/services/group.service";
import GroupRepository from "@/repositories/group.repository";
import ChannelsGroupsRepository from "@/repositories/channels-groups.repository";
import ChannelRepository from "@/repositories/channel.repository";
import CasinoService from "@/services/casino.service";
import GameService from "@/services/game.service";
import ChannelService from "@/services/channel.service";
import { Group } from "@/entities/group.entity";
import { Channel } from "@/entities/channel.entity";
import { Casino } from "@/entities/casino.entity";
import { Game } from "@/entities/game.entity";
import { ChannelsGroups } from "@/entities/channels-groups.entity";
import NotFoundException from "@/exceptions/not-found.exception";
import ValidationException from "@/exceptions/validation.exception";

describe("GroupService", () => {
  const groupRepositoryMock = {} as unknown as GroupRepository;
  const channelsGroupsRepositoryMock =
    {} as unknown as ChannelsGroupsRepository;
  const channelRepositoryMock = {} as unknown as ChannelRepository;
  const casinoServiceMock = {} as unknown as CasinoService;
  const gameServiceMock = {} as unknown as GameService;
  const channelServiceMock = {} as unknown as ChannelService;

  let groupService: GroupService;

  beforeEach(() => {
    groupRepositoryMock.findById = vi.fn();
    groupRepositoryMock.findAll = vi.fn();
    groupRepositoryMock.create = vi.fn();
    groupRepositoryMock.update = vi.fn();
    groupRepositoryMock.delete = vi.fn();

    channelsGroupsRepositoryMock.create = vi.fn();
    channelsGroupsRepositoryMock.findByGroupIdAndChannelId = vi.fn();
    channelsGroupsRepositoryMock.deleteByGroupIdAndChannelId = vi.fn();

    channelRepositoryMock.findByGroupId = vi.fn();

    casinoServiceMock.getCasinoById = vi.fn();
    gameServiceMock.getGameById = vi.fn();
    channelServiceMock.getChannelById = vi.fn();

    groupService = new GroupService(
      groupRepositoryMock,
      channelsGroupsRepositoryMock,
      channelRepositoryMock,
      casinoServiceMock,
      gameServiceMock,
      channelServiceMock,
    );
  });

  describe("sendMessage", () => {
    it("should return a message for a valid message", async () => {
      const expected = {
        id: 1,
        group_id: 1,
        data: {},
        created: "10-01-2026",
      };

      const result = await groupService.sendMessage("casino-game-strategy", {
        command: "bet",
      });

      expect(result).toEqual(expected);
    });

    it("should throw an error when casino is empty", async () => {
      await expect(
        groupService.sendMessage("", { command: "bet" }),
      ).rejects.toThrow(ValidationException);
    });
  });

  describe("addChannelToGroup", () => {
    it("should add a channel to a group", async () => {
      const group: Group = {
        id: 1,
        casino_id: 1,
        game_id: 1,
        strategy: "test",
      } as Group;
      const channel: Channel = {
        id: 1,
        chat_id: "123",
        status: true,
      } as Channel;
      const assignment: ChannelsGroups = {
        group_id: 1,
        channel_id: 1,
      } as ChannelsGroups;

      vi.spyOn(groupRepositoryMock, "findById").mockResolvedValue(group);
      vi.spyOn(channelServiceMock, "getChannelById").mockResolvedValue(channel);
      vi.spyOn(
        channelsGroupsRepositoryMock,
        "findByGroupIdAndChannelId",
      ).mockResolvedValue(null);
      vi.spyOn(channelsGroupsRepositoryMock, "create").mockResolvedValue(
        assignment,
      );

      const result = await groupService.addChannelToGroup(1, 1);

      expect(result).toBe(assignment);
    });

    it("should throw NotFoundException if group does not exist", async () => {
      vi.spyOn(groupRepositoryMock, "findById").mockResolvedValue(null);
      await expect(groupService.addChannelToGroup(1, 1)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe("removeChannelFromGroup", () => {
    it("should remove a channel from a group", async () => {
      vi.spyOn(groupRepositoryMock, "findById").mockResolvedValue({
        id: 1,
      } as Group);
      vi.spyOn(channelServiceMock, "getChannelById").mockResolvedValue({
        id: 1,
      } as Channel);
      vi.spyOn(
        channelsGroupsRepositoryMock,
        "deleteByGroupIdAndChannelId",
      ).mockResolvedValue(true);

      const result = await groupService.removeChannelFromGroup(1, 1);

      expect(result).toBe(true);
    });

    it("should throw NotFoundException if assignment not found", async () => {
      vi.spyOn(groupRepositoryMock, "findById").mockResolvedValue({
        id: 1,
      } as Group);
      vi.spyOn(channelServiceMock, "getChannelById").mockResolvedValue({
        id: 1,
      } as Channel);
      vi.spyOn(
        channelsGroupsRepositoryMock,
        "deleteByGroupIdAndChannelId",
      ).mockResolvedValue(false);

      await expect(groupService.removeChannelFromGroup(1, 1)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe("createGroup", () => {
    it("should create a group", async () => {
      const groupData = {
        casino_id: 1,
        game_id: 1,
        strategy: "valid_strategy",
      };
      const casino = { id: 1, status: true } as Casino;
      const game = { id: 1, status: true } as Game;

      vi.spyOn(casinoServiceMock, "getCasinoById").mockResolvedValue(casino);
      vi.spyOn(gameServiceMock, "getGameById").mockResolvedValue(game);
      vi.spyOn(groupRepositoryMock, "create").mockResolvedValue({
        id: 1,
        ...groupData,
      } as Group);

      const result = await groupService.createGroup(groupData);

      expect(result.id).toBe(1);
    });

    it("should throw ValidationException if strategy is invalid", async () => {
      const groupData = {
        casino_id: 1,
        game_id: 1,
        strategy: "INVALID STRATEGY",
      };
      await expect(groupService.createGroup(groupData)).rejects.toThrow(
        ValidationException,
      );
    });
  });

  describe("getGroupById", () => {
    it("should return a group by id", async () => {
      const group = { id: 1 } as Group;
      vi.spyOn(groupRepositoryMock, "findById").mockResolvedValue(group);
      const result = await groupService.getGroupById(1);
      expect(result).toBe(group);
    });
  });

  describe("updateGroup", () => {
    it("should update a group", async () => {
      const group = { id: 1 } as Group;
      vi.spyOn(groupRepositoryMock, "findById").mockResolvedValue(group);
      vi.spyOn(groupRepositoryMock, "update").mockResolvedValue({
        ...group,
        strategy: "updated",
      } as Group);

      const result = await groupService.updateGroup(1, { strategy: "updated" });

      expect(result?.strategy).toBe("updated");
    });
  });

  describe("deleteGroup", () => {
    it("should delete a group", async () => {
      vi.spyOn(groupRepositoryMock, "findById").mockResolvedValue({
        id: 1,
      } as Group);
      vi.spyOn(groupRepositoryMock, "delete").mockResolvedValue(true);

      const result = await groupService.deleteGroup(1);

      expect(result).toBe(true);
    });

    it("should throw NotFoundException if group not found", async () => {
      vi.spyOn(groupRepositoryMock, "findById").mockResolvedValue(null);
      await expect(groupService.deleteGroup(1)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
