/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi, beforeEach } from "vitest";
import GroupService from "@/services/group.service";
import GroupDomain from "@/domains/group.domain";
import { ChannelsGroups } from "@/entities/channels-groups.entity";
import { Channel } from "@/entities/channel.entity";

describe("GroupService", () => {
  let groupService: GroupService;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let groupRepositoryMock: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let channelsGroupsRepositoryMock: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let channelRepositoryMock: any;

  beforeEach(() => {
    groupRepositoryMock = {
      create: vi.fn(),
      findAll: vi.fn(),
      findById: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    };
    channelsGroupsRepositoryMock = {
      create: vi.fn(),
      findByGroupIdAndChannelId: vi.fn(),
      deleteByGroupIdAndChannelId: vi.fn(),
    };
    channelRepositoryMock = {
      findByGroupId: vi.fn(),
    };
    groupService = new GroupService(
      groupRepositoryMock,
      channelsGroupsRepositoryMock,
      channelRepositoryMock,
    );
  });

  describe("sendMessage", () => {
    it("should return false if message is invalid", async () => {
      vi.spyOn(GroupDomain, "IsMessageValid").mockReturnValue(false);
      const result = await groupService.sendMessage("test-channel", {
        command: "test",
      });
      expect(result).toBe(false);
    });

    it("should return false if reporting instance is not found", async () => {
      vi.spyOn(GroupDomain, "IsMessageValid").mockReturnValue(true);
      vi.spyOn(GroupDomain, "GetReportingInstance").mockReturnValue(undefined);
      const result = await groupService.sendMessage("test-channel", {
        command: "test",
      });
      expect(result).toBe(false);
    });

    it("should send message and return true if everything is valid", async () => {
      const reportingInstanceMock = {
        sendMessage: vi.fn().mockResolvedValue(undefined),
      };
      vi.spyOn(GroupDomain, "IsMessageValid").mockReturnValue(true);
      vi.spyOn(GroupDomain, "GetReportingInstance").mockReturnValue(
        reportingInstanceMock as any,
      );

      const result = await groupService.sendMessage("test-channel", {
        command: "test",
      });

      expect(reportingInstanceMock.sendMessage).toHaveBeenCalledWith({
        command: "test",
      });
      expect(result).toBe(true);
    });
  });

  it("should add channel to group", async () => {
    const groupId = 1;
    const channelId = 2;
    const expectedAssignment = {
      group_id: groupId,
      channel_id: channelId,
    } as ChannelsGroups;
    channelsGroupsRepositoryMock.create.mockResolvedValue(expectedAssignment);

    const result = await groupService.addChannelToGroup(groupId, channelId);

    expect(channelsGroupsRepositoryMock.create).toHaveBeenCalledWith({
      group_id: groupId,
      channel_id: channelId,
    });
    expect(result).toEqual(expectedAssignment);
  });

  it("should check if channel is in group", async () => {
    const groupId = 1;
    const channelId = 2;
    channelsGroupsRepositoryMock.findByGroupIdAndChannelId.mockResolvedValue({
      id: 1,
    });

    const result = await groupService.isChannelInGroup(groupId, channelId);

    expect(result).toBe(true);
  });

  it("should remove channel from group", async () => {
    const groupId = 1;
    const channelId = 2;
    channelsGroupsRepositoryMock.deleteByGroupIdAndChannelId.mockResolvedValue(
      true,
    );

    const result = await groupService.removeChannelFromGroup(
      groupId,
      channelId,
    );

    expect(result).toBe(true);
  });

  it("should create a group", async () => {
    const groupData = { casino_id: 1 };
    const expectedGroup = { id: 1, ...groupData } as any;
    groupRepositoryMock.create.mockResolvedValue(expectedGroup);

    const result = await groupService.createGroup(groupData);

    expect(result).toEqual(expectedGroup);
  });

  it("should get group channels", async () => {
    const groupId = 1;
    const expectedChannels = [{ id: 1 }] as Channel[];
    channelRepositoryMock.findByGroupId.mockResolvedValue(expectedChannels);

    const result = await groupService.getGroupChannels(groupId);

    expect(result).toEqual(expectedChannels);
  });

  it("should update a group", async () => {
    const groupId = 1;
    const updateData = { casino_id: 2 };
    const expectedGroup = { id: 1, ...updateData } as any;
    groupRepositoryMock.update.mockResolvedValue(expectedGroup);

    const result = await groupService.updateGroup(groupId, updateData);

    expect(result).toEqual(expectedGroup);
  });

  it("should delete a group", async () => {
    const groupId = 1;
    groupRepositoryMock.delete.mockResolvedValue(true);

    const result = await groupService.deleteGroup(groupId);

    expect(result).toBe(true);
  });
});
