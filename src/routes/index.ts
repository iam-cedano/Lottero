import { Router } from "express";
import healthRoutes from "@/routes/health.routes";
import channelRoutes from "@/routes/channel.route";
import channelLanguageRoutes from "@/routes/channel-language.route";
import casinoRoutes from "@/routes/casino.route";
import gameRoutes from "@/routes/game.route";
import channelStatisticRoutes from "@/routes/channel-statistic.route";
import messageRoutes from "@/routes/message.route";
import channelMessageRoutes from "@/routes/channel-message.route";

const router = Router();

router.use("/", healthRoutes);
router.use("/", channelRoutes);
router.use("/", channelLanguageRoutes);
router.use("/", casinoRoutes);
router.use("/", gameRoutes);
router.use("/", channelStatisticRoutes);
router.use("/", messageRoutes);
router.use("/", channelMessageRoutes);

export default router;
