import { MessageData } from "@/models/group.model";
import { PartiesIndex } from "@/entities/party.entity";
import { inject, injectable } from "tsyringe";
import { Group } from "@/entities/group.entity";
import { ChannelsGroups } from "@/entities/channels-groups.entity";
import { Channel } from "@/entities/channel.entity";
import GroupRepository from "@/repositories/group.repository";
import ChannelsGroupsRepository from "@/repositories/channels-groups.repository";
import ChannelRepository from "@/repositories/channel.repository";
import GroupDomain from "@/domains/group.domain";
import CasinoService from "@/services/casino.service";
import GameService from "@/services/game.service";
import ChannelService from "@/services/channel.service";
import ValidationException from "@/exceptions/validation.exception";
import NotFoundException from "@/exceptions/not-found.exception";
import ConflictException from "@/exceptions/conflict.exception";
import { GroupMessage } from "@/entities/group-message.entity";

@injectable()
export default class GroupService {
  constructor(
    @inject(GroupRepository) private readonly groupRepository: GroupRepository,
    @inject(ChannelsGroupsRepository)
    private readonly channelsGroupsRepository: ChannelsGroupsRepository,
    @inject(ChannelRepository)
    private readonly channelRepository: ChannelRepository,
    @inject(CasinoService) private readonly casinoService: CasinoService,
    @inject(GameService) private readonly gameService: GameService,
    @inject(ChannelService) private readonly channelService: ChannelService,
  ) {}

  async sendMessage(channel: string, data: MessageData): Promise<GroupMessage> {
    if (!GroupDomain.IsMessageValid({ channel, data })) {
      throw new ValidationException("Invalid channel or data format");
    }

    return {
      id: 1,
      group_id: 1,
      data: {},
      created: "10-01-2026",
    };
  }

  async addChannelToGroup(
    groupId: number,
    channelId: number,
  ): Promise<ChannelsGroups> {
    const existingGroup = await this.getGroupById(groupId);
    if (!existingGroup) {
      throw new NotFoundException("Group not found");
    }

    const existingChannel = await this.channelService.getChannelById(channelId);
    if (!existingChannel) {
      throw new NotFoundException("Channel not found");
    }

    const isAlreadyInGroup = await this.isChannelInGroup(groupId, channelId);
    if (isAlreadyInGroup) {
      throw new ConflictException("Channel is already in the group");
    }

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
    const existingGroup = await this.getGroupById(groupId);
    if (!existingGroup) {
      throw new NotFoundException("Group not found");
    }

    const existingChannel = await this.channelService.getChannelById(channelId);
    if (!existingChannel) {
      throw new NotFoundException("Channel not found");
    }

    const success =
      await this.channelsGroupsRepository.deleteByGroupIdAndChannelId(
        groupId,
        channelId,
      );

    if (!success) {
      throw new NotFoundException("Channel not found in this group");
    }

    return true;
  }

  async getParties(): Promise<PartiesIndex> {
    return this.groupRepository.getParties();
  }

  async createGroup(data: Partial<Group>): Promise<Group> {
    if (!data.casino_id || !data.game_id || !data.strategy) {
      throw new ValidationException("Missing casino_id, game_id or strategy");
    }

    if (!GroupDomain.IsStrategyValid(data.strategy)) {
      throw new ValidationException(
        "Strategy must not contain uppercase characters, spaces, or dashes. Only lowercase letters, numbers, and underscores are allowed.",
      );
    }

    const casino = await this.casinoService.getCasinoById(data.casino_id);
    if (!casino) {
      throw new NotFoundException("Casino not found");
    }

    if (!casino.status) {
      throw new ValidationException("Casino is not active");
    }

    const game = await this.gameService.getGameById(data.game_id);
    if (!game) {
      throw new NotFoundException("Game not found");
    }

    if (!game.status) {
      throw new ValidationException("Game is not active");
    }

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
    const existing = await this.getGroupById(id);
    if (!existing) {
      throw new NotFoundException("Group not found");
    }

    if (data.strategy && !GroupDomain.IsStrategyValid(data.strategy)) {
      throw new ValidationException(
        "Strategy must not contain uppercase characters, spaces, or dashes. Only lowercase letters, numbers, and underscores are allowed.",
      );
    }

    if (data.casino_id) {
      const casino = await this.casinoService.getCasinoById(data.casino_id);
      if (!casino) {
        throw new NotFoundException("Casino not found");
      }
      if (!casino.status) {
        throw new ValidationException("Casino is not active");
      }
    }

    if (data.game_id) {
      const game = await this.gameService.getGameById(data.game_id);
      if (!game) {
        throw new NotFoundException("Game not found");
      }
      if (!game.status) {
        throw new ValidationException("Game is not active");
      }
    }

    return this.groupRepository.update(id, data);
  }

  async deleteGroup(id: number): Promise<boolean> {
    const existing = await this.getGroupById(id);
    if (!existing) {
      throw new NotFoundException("Group not found");
    }

    return this.groupRepository.delete(id);
  }
}
