import { inject, injectable } from "tsyringe";
import { Template } from "@/entities/template.entity";
import TemplateRepository from "@/repositories/template.repository";
import TemplateDomain from "@/domains/template.domain";
import ChannelService from "@/services/channel.service";
import GroupService from "@/services/group.service";
import ValidationException from "@/exceptions/validation.exception";
import NotFoundException from "@/exceptions/not-found.exception";
import ConflictException from "@/exceptions/conflict.exception";

@injectable()
export default class TemplateService {
  constructor(
    @inject(TemplateRepository)
    private readonly templateRepository: TemplateRepository,
    @inject(ChannelService)
    private readonly channelService: ChannelService,
    @inject(GroupService)
    private readonly groupService: GroupService,
  ) {}

  async createTemplate(data: Partial<Template>): Promise<Template> {
    if (
      data.channel_id == null ||
      data.group_id == null ||
      !data.name ||
      !data.content
    ) {
      throw new ValidationException(
        "Missing channel_id, group_id, name, or content",
      );
    }

    if (TemplateDomain.isGlobalCommand(data.name)) {
      throw new ValidationException("Template name is reserved");
    }

    const channel = await this.channelService.getChannelById(data.channel_id);
    if (!channel) {
      throw new NotFoundException("Channel not found");
    }

    const group = await this.groupService.getGroupById(data.group_id);
    if (!group) {
      throw new NotFoundException("Group not found");
    }

    const isChannelInGroup = await this.groupService.isChannelInGroup(
      data.group_id,
      data.channel_id,
    );

    if (!isChannelInGroup) {
      throw new ValidationException("Channel is not in the group");
    }

    const doesTemplateExistInChannelAndGroup =
      await this.templateRepository.doesExistInChannelAndGroup(
        data.channel_id,
        data.group_id,
        data.name,
      );

    if (doesTemplateExistInChannelAndGroup) {
      throw new ConflictException(
        "Template already exists in channel and group",
      );
    }

    return this.templateRepository.create(data);
  }

  async getTemplates(): Promise<Template[]> {
    return this.templateRepository.findAll();
  }

  async getTemplateById(id: number): Promise<Template | null> {
    return this.templateRepository.findById(id);
  }

  async getTemplatesByChannelId(channelId: number): Promise<Template[]> {
    return this.templateRepository.findByChannelId(channelId);
  }

  async getTemplatesByGroupId(groupId: number): Promise<Template[]> {
    return this.templateRepository.findByGroupId(groupId);
  }

  async updateTemplate(
    id: number,
    data: Partial<Template>,
  ): Promise<Template | null> {
    const existing = await this.templateRepository.findById(id);

    if (!existing) {
      throw new NotFoundException("Template not found");
    }

    const merged: Partial<Template> = {
      ...existing,
      ...data,
    };

    if (merged.name && TemplateDomain.isGlobalCommand(merged.name)) {
      throw new ValidationException("Template name is reserved");
    }

    const channelIdToUse = merged.channel_id;
    const groupIdToUse = merged.group_id;

    if (channelIdToUse != null) {
      const channel = await this.channelService.getChannelById(channelIdToUse);
      if (!channel) {
        throw new NotFoundException("Channel not found");
      }
    }

    if (groupIdToUse != null) {
      const group = await this.groupService.getGroupById(groupIdToUse);
      if (!group) {
        throw new NotFoundException("Group not found");
      }
    }

    if (channelIdToUse != null || groupIdToUse != null) {
      const isChannelInGroup = await this.groupService.isChannelInGroup(
        groupIdToUse ?? existing.group_id,
        channelIdToUse ?? existing.channel_id,
      );

      if (!isChannelInGroup) {
        throw new ValidationException("Channel is not in the group");
      }
    }

    return this.templateRepository.update(id, merged);
  }

  async deleteTemplate(id: number): Promise<boolean> {
    const existing = await this.templateRepository.findById(id);

    if (!existing) {
      throw new NotFoundException("Template not found");
    }

    return this.templateRepository.delete(id);
  }

  async doesTemplateExistInChannelAndGroup(
    channel_id: number,
    group_id: number,
    name: string,
  ): Promise<boolean> {
    return this.templateRepository.doesExistInChannelAndGroup(
      channel_id,
      group_id,
      name,
    );
  }
}
