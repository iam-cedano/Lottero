import { Request, Response } from "express";
import { injectable } from "tsyringe";
import {
  CreateGroupMessageRequest,
  UpdateGroupMessageRequest,
} from "@/models/group-message.model";
import GroupMessageService from "@/services/group-message.service";

@injectable()
export default class GroupMessageController {
  constructor(private readonly groupMessageService: GroupMessageService) {}

  public createGroupMessage = async (
    req: Request<any, any, CreateGroupMessageRequest>,
    res: Response,
  ): Promise<void> => {
    try {
      const { group_id, data, created } = req.body;

      if (!group_id) {
        res.status(400).json({ groupMessage: "Missing group_id" });
        return;
      }

      const groupMessage = await this.groupMessageService.createGroupMessage({
        group_id,
        data,
        created,
      });

      res.status(201).json(groupMessage);
    } catch (error) {
      res
        .status(500)
        .json({ groupMessage: "Failed to create groupMessage", error });
    }
  };

  public getGroupMessages = async (
    _req: Request,
    res: Response,
  ): Promise<void> => {
    try {
      const groupMessages = await this.groupMessageService.getGroupMessages();
      res.status(200).json(groupMessages);
    } catch (error) {
      res
        .status(500)
        .json({ groupMessage: "Failed to fetch groupMessages", error });
    }
  };

  public getMessageById = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    try {
      const id = parseInt(req.params.id as string, 10);
      if (isNaN(id)) {
        res.status(400).json({ groupMessage: "Invalid groupMessage ID" });
        return;
      }
      const groupMessage = await this.groupMessageService.getMessageById(id);
      if (!groupMessage) {
        res.status(404).json({ groupMessage: "GroupMessage not found" });
        return;
      }
      res.status(200).json(groupMessage);
    } catch (error) {
      res
        .status(500)
        .json({ groupMessage: "Failed to fetch groupMessage", error });
    }
  };

  public updateGroupMessage = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    try {
      const id = parseInt(req.params.id as string, 10);
      if (isNaN(id)) {
        res.status(400).json({ groupMessage: "Invalid groupMessage ID" });
        return;
      }
      const { group_id, data, created }: UpdateGroupMessageRequest =
        req.body;

      const updatedGroupMessage =
        await this.groupMessageService.updateGroupMessage(id, {
          group_id,
          data,
          created,
        });
      if (!updatedGroupMessage) {
        res.status(404).json({ groupMessage: "GroupMessage not found" });
        return;
      }
      res.status(200).json(updatedGroupMessage);
    } catch (error) {
      res
        .status(500)
        .json({ groupMessage: "Failed to update groupMessage", error });
    }
  };

  public deleteGroupMessage = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    try {
      const id = parseInt(req.params.id as string, 10);
      if (isNaN(id)) {
        res.status(400).json({ groupMessage: "Invalid groupMessage ID" });
        return;
      }
      const success = await this.groupMessageService.deleteGroupMessage(id);
      if (!success) {
        res.status(404).json({ groupMessage: "GroupMessage not found" });
        return;
      }
      res.status(204).send();
    } catch (error) {
      res
        .status(500)
        .json({ groupMessage: "Failed to delete groupMessage", error });
    }
  };
}
