import { injectable } from "tsyringe";
import ChannelMessageRepository from "@/repositories/channel-message.repository";
import { ChannelMessage } from "@/entities/channel-message.entity";

@injectable()
export default class ChannelMessageService {
  constructor(
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

  async getChannelMessagesByChannelId(
    channelId: number,
  ): Promise<ChannelMessage[]> {
    return this.channelMessageRepository.findByChannelId(channelId);
  }

  async getChannelMessagesByMessageId(
    messageId: number,
  ): Promise<ChannelMessage[]> {
    return this.channelMessageRepository.findByMessageId(messageId);
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
