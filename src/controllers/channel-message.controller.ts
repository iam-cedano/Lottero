import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import { CreateChannelMessageRequest } from "@/models/channel-message.model";
import ChannelMessageService from "@/services/channel-message.service";
import GroupService from "@/services/group.service";
import GroupMessageService from "@/services/group-message.service";

@injectable()
export default class ChannelMessageController {
  constructor(
    @inject(ChannelMessageService)
    private readonly channelMessageService: ChannelMessageService,
    @inject(GroupService)
    private readonly groupService: GroupService,
    @inject(GroupMessageService)
    private readonly groupMessageService: GroupMessageService,
  ) {}

  public createChannelMessage = async (
    req: Request<any, any, CreateChannelMessageRequest>,
    res: Response,
  ): Promise<void> => {
    try {
      const { group_id, group_message_id } = req.body;

      if (!group_id || !group_message_id) {
        res.status(400).json({
          groupMessage: "Missing group_id or group_message_id",
        });
        return;
      }

      const group = await this.groupService.getGroupById(group_id);
      if (!group) {
        res.status(404).json({ groupMessage: "Channel group not found" });
        return;
      }

      const groupMessage =
        await this.groupMessageService.getMessageById(group_message_id);
      if (!groupMessage) {
        res.status(404).json({ groupMessage: "GroupMessage not found" });
        return;
      }

      const channelMessage =
        await this.channelMessageService.createChannelMessage({
          group_id,
          group_message_id,
        });

      res.status(201).json(channelMessage);
    } catch (error) {
      res.status(500).json({
        groupMessage: "Failed to create channel group groupMessage",
        error,
      });
    }
  };

  public getChannelMessages = async (
    _req: Request,
    res: Response,
  ): Promise<void> => {
    try {
      const channelMessages =
        await this.channelMessageService.getChannelMessages();
      res.status(200).json(channelMessages);
    } catch (error) {
      res.status(500).json({
        groupMessage: "Failed to fetch channel group groupMessages",
        error,
      });
    }
  };

  public getChannelMessageById = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    try {
      const id = parseInt(req.params.id as string, 10);
      if (isNaN(id)) {
        res
          .status(400)
          .json({ groupMessage: "Invalid channel group groupMessage ID" });
        return;
      }
      const channelMessage =
        await this.channelMessageService.getChannelMessageById(id);
      if (!channelMessage) {
        res
          .status(404)
          .json({ groupMessage: "Channel group groupMessage not found" });
        return;
      }
      res.status(200).json(channelMessage);
    } catch (error) {
      res.status(500).json({
        groupMessage: "Failed to fetch channel group groupMessage",
        error,
      });
    }
  };

  public getChannelMessagesByGroupId = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    try {
      const groupId = parseInt(req.params.groupId as string, 10);
      if (isNaN(groupId)) {
        res.status(400).json({ groupMessage: "Invalid channel group ID" });
        return;
      }
      const channelMessages =
        await this.channelMessageService.getChannelMessagesByGroupId(groupId);
      res.status(200).json(channelMessages);
    } catch (error) {
      res.status(500).json({
        groupMessage:
          "Failed to fetch channel group groupMessages by channel group id",
        error,
      });
    }
  };

  public updateChannelMessage = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    try {
      const id = parseInt(req.params.id as string, 10);
      if (isNaN(id)) {
        res
          .status(400)
          .json({ groupMessage: "Invalid channel group groupMessage ID" });
        return;
      }
      const { group_id, group_message_id } = req.body;

      if (group_id !== undefined) {
        const group = await this.groupService.getGroupById(group_id);
        if (!group) {
          res.status(404).json({ groupMessage: "Channel group not found" });
          return;
        }
      }

      if (group_message_id !== undefined) {
        const groupMessage =
          await this.groupMessageService.getMessageById(group_message_id);
        if (!groupMessage) {
          res.status(404).json({ groupMessage: "GroupMessage not found" });
          return;
        }
      }

      const updatedChannelMessage =
        await this.channelMessageService.updateChannelMessage(id, {
          group_id,
          group_message_id,
        });
      if (!updatedChannelMessage) {
        res
          .status(404)
          .json({ groupMessage: "Channel group groupMessage not found" });
        return;
      }
      res.status(200).json(updatedChannelMessage);
    } catch (error) {
      res.status(500).json({
        groupMessage: "Failed to update channel group groupMessage",
        error,
      });
    }
  };

  public deleteChannelMessage = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    try {
      const id = parseInt(req.params.id as string, 10);
      if (isNaN(id)) {
        res
          .status(400)
          .json({ groupMessage: "Invalid channel group groupMessage ID" });
        return;
      }
      const success = await this.channelMessageService.deleteChannelMessage(id);
      if (!success) {
        res
          .status(404)
          .json({ groupMessage: "Channel group groupMessage not found" });
        return;
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({
        groupMessage: "Failed to delete channel group groupMessage",
        error,
      });
    }
  };
}
