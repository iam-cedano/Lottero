import { Router } from "express";
import healthRoutes from "@/routes/health.routes";
import channelGroupRoutes from "@/routes/channel-group.route";
import channelRoutes from "@/routes/channel.route";
import casinoRoutes from "@/routes/casino.route";
import gameRoutes from "@/routes/game.route";
import channelGroupStatisticRoutes from "@/routes/channel-group-statistic.route";
import messageRoutes from "@/routes/group-message.route";
import channelMessageRoutes from "@/routes/channel-message.route";

const router = Router();

router.use("/", healthRoutes);
router.use("/", channelGroupRoutes);
router.use("/", channelRoutes);
router.use("/", casinoRoutes);
router.use("/", gameRoutes);
router.use("/", channelGroupStatisticRoutes);
router.use("/", messageRoutes);
router.use("/", channelMessageRoutes);

export default router;
