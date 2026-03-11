import { injectable } from "tsyringe";
import GroupStatisticRepository from "@/repositories/group-statistic.repository";
import { GroupStatistic } from "@/entities/group-statistic.entity";

@injectable()
export default class GroupStatisticService {
  constructor(
    private readonly groupStatisticRepository: GroupStatisticRepository,
  ) {}

  async createGroupStatistic(
    data: Partial<GroupStatistic>,
  ): Promise<GroupStatistic> {
    return this.groupStatisticRepository.create(data);
  }

  async getGroupStatistics(): Promise<GroupStatistic[]> {
    return this.groupStatisticRepository.findAll();
  }

  async getGroupStatisticById(
    id: number,
  ): Promise<GroupStatistic | null> {
    return this.groupStatisticRepository.findById(id);
  }

  async updateGroupStatistic(
    id: number,
    data: Partial<GroupStatistic>,
  ): Promise<GroupStatistic | null> {
    return this.groupStatisticRepository.update(id, data);
  }

  async deleteGroupStatistic(id: number): Promise<boolean> {
    return this.groupStatisticRepository.delete(id);
  }

  async getGroupStatisticByGroupId(
    groupId: number,
  ): Promise<GroupStatistic[]> {
    return this.groupStatisticRepository.findByGroupId(
      groupId,
    );
  }

  async getGroupStatisticByGroupAndDate(
    groupId: number,
    date: Date,
  ): Promise<GroupStatistic | null> {
    return this.groupStatisticRepository.findByGroupAndDate(
      groupId,
      date,
    );
  }
}
