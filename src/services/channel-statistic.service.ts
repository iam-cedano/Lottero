import { injectable } from "tsyringe";
import ChannelStatisticRepository from "@/repositories/channel-statistic.repository";
import { ChannelStatistic } from "@/entities/channel-statistic.entity";

@injectable()
export default class ChannelStatisticService {
  constructor(
    private readonly channelStatisticRepository: ChannelStatisticRepository,
  ) {}

  async createChannelStatistic(
    data: Partial<ChannelStatistic>,
  ): Promise<ChannelStatistic> {
    return this.channelStatisticRepository.create(data);
  }

  async getChannelStatistics(): Promise<ChannelStatistic[]> {
    return this.channelStatisticRepository.findAll();
  }

  async getChannelStatisticById(id: number): Promise<ChannelStatistic | null> {
    return this.channelStatisticRepository.findById(id);
  }

  async updateChannelStatistic(
    id: number,
    data: Partial<ChannelStatistic>,
  ): Promise<ChannelStatistic | null> {
    return this.channelStatisticRepository.update(id, data);
  }

  async deleteChannelStatistic(id: number): Promise<boolean> {
    return this.channelStatisticRepository.delete(id);
  }

  async getChannelStatisticByChannelId(
    channelId: number,
  ): Promise<ChannelStatistic[]> {
    return this.channelStatisticRepository.findByChannelId(channelId);
  }

  async getChannelStatisticByChannelAndDate(
    channelId: number,
    date: Date,
  ): Promise<ChannelStatistic | null> {
    return this.channelStatisticRepository.findByChannelAndDate(
      channelId,
      date,
    );
  }
}
