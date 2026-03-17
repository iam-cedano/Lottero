import { Response } from "express";
import { config } from "@/config";

export default class BaseException extends Error {
  constructor(
    message: string,
    private statusCode: number,
  ) {
    super(message);
  }

  report(res: Response) {
    let reply: Record<string, string | undefined> = { message: this.message };

    if (config.production) {
      this.statusCode = 500;
      reply = { ...reply, error: this.stack };
    }

    res.status(this.statusCode).json(reply);
  }
}
