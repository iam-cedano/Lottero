import { describe, it, beforeEach, expect, vi } from "vitest";
import { Template } from "@/entities/template.entity";
import TemplateRepository from "@/repositories/template.repository";
import TemplateService from "@/services/template.service";
import TemplateDomain from "@/domains/template.domain";
import ChannelService from "@/services/channel.service";
import GroupService from "@/services/group.service";

describe("TemplateService", () => {
  const templateRepositoryMock = {} as unknown as TemplateRepository;
  const channelServiceMock = {} as unknown as ChannelService;
  const groupServiceMock = {} as unknown as GroupService;
  let templateService: TemplateService;

  beforeEach(() => {
    templateRepositoryMock.create = vi.fn();
    templateRepositoryMock.findAll = vi.fn();
    templateRepositoryMock.findById = vi.fn();
    templateRepositoryMock.findByChannelId = vi.fn();
    templateRepositoryMock.findByGroupId = vi.fn();
    templateRepositoryMock.update = vi.fn();
    templateRepositoryMock.delete = vi.fn();
    templateRepositoryMock.doesExistInChannelAndGroup = vi.fn();

    channelServiceMock.getChannelById = vi.fn();

    groupServiceMock.getGroupById = vi.fn();
    groupServiceMock.isChannelInGroup = vi.fn();

    templateService = new TemplateService(
      templateRepositoryMock,
      channelServiceMock,
      groupServiceMock,
    );
  });

  describe("createTemplate", () => {
    it("should create a template", async () => {
      const data: Partial<Template> = {
        channel_id: 1,
        group_id: 2,
        name: "welcome",
        content: "Welcome message",
      };

      const createdTemplate: Template = {
        id: 1,
        channel_id: 1,
        group_id: 2,
        name: "welcome",
        content: "Welcome message",
      };

      vi.spyOn(channelServiceMock, "getChannelById").mockResolvedValue(
        {} as any,
      );
      vi.spyOn(groupServiceMock, "getGroupById").mockResolvedValue({} as any);
      vi.spyOn(groupServiceMock, "isChannelInGroup").mockResolvedValue(true);
      vi.spyOn(
        templateRepositoryMock,
        "doesExistInChannelAndGroup",
      ).mockResolvedValue(false);
      vi.spyOn(templateRepositoryMock, "create").mockResolvedValue(
        createdTemplate,
      );

      const result = await templateService.createTemplate(data);

      expect(templateRepositoryMock.create).toHaveBeenCalledWith(data);
      expect(result).toEqual(createdTemplate);
    });
  });

  describe("getTemplates", () => {
    it("should return all templates", async () => {
      const templates: Template[] = [
        {
          id: 1,
          channel_id: 1,
          group_id: 2,
          name: "welcome",
          content: "Welcome message",
        },
        {
          id: 2,
          channel_id: 1,
          group_id: 3,
          name: "bye",
          content: "Bye message",
        },
      ];

      vi.spyOn(templateRepositoryMock, "findAll").mockResolvedValue(templates);

      const result = await templateService.getTemplates();

      expect(templateRepositoryMock.findAll).toHaveBeenCalled();
      expect(result).toEqual(templates);
    });
  });

  describe("getTemplateById", () => {
    it("should return a template by id", async () => {
      const template: Template = {
        id: 1,
        channel_id: 1,
        group_id: 2,
        name: "welcome",
        content: "Welcome message",
      };

      vi.spyOn(templateRepositoryMock, "findById").mockResolvedValue(template);

      const result = await templateService.getTemplateById(1);

      expect(templateRepositoryMock.findById).toHaveBeenCalledWith(1);
      expect(result).toEqual(template);
    });

    it("should return null when template not found", async () => {
      vi.spyOn(templateRepositoryMock, "findById").mockResolvedValue(null);

      const result = await templateService.getTemplateById(1);

      expect(templateRepositoryMock.findById).toHaveBeenCalledWith(1);
      expect(result).toBeNull();
    });
  });

  describe("getTemplatesByChannelId", () => {
    it("should return templates by channel id", async () => {
      const templates: Template[] = [
        {
          id: 1,
          channel_id: 1,
          group_id: 2,
          name: "welcome",
          content: "Welcome message",
        },
      ];

      vi.spyOn(templateRepositoryMock, "findByChannelId").mockResolvedValue(
        templates,
      );

      const result = await templateService.getTemplatesByChannelId(1);

      expect(templateRepositoryMock.findByChannelId).toHaveBeenCalledWith(1);
      expect(result).toEqual(templates);
    });
  });

  describe("getTemplatesByGroupId", () => {
    it("should return templates by group id", async () => {
      const templates: Template[] = [
        {
          id: 1,
          channel_id: 1,
          group_id: 2,
          name: "welcome",
          content: "Welcome message",
        },
      ];

      vi.spyOn(templateRepositoryMock, "findByGroupId").mockResolvedValue(
        templates,
      );

      const result = await templateService.getTemplatesByGroupId(2);

      expect(templateRepositoryMock.findByGroupId).toHaveBeenCalledWith(2);
      expect(result).toEqual(templates);
    });
  });

  describe("updateTemplate", () => {
    it("should update a template", async () => {
      const data: Partial<Template> = {
        name: "welcome-updated",
        content: "Updated welcome message",
      };

      const updatedTemplate: Template = {
        id: 1,
        channel_id: 1,
        group_id: 2,
        name: "welcome-updated",
        content: "Updated welcome message",
      };

      vi.spyOn(templateRepositoryMock, "findById").mockResolvedValue(
        updatedTemplate,
      );
      vi.spyOn(channelServiceMock, "getChannelById").mockResolvedValue(
        {} as any,
      );
      vi.spyOn(groupServiceMock, "getGroupById").mockResolvedValue({} as any);
      vi.spyOn(groupServiceMock, "isChannelInGroup").mockResolvedValue(true);
      vi.spyOn(templateRepositoryMock, "update").mockResolvedValue(
        updatedTemplate,
      );

      const result = await templateService.updateTemplate(1, data);

      expect(templateRepositoryMock.update).toHaveBeenCalledWith(
        1,
        updatedTemplate,
      );
      expect(result).toEqual(updatedTemplate);
    });
  });

  describe("deleteTemplate", () => {
    it("should delete a template", async () => {
      const existingTemplate: Template = {
        id: 1,
        channel_id: 1,
        group_id: 2,
        name: "welcome",
        content: "Welcome message",
      };

      vi.spyOn(templateRepositoryMock, "findById").mockResolvedValue(
        existingTemplate,
      );
      vi.spyOn(templateRepositoryMock, "delete").mockResolvedValue(true);

      const result = await templateService.deleteTemplate(1);

      expect(templateRepositoryMock.delete).toHaveBeenCalledWith(1);
      expect(result).toBe(true);
    });
  });

  describe("doesTemplateExistInChannelAndGroup", () => {
    it("should return true when template exists", async () => {
      vi.spyOn(
        templateRepositoryMock,
        "doesExistInChannelAndGroup",
      ).mockResolvedValue(true);

      const result = await templateService.doesTemplateExistInChannelAndGroup(
        1,
        2,
        "welcome",
      );

      expect(
        templateRepositoryMock.doesExistInChannelAndGroup,
      ).toHaveBeenCalledWith(1, 2, "welcome");
      expect(result).toBe(true);
    });

    it("should return false when template does not exist", async () => {
      vi.spyOn(
        templateRepositoryMock,
        "doesExistInChannelAndGroup",
      ).mockResolvedValue(false);

      const result = await templateService.doesTemplateExistInChannelAndGroup(
        1,
        2,
        "welcome",
      );

      expect(
        templateRepositoryMock.doesExistInChannelAndGroup,
      ).toHaveBeenCalledWith(1, 2, "welcome");
      expect(result).toBe(false);
    });
  });
});
