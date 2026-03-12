import { Router } from "express";
import container from "@/container";
import HealthController from "@/controllers/health.controller";

const router = Router();
const healthController = container.resolve(HealthController);

router.get("/health", healthController.checkHealth);

export default router;
