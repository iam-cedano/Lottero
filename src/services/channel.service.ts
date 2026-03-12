import { inject, injectable } from "tsyringe";
import { Channel } from "@/entities/channel.entity";
import ChannelRepository from "@/repositories/channel.repository";

@injectable()
export default class ChannelService {
  constructor(
    @inject(ChannelRepository)
    private readonly channelRepository: ChannelRepository,
  ) {}

  async createChannel(data: Partial<Channel>): Promise<Channel> {
    return this.channelRepository.create(data);
  }

  async getChannels(): Promise<Channel[]> {
    return this.channelRepository.findAllWithGroup();
  }

  async getChannelById(id: number): Promise<Channel | null> {
    return this.channelRepository.findByIdWithGroup(id);
  }

  async getChannelsByGroupId(groupId: number): Promise<Channel[]> {
    return this.channelRepository.findByGroupId(groupId);
  }

  async getChannelByGroupIdAndLanguage(
    groupId: number,
    language: string,
  ): Promise<Channel | null> {
    return this.channelRepository.findByGroupIdAndLanguage(groupId, language);
  }

  async updateChannel(
    id: number,
    data: Partial<Channel>,
  ): Promise<Channel | null> {
    const updated = await this.channelRepository.update(id, data);
    if (!updated) return null;
    return this.getChannelById(id);
  }

  async deleteChannel(id: number): Promise<boolean> {
    return this.channelRepository.delete(id);
  }
}
