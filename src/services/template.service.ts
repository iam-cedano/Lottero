import { delay, inject, injectable } from "tsyringe";
import { Template } from "@/entities/template.entity";
import TemplateRepository from "@/repositories/template.repository";
import TemplateDomain from "@/domains/template.domain";
import GroupService from "@/services/group.service";
import ValidationException from "@/exceptions/validation.exception";
import NotFoundException from "@/exceptions/not-found.exception";

@injectable()
export default class TemplateService {
  constructor(
    @inject(TemplateRepository)
    private readonly templateRepository: TemplateRepository,
    @inject(delay(() => GroupService))
    private readonly groupService: GroupService,
  ) { }

  async createTemplate(data: Partial<Template>): Promise<Template> {
    if (
      !data.language ||
      !data.group_id ||
      !data.name ||
      !data.content
    ) {
      throw new ValidationException(
        "Missing language, group_id, name, or content",
      );
    }

    if (TemplateDomain.isGlobalCommand(data.name)) {
      throw new ValidationException("Template name is reserved");
    }

    const group = await this.groupService.getGroupById(data.group_id);
    if (!group) {
      throw new NotFoundException("Group not found");
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

    const groupIdToUse = merged.group_id;

    if (groupIdToUse != null) {
      const group = await this.groupService.getGroupById(groupIdToUse);
      if (!group) {
        throw new NotFoundException("Group not found");
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

  async getTemplatesFromCasinoIdAndType(casinoId: number, type: string) {
    return this.templateRepository.findByCasinoIdAndType(casinoId, type);
  }

  async getTemplatesFromCasinoIdAndGameIdAndType(casinoId: number, gameId: number, type: string) {
    return this.templateRepository.findByCasinoIdAndGameIdAndType(casinoId, gameId, type);
  }

  async getTemplatesFromCasinoIdAndGameIdAndStrategyAndType(casinoId: number, gameId: number, strategy: string, type: string) {
    return this.templateRepository.findByCasinoIdAndGameIdAndStrategyAndType(casinoId, gameId, strategy, type);
  }
}
