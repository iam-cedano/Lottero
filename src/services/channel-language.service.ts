import { injectable } from "tsyringe";
import ChannelLanguageRepository from "@/repositories/channel-language.repository";
import { ChannelLanguage } from "@/entities/channel-language.entity";

@injectable()
export default class ChannelLanguageService {
  constructor(
    private readonly channelLanguageRepository: ChannelLanguageRepository,
  ) {}

  async createChannelLanguage(
    data: Partial<ChannelLanguage>,
  ): Promise<ChannelLanguage> {
    return this.channelLanguageRepository.create(data);
  }

  async getChannelLanguages(): Promise<ChannelLanguage[]> {
    return this.channelLanguageRepository.findAll();
  }

  async getChannelLanguageById(id: number): Promise<ChannelLanguage | null> {
    return this.channelLanguageRepository.findById(id);
  }

  async getChannelLanguagesByChannelId(
    channelId: number,
  ): Promise<ChannelLanguage[]> {
    return this.channelLanguageRepository.findByChannelId(channelId);
  }

  async getChannelLanguageByChannelIdAndLanguage(
    channelId: number,
    language: string,
  ): Promise<ChannelLanguage | null> {
    return this.channelLanguageRepository.findByChannelIdAndLanguage(
      channelId,
      language,
    );
  }

  async updateChannelLanguage(
    id: number,
    data: Partial<ChannelLanguage>,
  ): Promise<ChannelLanguage | null> {
    return this.channelLanguageRepository.update(id, data);
  }

  async deleteChannelLanguage(id: number): Promise<boolean> {
    return this.channelLanguageRepository.delete(id);
  }
}
