import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import { CreateCasinoRequest } from "@/models/casino.model";
import CasinoService from "@/services/casino.service";
import UrlParser from "@/utils/url-parser.util";
import ValidationException from "@/exceptions/validation.exception";
import BaseException from "@/exceptions/base.exception";
import CasinoDomain from "@/domains/casino.domain";

@injectable()
export default class CasinoController {
  constructor(
    @inject(CasinoService) private readonly casinoService: CasinoService,
  ) {}

  public createCasino = async (
    req: Request<Record<string, string>, unknown, CreateCasinoRequest>,
    res: Response,
  ): Promise<void> => {
    try {
      const { name, alias, url } = req.body;

      if (!name || !url) {
        throw new ValidationException("Missing name or url");
      }

      const casino = await this.casinoService.createCasino({
        name,
        alias,
        url,
      });

      res.status(201).json(casino);
    } catch (error) {
      if (!(error instanceof BaseException)) {
        res.status(500).json({ message: "An error has occured" });
        return;
      }

      error.report(res);
    }
  };

  public getCasinos = async (_req: Request, res: Response): Promise<void> => {
    try {
      const casinos = await this.casinoService.getCasinos();
      res.status(200).json(casinos);
    } catch (error) {
      if (!(error instanceof BaseException)) {
        res.status(500).json({ message: "An error has occured" });
        return;
      }

      error.report(res);
    }
  };

  public getCasinoById = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id as string, 10);
      if (isNaN(id)) {
        throw new ValidationException("Parameter ID is missing");
      }
      const casino = await this.casinoService.getCasinoById(id);
      if (!casino) {
        res.status(404).json({ message: "Casino not found" });
        return;
      }
      res.status(200).json(casino);
    } catch (error) {
      if (!(error instanceof BaseException)) {
        res.status(500).json({ message: "An error has occured" });
        return;
      }

      error.report(res);
    }
  };

  public updateCasino = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id as string, 10);

      if (isNaN(id)) {
        throw new ValidationException("Parameter ID is missing");
      }

      const requestBody = req.body;
      const updatedCasino = await this.casinoService.updateCasino(
        id,
        requestBody,
      );

      res.status(200).json(updatedCasino);
    } catch (error) {
      if (!(error instanceof BaseException)) {
        res.status(500).json({ message: "An error has occured" });
        return;
      }

      error.report(res);
    }
  };

  public deleteCasino = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id as string, 10);
      if (isNaN(id)) {
        throw new ValidationException("Parameter ID is missing");
      }

      await this.casinoService.deleteCasino(id);

      res.status(204).send();
    } catch (error) {
      if (!(error instanceof BaseException)) {
        res.status(500).json({ message: "An error has occured" });
        return;
      }

      error.report(res);
    }
  };
}
