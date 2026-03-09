import { injectable } from "tsyringe";
import CasinoRepository from "@/repositories/casino.repository";
import { Casino } from "@/entities/casino.entity";

@injectable()
export default class CasinoService {
  constructor(private readonly casinoRepository: CasinoRepository) {}

  async createCasino(data: Partial<Casino>): Promise<Casino> {
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
    return this.casinoRepository.update(id, data);
  }

  async deleteCasino(id: number): Promise<boolean> {
    return this.casinoRepository.delete(id);
  }
}
