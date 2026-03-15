import { Request, Response, NextFunction } from "express";
import { config } from "@/config";

export function authenticate(req: Request, res: Response, next: NextFunction) {
  if (!config.apiSecretKey) return next();

  if (req.path == "/health") return next();

  const authHeader = req.headers.authorization;

  if (authHeader === `Bearer ${config.apiSecretKey}`) return next();

  return res.status(401).json({ error: "Unauthorized: Invalid API Key" });
}
