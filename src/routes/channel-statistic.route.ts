import { Router } from "express";
import ChannelStatisticController from "@/controllers/channel-statistic.controller";
import container from "@/container";

const router = Router();
const channelStatisticController = container.resolve(
  ChannelStatisticController,
);

router.post(
  "/channel-statistic",
  channelStatisticController.createChannelStatistic,
);
router.get(
  "/channel-statistics",
  channelStatisticController.getChannelStatistics,
);
router.get(
  "/channel-statistic/:id",
  channelStatisticController.getChannelStatisticById,
);
router.put(
  "/channel-statistic/:id",
  channelStatisticController.updateChannelStatistic,
);
router.delete(
  "/channel-statistic/:id",
  channelStatisticController.deleteChannelStatistic,
);

export default router;
