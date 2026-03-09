import { injectable } from "tsyringe";
import ChannelRepository from "@/repositories/channel.repository";
import { Channel } from "@/entities/channel.entity";

@injectable()
export default class ChannelService {
  constructor(private readonly channelRepository: ChannelRepository) {}

  async sendMessage(_channel: string, _data: object): Promise<void> {}

  async createChannel(data: Partial<Channel>): Promise<Channel> {
    return this.channelRepository.create(data);
  }

  async getChannels(): Promise<Channel[]> {
    return this.channelRepository.findAll();
  }

  async getChannelById(id: number): Promise<Channel | null> {
    return this.channelRepository.findById(id);
  }

  async updateChannel(
    id: number,
    data: Partial<Channel>,
  ): Promise<Channel | null> {
    return this.channelRepository.update(id, data);
  }

  async deleteChannel(id: number): Promise<boolean> {
    return this.channelRepository.delete(id);
  }
}
