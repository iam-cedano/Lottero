/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi, beforeEach } from "vitest";
import ChannelMessageService from "@/services/channel-message.service";
import ChannelMessageRepository from "@/repositories/channel-message.repository";
import { ChannelMessage } from "@/entities/channel-message.entity";

describe("ChannelMessageService", () => {
  let channelMessageService: ChannelMessageService;
  let channelMessageRepositoryMock: any; // Keep any for mock objects to allow easy mocking of all methods

  beforeEach(() => {
    channelMessageRepositoryMock = {
      create: vi.fn(),
      findAll: vi.fn(),
      findById: vi.fn(),
      findByGroupId: vi.fn(),
      findByGroupMessageId: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    };
    channelMessageService = new ChannelMessageService(channelMessageRepositoryMock as ChannelMessageRepository);
  });

  it("should create a channel message", async () => {
// eslint-disable-next-line @typescript-eslint/no-explicit-any
    const messageData: Partial<ChannelMessage> = { content: "Test message" } as any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const expectedMessage: ChannelMessage = { id: 1, content: "Test message" } as any;
    channelMessageRepositoryMock.create.mockResolvedValue(expectedMessage);

    const result = await channelMessageService.createChannelMessage(messageData);

    expect(channelMessageRepositoryMock.create).toHaveBeenCalledWith(messageData);
    expect(result).toEqual(expectedMessage);
  });

  it("should get all channel messages", async () => {
    const expectedMessages: ChannelMessage[] = [{ id: 1, content: "Test message" } as unknown as any];
    channelMessageRepositoryMock.findAll.mockResolvedValue(expectedMessages);

    const result = await channelMessageService.getChannelMessages();

    expect(channelMessageRepositoryMock.findAll).toHaveBeenCalled();
    expect(result).toEqual(expectedMessages);
  });

  it("should get channel message by id", async () => {
    const messageId = 1;
    const expectedMessage: ChannelMessage = { id: 1, content: "Test message" } as unknown as any;
    channelMessageRepositoryMock.findById.mockResolvedValue(expectedMessage);

    const result = await channelMessageService.getChannelMessageById(messageId);

    expect(channelMessageRepositoryMock.findById).toHaveBeenCalledWith(messageId);
    expect(result).toEqual(expectedMessage);
  });

  it("should get channel messages by group id", async () => {
    const groupId = 1;
    const expectedMessages: ChannelMessage[] = [{ id: 1, group_id: groupId } as unknown as any];
    channelMessageRepositoryMock.findByGroupId.mockResolvedValue(expectedMessages);

    const result = await channelMessageService.getChannelMessagesByGroupId(groupId);

    expect(channelMessageRepositoryMock.findByGroupId).toHaveBeenCalledWith(groupId);
    expect(result).toEqual(expectedMessages);
  });

  it("should get channel messages by group message id", async () => {
    const groupMessageId = 100;
    const expectedMessages: ChannelMessage[] = [{ id: 1, group_message_id: groupMessageId } as unknown as any];
    channelMessageRepositoryMock.findByGroupMessageId.mockResolvedValue(expectedMessages);

    const result = await channelMessageService.getChannelMessagesByGroupMessageId(groupMessageId);

    expect(channelMessageRepositoryMock.findByGroupMessageId).toHaveBeenCalledWith(groupMessageId);
    expect(result).toEqual(expectedMessages);
  });

  it("should update a channel message", async () => {
    const messageId = 1;
    const updateData: Partial<ChannelMessage> = { content: "Updated content" } as unknown as any;
    const expectedMessage: ChannelMessage = { id: 1, content: "Updated content" } as unknown as any;
    channelMessageRepositoryMock.update.mockResolvedValue(expectedMessage);

    const result = await channelMessageService.updateChannelMessage(messageId, updateData);

    expect(channelMessageRepositoryMock.update).toHaveBeenCalledWith(messageId, updateData);
    expect(result).toEqual(expectedMessage);
  });

  it("should delete a channel message", async () => {
    const messageId = 1;
    channelMessageRepositoryMock.delete.mockResolvedValue(true);

    const result = await channelMessageService.deleteChannelMessage(messageId);

    expect(channelMessageRepositoryMock.delete).toHaveBeenCalledWith(messageId);
    expect(result).toBe(true);
  });
});
