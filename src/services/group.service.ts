import { inject, injectable } from "tsyringe";
import GroupRepository from "@/repositories/group.repository";
import { Group } from "@/entities/group.entity";
import ChannelsGroupsRepository from "@/repositories/channels-groups.repository";
import { ChannelsGroups } from "@/entities/channels-groups.entity";
import ChannelRepository from "@/repositories/channel.repository";
import { Channel } from "@/entities/channel.entity";
import GroupDomain from "@/domains/group.domain";
import { MessageData } from "@/models/group.model";


@injectable()
export default class GroupService {
  constructor(
    @inject(GroupRepository) private readonly groupRepository: GroupRepository,
    @inject(ChannelsGroupsRepository)
    private readonly channelsGroupsRepository: ChannelsGroupsRepository,
    @inject(ChannelRepository)
    private readonly channelRepository: ChannelRepository,
  ) {}

  async sendMessage(channel: string, data: MessageData): Promise<boolean> {
    if (!GroupDomain.IsMessageValid({ channel, data })) {
      return false;
    }

    const reportingInstance = GroupDomain.GetReportingInstance(channel);

    if (!reportingInstance) {
      return false;
    }

    await reportingInstance.sendMessage(data);

    return true;
  }

  async addChannelToGroup(
    groupId: number,
    channelId: number,
  ): Promise<ChannelsGroups> {
    return this.channelsGroupsRepository.create({
      group_id: groupId,
      channel_id: channelId,
    });
  }

  async isChannelInGroup(groupId: number, channelId: number): Promise<boolean> {
    const assignment =
      await this.channelsGroupsRepository.findByGroupIdAndChannelId(
        groupId,
        channelId,
      );
    return assignment !== null;
  }

  async removeChannelFromGroup(
    groupId: number,
    channelId: number,
  ): Promise<boolean> {
    return this.channelsGroupsRepository.deleteByGroupIdAndChannelId(
      groupId,
      channelId,
    );
  }

  async createGroup(data: Partial<Group>): Promise<Group> {
    return this.groupRepository.create(data);
  }

  async getGroups(): Promise<Group[]> {
    return this.groupRepository.findAll();
  }

  async getGroupChannels(groupId: number): Promise<Channel[]> {
    return this.channelRepository.findByGroupId(groupId);
  }

  async getGroupById(id: number): Promise<Group | null> {
    return this.groupRepository.findById(id);
  }

  async updateGroup(id: number, data: Partial<Group>): Promise<Group | null> {
    return this.groupRepository.update(id, data);
  }

  async deleteGroup(id: number): Promise<boolean> {
    return this.groupRepository.delete(id);
  }
}
