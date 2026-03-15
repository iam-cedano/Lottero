/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi, beforeEach } from "vitest";
import ChannelService from "@/services/channel.service";
import ChannelRepository from "@/repositories/channel.repository";
import { Channel } from "@/entities/channel.entity";

describe("ChannelService", () => {
  let channelService: ChannelService;
  let channelRepositoryMock: any;

  beforeEach(() => {
    channelRepositoryMock = {
      create: vi.fn(),
      findAllWithGroup: vi.fn(),
      findByIdWithGroup: vi.fn(),
      findByGroupId: vi.fn(),
      findByGroupIdAndLanguage: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    };
    channelService = new ChannelService(channelRepositoryMock as ChannelRepository);
  });

  it("should create a channel", async () => {
// eslint-disable-next-line @typescript-eslint/no-explicit-any
    const channelData: Partial<Channel> = { name: "Test Channel" } as any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const expectedChannel: Channel = { id: 1, name: "Test Channel" } as any;
    channelRepositoryMock.create.mockResolvedValue(expectedChannel);

    const result = await channelService.createChannel(channelData);

    expect(channelRepositoryMock.create).toHaveBeenCalledWith(channelData);
    expect(result).toEqual(expectedChannel);
  });

  it("should get all channels", async () => {
    const expectedChannels: Channel[] = [{ id: 1, name: "Test Channel" } as unknown as any];
    channelRepositoryMock.findAllWithGroup.mockResolvedValue(expectedChannels);

    const result = await channelService.getChannels();

    expect(channelRepositoryMock.findAllWithGroup).toHaveBeenCalled();
    expect(result).toEqual(expectedChannels);
  });

  it("should get channel by id", async () => {
    const channelId = 1;
    const expectedChannel: Channel = { id: 1, name: "Test Channel" } as unknown as any;
    channelRepositoryMock.findByIdWithGroup.mockResolvedValue(expectedChannel);

    const result = await channelService.getChannelById(channelId);

    expect(channelRepositoryMock.findByIdWithGroup).toHaveBeenCalledWith(channelId);
    expect(result).toEqual(expectedChannel);
  });

  it("should get channels by group id", async () => {
    const groupId = 1;
    const expectedChannels: Channel[] = [{ id: 1, group_id: groupId } as unknown as any];
    channelRepositoryMock.findByGroupId.mockResolvedValue(expectedChannels);

    const result = await channelService.getChannelsByGroupId(groupId);

    expect(channelRepositoryMock.findByGroupId).toHaveBeenCalledWith(groupId);
    expect(result).toEqual(expectedChannels);
  });

  it("should get channel by group id and language", async () => {
    const groupId = 1;
    const language = "en";
    const expectedChannel: Channel = { id: 1, group_id: groupId, language } as unknown as any;
    channelRepositoryMock.findByGroupIdAndLanguage.mockResolvedValue(expectedChannel);

    const result = await channelService.getChannelByGroupIdAndLanguage(groupId, language);

    expect(channelRepositoryMock.findByGroupIdAndLanguage).toHaveBeenCalledWith(groupId, language);
    expect(result).toEqual(expectedChannel);
  });

  it("should update a channel and return fresh data", async () => {
    const channelId = 1;
    const updateData: Partial<Channel> = { name: "Updated Channel" } as unknown as any;
    const expectedChannel: Channel = { id: 1, name: "Updated Channel" } as unknown as any;

    channelRepositoryMock.update.mockResolvedValue({ id: 1 } as unknown as any);
    channelRepositoryMock.findByIdWithGroup.mockResolvedValue(expectedChannel);

    const result = await channelService.updateChannel(channelId, updateData);

    expect(channelRepositoryMock.update).toHaveBeenCalledWith(channelId, updateData);
    expect(channelRepositoryMock.findByIdWithGroup).toHaveBeenCalledWith(channelId);
    expect(result).toEqual(expectedChannel);
  });

  it("should return null if update fails", async () => {
    const channelId = 1;
    const updateData: Partial<Channel> = { name: "Updated Channel" } as unknown as any;

    channelRepositoryMock.update.mockResolvedValue(null);

    const result = await channelService.updateChannel(channelId, updateData);

    expect(channelRepositoryMock.update).toHaveBeenCalledWith(channelId, updateData);
    expect(result).toBeNull();
  });

  it("should delete a channel", async () => {
    const channelId = 1;
    channelRepositoryMock.delete.mockResolvedValue(true);

    const result = await channelService.deleteChannel(channelId);

    expect(channelRepositoryMock.delete).toHaveBeenCalledWith(channelId);
    expect(result).toBe(true);
  });
});
