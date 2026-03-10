import { Router } from "express";
import ChannelGroupStatisticController from "@/controllers/channel-group-statistic.controller";
import container from "@/container";

const router = Router();
const channelGroupStatisticController = container.resolve(
  ChannelGroupStatisticController,
);

router.post(
  "/channel-group-statistic",
  channelGroupStatisticController.createChannelGroupStatistic,
);
router.get(
  "/channel-group-statistics",
  channelGroupStatisticController.getChannelGroupStatistics,
);
router.get(
  "/channel-group-statistic/:id",
  channelGroupStatisticController.getChannelGroupStatisticById,
);
router.put(
  "/channel-group-statistic/:id",
  channelGroupStatisticController.updateChannelGroupStatistic,
);
router.delete(
  "/channel-group-statistic/:id",
  channelGroupStatisticController.deleteChannelGroupStatistic,
);

export default router;
