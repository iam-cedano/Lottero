import { inject, injectable } from "tsyringe";
import { Template } from "@/entities/template.entity";
import TemplateRepository from "@/repositories/template.repository";
import TemplateDomain from "@/domains/template.domain";

@injectable()
export default class TemplateService {
  constructor(
    @inject(TemplateRepository)
    private readonly templateRepository: TemplateRepository,
  ) {}

  async createTemplate(data: Partial<Template>): Promise<Template> {
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
    return this.templateRepository.update(id, data);
  }

  async deleteTemplate(id: number): Promise<boolean> {
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

  isCommandGlobal(command: string): boolean {
    return TemplateDomain.isGlobalCommand(command);
  }
}
