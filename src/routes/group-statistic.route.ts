import { Router } from "express";
import GroupStatisticController from "@/controllers/group-statistic.controller";
import container from "@/container";

const router = Router();
const groupStatisticController = container.resolve(
  GroupStatisticController,
);

router.post(
  "/group-statistic",
  groupStatisticController.createGroupStatistic,
);
router.get(
  "/group-statistics",
  groupStatisticController.getGroupStatistics,
);
router.get(
  "/group-statistic/:id",
  groupStatisticController.getGroupStatisticById,
);
router.put(
  "/group-statistic/:id",
  groupStatisticController.updateGroupStatistic,
);
router.delete(
  "/group-statistic/:id",
  groupStatisticController.deleteGroupStatistic,
);

export default router;
