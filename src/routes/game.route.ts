import { Router } from "express";
import GameController from "@/controllers/game.controller";
import container from "@/container";

const router = Router();
const gameController = container.resolve(GameController);

router.post("/game", gameController.createGame);
router.get("/games", gameController.getGames);
router.get("/game/:id", gameController.getGameById);
router.put("/game/:id", gameController.updateGame);
router.delete("/game/:id", gameController.deleteGame);

export default router;
