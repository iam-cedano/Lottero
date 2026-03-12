import { Router } from "express";
import container from "@/container";
import ChannelController from "@/controllers/channel.controller";

const router = Router();
const channelController = container.resolve(ChannelController);

router.post("/channel", channelController.createChannel);
router.get("/channels", channelController.getChannels);
router.get("/channel/:id", channelController.getChannelById);
router.put("/channel/:id", channelController.updateChannel);
router.delete("/channel/:id", channelController.deleteChannel);

export default router;
