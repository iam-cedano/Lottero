import { Request, Response } from "express";

export default class HealthController {
  public checkHealth = (_req: Request, res: Response): void => {
    res.status(200).json({ status: "ok", message: "Lottero API is running" });
  };
}
