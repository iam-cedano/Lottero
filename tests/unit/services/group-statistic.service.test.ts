/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi, beforeEach } from "vitest";
import GroupStatisticService from "@/services/group-statistic.service";
import GroupStatisticRepository from "@/repositories/group-statistic.repository";
import { GroupStatistic } from "@/entities/group-statistic.entity";

describe("GroupStatisticService", () => {
  let groupStatisticService: GroupStatisticService;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let groupStatisticRepositoryMock: any;

  beforeEach(() => {
    groupStatisticRepositoryMock = {
      create: vi.fn(),
      findAll: vi.fn(),
      findById: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
      findByGroupId: vi.fn(),
      findByGroupAndDate: vi.fn(),
    };
    groupStatisticService = new GroupStatisticService(groupStatisticRepositoryMock as GroupStatisticRepository);
  });

  it("should create a group statistic", async () => {
// eslint-disable-next-line @typescript-eslint/no-explicit-any
    const statData: Partial<GroupStatistic> = { group_id: 1 } as any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const expectedStat: GroupStatistic = { id: 1, group_id: 1 } as any;
    groupStatisticRepositoryMock.create.mockResolvedValue(expectedStat);

    const result = await groupStatisticService.createGroupStatistic(statData);

    expect(groupStatisticRepositoryMock.create).toHaveBeenCalledWith(statData);
    expect(result).toEqual(expectedStat);
  });

  it("should get all group statistics", async () => {
    const expectedStats: GroupStatistic[] = [{ id: 1, group_id: 1 } as any];
    groupStatisticRepositoryMock.findAll.mockResolvedValue(expectedStats);

    const result = await groupStatisticService.getGroupStatistics();

    expect(groupStatisticRepositoryMock.findAll).toHaveBeenCalled();
    expect(result).toEqual(expectedStats);
  });

  it("should get group statistic by id", async () => {
    const statId = 1;
    const expectedStat: GroupStatistic = { id: 1, group_id: 1 } as any;
    groupStatisticRepositoryMock.findById.mockResolvedValue(expectedStat);

    const result = await groupStatisticService.getGroupStatisticById(statId);

    expect(groupStatisticRepositoryMock.findById).toHaveBeenCalledWith(statId);
    expect(result).toEqual(expectedStat);
  });

  it("should update a group statistic", async () => {
    const statId = 1;
    const updateData: Partial<GroupStatistic> = { group_id: 2 } as any;
    const expectedStat: GroupStatistic = { id: 1, group_id: 2 } as any;
    groupStatisticRepositoryMock.update.mockResolvedValue(expectedStat);

    const result = await groupStatisticService.updateGroupStatistic(statId, updateData);

    expect(groupStatisticRepositoryMock.update).toHaveBeenCalledWith(statId, updateData);
    expect(result).toEqual(expectedStat);
  });

  it("should delete a group statistic", async () => {
    const statId = 1;
    groupStatisticRepositoryMock.delete.mockResolvedValue(true);

    const result = await groupStatisticService.deleteGroupStatistic(statId);

    expect(groupStatisticRepositoryMock.delete).toHaveBeenCalledWith(statId);
    expect(result).toBe(true);
  });

  it("should get group statistics by group id", async () => {
    const groupId = 1;
    const expectedStats: GroupStatistic[] = [{ id: 1, group_id: groupId } as any];
    groupStatisticRepositoryMock.findByGroupId.mockResolvedValue(expectedStats);

    const result = await groupStatisticService.getGroupStatisticByGroupId(groupId);

    expect(groupStatisticRepositoryMock.findByGroupId).toHaveBeenCalledWith(groupId);
    expect(result).toEqual(expectedStats);
  });

  it("should get group statistic by group and date", async () => {
    const groupId = 1;
    const date = new Date();
    const expectedStat: GroupStatistic = { id: 1, group_id: groupId, date } as any;
    groupStatisticRepositoryMock.findByGroupAndDate.mockResolvedValue(expectedStat);

    const result = await groupStatisticService.getGroupStatisticByGroupAndDate(groupId, date);

    expect(groupStatisticRepositoryMock.findByGroupAndDate).toHaveBeenCalledWith(groupId, date);
    expect(result).toEqual(expectedStat);
  });
});
