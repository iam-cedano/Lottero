import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import { CreateCasinoRequest } from "@/models/casino.model";
import CasinoService from "@/services/casino.service";
import UrlParser from "@/utils/url-parser.util";
import ValidationException from "@/exceptions/validation.exception";

@injectable()
export default class CasinoController {
  constructor(
    @inject(CasinoService) private readonly casinoService: CasinoService,
  ) {}

  public createCasino = async (
    req: Request<any, any, CreateCasinoRequest>,
    res: Response,
  ): Promise<void> => {
    try {
      const { name, alias, url } = req.body;

      if (!name || !url) {
        res.status(400).json({ message: "Missing name or url" });

        return;
      }

      if (!/^[\p{L}\s]+$/u.test(name)) {
        throw new ValidationException(
          "Name cannot contain numbers or special characters",
        );
      }

      if (/\p{Lu}/u.test(name)) {
        throw new ValidationException(
          "Name cannot contain capitalized characters",
        );
      }

      const domainUrl = UrlParser.extractDomain(url);
      const casino = await this.casinoService.createCasino({
        name,
        alias,
        url: domainUrl,
      });

      res.status(201).json(casino);
    } catch (error) {
      if (error instanceof ValidationException) {
        res.status(400).json({ message: error.message });
        return;
      }
      res.status(500).json({ message: "Failed to create casino", error });
    }
  };

  public getCasinos = async (_req: Request, res: Response): Promise<void> => {
    try {
      const casinos = await this.casinoService.getCasinos();
      res.status(200).json(casinos);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch casinos", error });
    }
  };

  public getCasinoById = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id as string, 10);
      if (isNaN(id)) {
        res.status(400).json({ message: "Invalid casino ID" });
        return;
      }
      const casino = await this.casinoService.getCasinoById(id);
      if (!casino) {
        res.status(404).json({ message: "Casino not found" });
        return;
      }
      res.status(200).json(casino);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch casino", error });
    }
  };

  public updateCasino = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id as string, 10);
      if (isNaN(id)) {
        res.status(400).json({ message: "Invalid casino ID" });
        return;
      }
      const { name, alias, url } = req.body;

      if (!name || !url) {
        res.status(400).json({ message: "Missing name or url" });

        return;
      }

      if (!/^[\p{L}\s]+$/u.test(name)) {
        throw new ValidationException(
          "Name cannot contain numbers or special characters",
        );
      }

      if (/\p{Lu}/u.test(name)) {
        throw new ValidationException(
          "Name cannot contain capitalized characters",
        );
      }

      const domainUrl = url ? UrlParser.extractDomain(url) : url;
      const updatedCasino = await this.casinoService.updateCasino(id, {
        name,
        alias,
        url: domainUrl,
      });
      if (!updatedCasino) {
        res.status(404).json({ message: "Casino not found" });
        return;
      }
      res.status(200).json(updatedCasino);
    } catch (error) {
      if (error instanceof ValidationException) {
        res.status(400).json({ message: error.message });
        return;
      }
      res.status(500).json({ message: "Failed to update casino", error });
    }
  };

  public deleteCasino = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id as string, 10);
      if (isNaN(id)) {
        res.status(400).json({ message: "Invalid casino ID" });
        return;
      }
      const success = await this.casinoService.deleteCasino(id);
      if (!success) {
        res.status(404).json({ message: "Casino not found" });
        return;
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete casino", error });
    }
  };
}
