import { inject, injectable } from "tsyringe";
import ChannelMessageRepository from "@/repositories/channel-message.repository";
import { ChannelMessage } from "@/entities/channel-message.entity";

@injectable()
export default class ChannelMessageService {
  constructor(
    @inject(ChannelMessageRepository)
    private readonly channelMessageRepository: ChannelMessageRepository,
  ) {}

  async createChannelMessage(
    data: Partial<ChannelMessage>,
  ): Promise<ChannelMessage> {
    return this.channelMessageRepository.create(data);
  }

  async getChannelMessages(): Promise<ChannelMessage[]> {
    return this.channelMessageRepository.findAll();
  }

  async getChannelMessageById(id: number): Promise<ChannelMessage | null> {
    return this.channelMessageRepository.findById(id);
  }

  async getChannelMessagesByGroupId(
    groupId: number,
  ): Promise<ChannelMessage[]> {
    return this.channelMessageRepository.findByGroupId(groupId);
  }

  async getChannelMessagesByGroupMessageId(
    groupMessageId: number,
  ): Promise<ChannelMessage[]> {
    return this.channelMessageRepository.findByGroupMessageId(groupMessageId);
  }

  async updateChannelMessage(
    id: number,
    data: Partial<ChannelMessage>,
  ): Promise<ChannelMessage | null> {
    return this.channelMessageRepository.update(id, data);
  }

  async deleteChannelMessage(id: number): Promise<boolean> {
    return this.channelMessageRepository.delete(id);
  }
}
