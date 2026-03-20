import { Router } from "express";
import healthRoutes from "@/routes/health.routes";
import groupRoutes from "@/routes/group.route";
import channelRoutes from "@/routes/channel.route";
import casinoRoutes from "@/routes/casino.route";
import gameRoutes from "@/routes/game.route";
import messageRoutes from "@/routes/group-message.route";
import channelMessageRoutes from "@/routes/channel-message.route";
import templateRoutes from "@/routes/template.route";

const router = Router();

router.use("/", healthRoutes);
router.use("/", groupRoutes);
router.use("/", channelRoutes);
router.use("/", casinoRoutes);
router.use("/", gameRoutes);
router.use("/", messageRoutes);
router.use("/", channelMessageRoutes);
router.use("/", templateRoutes);

export default router;
