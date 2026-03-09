import { Router } from "express";
import ChannelLanguageController from "@/controllers/channel-language.controller";
import container from "@/container";

const router = Router();
const channelLanguageController = container.resolve(ChannelLanguageController);

router.post(
  "/channel-language",
  channelLanguageController.createChannelLanguage,
);
router.get("/channel-languages", channelLanguageController.getChannelLanguages);
router.get(
  "/channel-language/:id",
  channelLanguageController.getChannelLanguageById,
);
router.get(
  "/channel/:channelId/languages",
  channelLanguageController.getChannelLanguagesByChannelId,
);
router.put(
  "/channel-language/:id",
  channelLanguageController.updateChannelLanguage,
);
router.delete(
  "/channel-language/:id",
  channelLanguageController.deleteChannelLanguage,
);

export default router;
