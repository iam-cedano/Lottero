import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import {
  CreateTemplateRequest,
  UpdateTemplateRequest,
} from "@/models/template.model";
import TemplateService from "@/services/template.service";
import ChannelService from "@/services/channel.service";
import GroupService from "@/services/group.service";

@injectable()
export default class TemplateController {
  constructor(
    @inject(TemplateService) private readonly templateService: TemplateService,
    @inject(ChannelService) private readonly channelService: ChannelService,
    @inject(GroupService) private readonly groupService: GroupService,
  ) {}

  public createTemplate = async (
    req: Request<Record<string, string>, unknown, CreateTemplateRequest>,
    res: Response,
  ): Promise<void> => {
    try {
      const { channel_id, group_id, name, content } = req.body;

      if (!channel_id || !group_id || !name || !content) {
        res.status(400).json({
          message: "Missing channel_id, group_id, name, or content",
        });
        return;
      }

      if (this.templateService.isCommandGlobal(name)) {
        res.status(400).json({ message: "Template name is reserved" });
        return;
      }

      const channel = await this.channelService.getChannelById(channel_id);
      if (!channel) {
        res.status(404).json({ message: "Channel not found" });
        return;
      }

      const group = await this.groupService.getGroupById(group_id);
      if (!group) {
        res.status(404).json({ message: "Group not found" });
        return;
      }

      const isChannelInGroup = await this.groupService.isChannelInGroup(
        group_id,
        channel_id,
      );

      if (!isChannelInGroup) {
        res.status(400).json({ message: "Channel is not in the group" });
        return;
      }

      const doesTemplateExistInChannelAndGroup =
        await this.templateService.doesTemplateExistInChannelAndGroup(
          channel_id,
          group_id,
          name,
        );

      console.log(`${Date.now()} | ${doesTemplateExistInChannelAndGroup}`);

      if (doesTemplateExistInChannelAndGroup) {
        res
          .status(400)
          .json({ message: "Template already exists in channel and group" });
        return;
      }

      const template = await this.templateService.createTemplate({
        channel_id,
        group_id,
        name,
        content,
      });

      res.status(201).json(template);
    } catch (error) {
      res.status(500).json({ message: "Failed to create template", error });
    }
  };

  public getTemplates = async (_req: Request, res: Response): Promise<void> => {
    try {
      const templates = await this.templateService.getTemplates();
      res.status(200).json(templates);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch templates", error });
    }
  };

  public getTemplateById = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    try {
      const id = parseInt(req.params.id as string, 10);
      if (isNaN(id)) {
        res.status(400).json({ message: "Invalid template ID" });
        return;
      }
      const template = await this.templateService.getTemplateById(id);
      if (!template) {
        res.status(404).json({ message: "Template not found" });
        return;
      }
      res.status(200).json(template);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch template", error });
    }
  };

  public getTemplatesByChannelId = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    try {
      const channelId = parseInt(req.params.channelId as string, 10);
      if (isNaN(channelId)) {
        res.status(400).json({ message: "Invalid channel ID" });
        return;
      }
      const templates =
        await this.templateService.getTemplatesByChannelId(channelId);
      res.status(200).json(templates);
    } catch (error) {
      res.status(500).json({
        message: "Failed to fetch templates by channel id",
        error,
      });
    }
  };

  public updateTemplate = async (
    req: Request<Record<string, string>, unknown, UpdateTemplateRequest>,
    res: Response,
  ): Promise<void> => {
    try {
      const id = parseInt(req.params.id as string, 10);
      if (isNaN(id)) {
        res.status(400).json({ message: "Invalid template ID" });
        return;
      }

      const updatedTemplate = await this.templateService.updateTemplate(
        id,
        req.body,
      );
      if (!updatedTemplate) {
        res.status(404).json({ message: "Template not found" });
        return;
      }
      res.status(200).json(updatedTemplate);
    } catch (error) {
      res.status(500).json({ message: "Failed to update template", error });
    }
  };

  public getTemplatesByGroupId = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    try {
      const groupId = parseInt(req.params.groupId as string, 10);
      if (isNaN(groupId)) {
        res.status(400).json({ message: "Invalid group ID" });
        return;
      }
      const templates =
        await this.templateService.getTemplatesByGroupId(groupId);
      res.status(200).json(templates);
    } catch (error) {
      res.status(500).json({
        message: "Failed to fetch templates by group id",
        error,
      });
    }
  };

  public deleteTemplate = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    try {
      const id = parseInt(req.params.id as string, 10);
      if (isNaN(id)) {
        res.status(400).json({ message: "Invalid template ID" });
        return;
      }
      const success = await this.templateService.deleteTemplate(id);
      if (!success) {
        res.status(404).json({ message: "Template not found" });
        return;
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete template", error });
    }
  };
}
