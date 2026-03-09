import { injectable } from "tsyringe";
import ChannelUrlRepository from "@/repositories/channel-url.repository";
import { ChannelUrl } from "@/entities/channel-url.entity";

@injectable()
export default class ChannelUrlService {
  constructor(private readonly channelUrlRepository: ChannelUrlRepository) {}

  async createChannelUrl(data: Partial<ChannelUrl>): Promise<ChannelUrl> {
    return this.channelUrlRepository.create(data);
  }

  async getChannelUrls(): Promise<ChannelUrl[]> {
    return this.channelUrlRepository.findAll();
  }

  async getChannelUrlById(id: number): Promise<ChannelUrl | null> {
    return this.channelUrlRepository.findById(id);
  }

  async getChannelUrlsByChannelId(channelId: number): Promise<ChannelUrl[]> {
    return this.channelUrlRepository.findByChannelId(channelId);
  }

  async getChannelUrlByChannelIdAndLanguage(
    channelId: number,
    language: string,
  ): Promise<ChannelUrl | null> {
    return this.channelUrlRepository.findByChannelIdAndLanguage(
      channelId,
      language,
    );
  }

  async updateChannelUrl(
    id: number,
    data: Partial<ChannelUrl>,
  ): Promise<ChannelUrl | null> {
    return this.channelUrlRepository.update(id, data);
  }

  async deleteChannelUrl(id: number): Promise<boolean> {
    return this.channelUrlRepository.delete(id);
  }
}
