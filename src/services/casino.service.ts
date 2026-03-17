import { inject, injectable } from "tsyringe";
import { Casino } from "@/entities/casino.entity";
import CasinoRepository from "@/repositories/casino.repository";
import CasinoDomain from "@/domains/casino.domain";
import ConflictException from "@/exceptions/conflict.exception";
import ValidationException from "@/exceptions/validation.exception";
import UrlParser from "@/utils/url-parser.util";

@injectable()
export default class CasinoService {
  constructor(
    @inject(CasinoRepository)
    private readonly casinoRepository: CasinoRepository,
  ) {}

  async createCasino(data: Partial<Casino>): Promise<Casino> {
    const existing = await this.casinoRepository.findByName(data.name!);

    if (existing) {
      throw new ConflictException("Casino name already registered");
    }

    if (!CasinoDomain.doesHaveValidName(data.name!)) {
      throw new ValidationException(
        "Name cannot contain numbers, capitalized and special characters (except for underscores)",
      );
    }

    data.url = UrlParser.extractDomain(data.url!);

    return this.casinoRepository.create(data);
  }

  async getCasinos(): Promise<Casino[]> {
    return this.casinoRepository.findAll();
  }

  async getCasinoById(id: number): Promise<Casino | null> {
    return this.casinoRepository.findById(id);
  }

  async updateCasino(
    id: number,
    data: Partial<Casino>,
  ): Promise<Casino | null> {
    const existing = await this.casinoRepository.findById(id);

    if (!existing) {
      throw new ConflictException("Casino not found");
    }

    if (data.name && !CasinoDomain.doesHaveValidName(data.name)) {
      throw new ValidationException(
        "Name cannot contain numbers, capitalized and special characters (except for underscores)",
      );
    }

    if (data.url) {
      data.url = UrlParser.extractDomain(data.url);
    }

    return this.casinoRepository.update(id, { ...existing, ...data });
  }

  async deleteCasino(id: number): Promise<boolean> {
    const existing = await this.casinoRepository.findById(id);

    if (!existing) {
      throw new ConflictException("Casino not found");
    }

    return this.casinoRepository.delete(id);
  }
}
