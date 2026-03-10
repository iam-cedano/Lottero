import { Router } from "express";
import ChannelController from "@/controllers/channel.controller";
import container from "@/container";

const router = Router();
const channelController = container.resolve(ChannelController);

router.post("/channel", channelController.createChannel);
router.get("/channels", channelController.getChannels);
router.get("/channel/:id", channelController.getChannelById);
router.get(
  "/channel-group/:channelGroupId/channels",
  channelController.getChannelsByChannelGroupId,
);
router.put("/channel/:id", channelController.updateChannel);
router.delete("/channel/:id", channelController.deleteChannel);

export default router;
