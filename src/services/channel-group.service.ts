import { injectable } from "tsyringe";
import ChannelGroupRepository from "@/repositories/channel-group.repository";
import { ChannelGroup } from "@/entities/channel-group.entity";

@injectable()
export default class ChannelGroupService {
  constructor(
    private readonly channelGroupRepository: ChannelGroupRepository,
  ) {}

  async sendMessage(_channelGroup: string, _data: object): Promise<void> {}

  async createChannelGroup(data: Partial<ChannelGroup>): Promise<ChannelGroup> {
    return this.channelGroupRepository.create(data);
  }

  async getChannelGroups(): Promise<ChannelGroup[]> {
    return this.channelGroupRepository.findAll();
  }

  async getChannelGroupById(id: number): Promise<ChannelGroup | null> {
    return this.channelGroupRepository.findById(id);
  }

  async updateChannelGroup(
    id: number,
    data: Partial<ChannelGroup>,
  ): Promise<ChannelGroup | null> {
    return this.channelGroupRepository.update(id, data);
  }

  async deleteChannelGroup(id: number): Promise<boolean> {
    return this.channelGroupRepository.delete(id);
  }
}
