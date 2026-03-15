/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi, beforeEach } from "vitest";
import GroupMessageService from "@/services/group-message.service";
import GroupMessageRepository from "@/repositories/group-message.repository";
import { GroupMessage } from "@/entities/group-message.entity";

describe("GroupMessageService", () => {
  let groupMessageService: GroupMessageService;
  let groupMessageRepositoryMock: any; // Keep any for mock objects to allow easy mocking of all methods

  beforeEach(() => {
    groupMessageRepositoryMock = {
      create: vi.fn(),
      findAll: vi.fn(),
      findById: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    };
    groupMessageService = new GroupMessageService(groupMessageRepositoryMock as GroupMessageRepository);
  });

  it("should create a group message", async () => {
// eslint-disable-next-line @typescript-eslint/no-explicit-any
    const messageData: Partial<GroupMessage> = { action: "Test Action" } as any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const expectedMessage: GroupMessage = { id: 1, action: "Test Action" } as any;
    groupMessageRepositoryMock.create.mockResolvedValue(expectedMessage);

    const result = await groupMessageService.createGroupMessage(messageData);

    expect(groupMessageRepositoryMock.create).toHaveBeenCalledWith(messageData);
    expect(result).toEqual(expectedMessage);
  });

  it("should get all group messages", async () => {
    const expectedMessages: GroupMessage[] = [{ id: 1, action: "Test Action" } as unknown as any];
    groupMessageRepositoryMock.findAll.mockResolvedValue(expectedMessages);

    const result = await groupMessageService.getGroupMessages();

    expect(groupMessageRepositoryMock.findAll).toHaveBeenCalled();
    expect(result).toEqual(expectedMessages);
  });

  it("should get message by id", async () => {
    const messageId = 1;
    const expectedMessage: GroupMessage = { id: 1, action: "Test Action" } as unknown as any;
    groupMessageRepositoryMock.findById.mockResolvedValue(expectedMessage);

    const result = await groupMessageService.getMessageById(messageId);

    expect(groupMessageRepositoryMock.findById).toHaveBeenCalledWith(messageId);
    expect(result).toEqual(expectedMessage);
  });

  it("should update a group message", async () => {
    const messageId = 1;
    const updateData: Partial<GroupMessage> = { action: "Updated Action" } as unknown as any;
    const expectedMessage: GroupMessage = { id: 1, action: "Updated Action" } as unknown as any;
    groupMessageRepositoryMock.update.mockResolvedValue(expectedMessage);

    const result = await groupMessageService.updateGroupMessage(messageId, updateData);

    expect(groupMessageRepositoryMock.update).toHaveBeenCalledWith(messageId, updateData);
    expect(result).toEqual(expectedMessage);
  });

  it("should delete a group message", async () => {
    const messageId = 1;
    groupMessageRepositoryMock.delete.mockResolvedValue(true);

    const result = await groupMessageService.deleteGroupMessage(messageId);

    expect(groupMessageRepositoryMock.delete).toHaveBeenCalledWith(messageId);
    expect(result).toBe(true);
  });
});
