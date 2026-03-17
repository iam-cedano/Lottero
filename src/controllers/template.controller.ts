import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import {
  CreateTemplateRequest,
  UpdateTemplateRequest,
} from "@/models/template.model";
import TemplateService from "@/services/template.service";
import BaseException from "@/exceptions/base.exception";
import ValidationException from "@/exceptions/validation.exception";

@injectable()
export default class TemplateController {
  constructor(
    @inject(TemplateService) private readonly templateService: TemplateService,
  ) {}

  public createTemplate = async (
    req: Request<Record<string, string>, unknown, CreateTemplateRequest>,
    res: Response,
  ): Promise<void> => {
    try {
      const { channel_id, group_id, name, content } = req.body;

      if (channel_id == null || group_id == null || !name || !content) {
        throw new ValidationException(
          "Missing channel_id, group_id, name, or content",
        );
      }

      const template = await this.templateService.createTemplate({
        channel_id,
        group_id,
        name,
        content,
      });

      res.status(201).json(template);
    } catch (error) {
      if (!(error instanceof BaseException)) {
        res.status(500).json({ message: "An error has occured" });
        return;
      }

      error.report(res);
    }
  };

  public getTemplates = async (_req: Request, res: Response): Promise<void> => {
    try {
      const templates = await this.templateService.getTemplates();
      res.status(200).json(templates);
    } catch (error) {
      if (!(error instanceof BaseException)) {
        res.status(500).json({ message: "An error has occured" });
        return;
      }

      error.report(res);
    }
  };

  public getTemplateById = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    try {
      const id = parseInt(req.params.id as string, 10);
      if (isNaN(id)) {
        throw new ValidationException("Invalid template ID");
      }
      const template = await this.templateService.getTemplateById(id);
      if (!template) {
        res.status(404).json({ message: "Template not found" });
        return;
      }
      res.status(200).json(template);
    } catch (error) {
      if (!(error instanceof BaseException)) {
        res.status(500).json({ message: "An error has occured" });
        return;
      }

      error.report(res);
    }
  };

  public getTemplatesByChannelId = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    try {
      const channelId = parseInt(req.params.channelId as string, 10);
      if (isNaN(channelId)) {
        throw new ValidationException("Invalid channel ID");
      }
      const templates =
        await this.templateService.getTemplatesByChannelId(channelId);
      res.status(200).json(templates);
    } catch (error) {
      if (!(error instanceof BaseException)) {
        res.status(500).json({ message: "An error has occured" });
        return;
      }

      error.report(res);
    }
  };

  public updateTemplate = async (
    req: Request<
      Record<string, string>,
      unknown,
      Partial<UpdateTemplateRequest>
    >,
    res: Response,
  ): Promise<void> => {
    try {
      const id = parseInt(req.params.id as string, 10);
      if (isNaN(id)) {
        throw new ValidationException("Invalid template ID");
      }

      const requestBody = req.body;

      const updatedTemplate = await this.templateService.updateTemplate(id, {
        ...requestBody,
      });

      res.status(200).json(updatedTemplate);
    } catch (error) {
      if (!(error instanceof BaseException)) {
        res.status(500).json({ message: "An error has occured" });
        return;
      }

      error.report(res);
    }
  };

  public getTemplatesByGroupId = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    try {
      const groupId = parseInt(req.params.groupId as string, 10);
      if (isNaN(groupId)) {
        throw new ValidationException("Invalid group ID");
      }
      const templates =
        await this.templateService.getTemplatesByGroupId(groupId);
      res.status(200).json(templates);
    } catch (error) {
      if (!(error instanceof BaseException)) {
        res.status(500).json({ message: "An error has occured" });
        return;
      }

      error.report(res);
    }
  };

  public deleteTemplate = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    try {
      const id = parseInt(req.params.id as string, 10);
      if (isNaN(id)) {
        throw new ValidationException("Invalid template ID");
      }
      const success = await this.templateService.deleteTemplate(id);
      if (!success) {
        res.status(404).json({ message: "Template not found" });
        return;
      }
      res.status(204).send();
    } catch (error) {
      if (!(error instanceof BaseException)) {
        res.status(500).json({ message: "An error has occured" });
        return;
      }

      error.report(res);
    }
  };
}
