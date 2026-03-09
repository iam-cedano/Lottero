import { Router } from "express";
import CasinoController from "@/controllers/casino.controller";
import container from "@/container";

const router = Router();
const casinoController = container.resolve(CasinoController);

router.post("/casino", casinoController.createCasino);
router.get("/casinos", casinoController.getCasinos);
router.get("/casino/:id", casinoController.getCasinoById);
router.put("/casino/:id", casinoController.updateCasino);
router.delete("/casino/:id", casinoController.deleteCasino);

export default router;
