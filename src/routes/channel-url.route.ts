import { Router } from "express";
import ChannelUrlController from "@/controllers/channel-url.controller";
import container from "@/container";

const router = Router();
const channelUrlController = container.resolve(ChannelUrlController);

router.post("/channel-url", channelUrlController.createChannelUrl);
router.get("/channel-urls", channelUrlController.getChannelUrls);
router.get("/channel-url/:id", channelUrlController.getChannelUrlById);
router.get(
  "/channel/:channelId/urls",
  channelUrlController.getChannelUrlsByChannelId,
);
router.put("/channel-url/:id", channelUrlController.updateChannelUrl);
router.delete("/channel-url/:id", channelUrlController.deleteChannelUrl);

export default router;
