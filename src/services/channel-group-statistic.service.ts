import { injectable } from "tsyringe";
import ChannelGroupStatisticRepository from "@/repositories/channel-group-statistic.repository";
import { ChannelGroupStatistic } from "@/entities/channel-group-statistic.entity";

@injectable()
export default class ChannelGroupStatisticService {
  constructor(
    private readonly channelGroupStatisticRepository: ChannelGroupStatisticRepository,
  ) {}

  async createChannelGroupStatistic(
    data: Partial<ChannelGroupStatistic>,
  ): Promise<ChannelGroupStatistic> {
    return this.channelGroupStatisticRepository.create(data);
  }

  async getChannelGroupStatistics(): Promise<ChannelGroupStatistic[]> {
    return this.channelGroupStatisticRepository.findAll();
  }

  async getChannelGroupStatisticById(
    id: number,
  ): Promise<ChannelGroupStatistic | null> {
    return this.channelGroupStatisticRepository.findById(id);
  }

  async updateChannelGroupStatistic(
    id: number,
    data: Partial<ChannelGroupStatistic>,
  ): Promise<ChannelGroupStatistic | null> {
    return this.channelGroupStatisticRepository.update(id, data);
  }

  async deleteChannelGroupStatistic(id: number): Promise<boolean> {
    return this.channelGroupStatisticRepository.delete(id);
  }

  async getChannelGroupStatisticByChannelGroupId(
    channelGroupId: number,
  ): Promise<ChannelGroupStatistic[]> {
    return this.channelGroupStatisticRepository.findByChannelGroupId(
      channelGroupId,
    );
  }

  async getChannelGroupStatisticByChannelGroupAndDate(
    channelGroupId: number,
    date: Date,
  ): Promise<ChannelGroupStatistic | null> {
    return this.channelGroupStatisticRepository.findByChannelGroupAndDate(
      channelGroupId,
      date,
    );
  }
}
