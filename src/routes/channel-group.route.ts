import { Router } from "express";
import ChannelGroupController from "@/controllers/channel-group.controller";
import container from "@/container";

const router = Router();
const channelGroupController = container.resolve(ChannelGroupController);

router.get("/message", channelGroupController.sendMessage);

router.post("/channel-group", channelGroupController.createChannelGroup);
router.get("/channel-groups", channelGroupController.getChannelGroups);
router.get("/channel-group/:id", channelGroupController.getChannelGroupById);
router.put("/channel-group/:id", channelGroupController.updateChannelGroup);
router.delete("/channel-group/:id", channelGroupController.deleteChannelGroup);

export default router;
