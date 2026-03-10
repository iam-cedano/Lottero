import { Router } from "express";
import ChannelMessageController from "@/controllers/channel-message.controller";
import container from "@/container";

const router = Router();
const channelMessageController = container.resolve(
  ChannelMessageController,
);

router.post(
  "/channel-message",
  channelMessageController.createChannelMessage,
);
router.get(
  "/channel-messages",
  channelMessageController.getChannelMessages,
);
router.get(
  "/channel-message/:id",
  channelMessageController.getChannelMessageById,
);
router.get(
  "/channel-group/:channelGroupId/messages",
  channelMessageController.getChannelMessagesByChannelGroupId,
);
router.put(
  "/channel-message/:id",
  channelMessageController.updateChannelMessage,
);
router.delete(
  "/channel-message/:id",
  channelMessageController.deleteChannelMessage,
);

export default router;
