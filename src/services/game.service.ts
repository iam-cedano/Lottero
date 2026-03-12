import { inject, injectable } from "tsyringe";
import GameRepository from "@/repositories/game.repository";
import { Game } from "@/entities/game.entity";

@injectable()
export default class GameService {
  constructor(
    @inject(GameRepository) private readonly gameRepository: GameRepository,
  ) {}

  async createGame(data: Partial<Game>): Promise<Game> {
    return this.gameRepository.create(data);
  }

  async getGames(): Promise<Game[]> {
    return this.gameRepository.findAll();
  }

  async getGameById(id: number): Promise<Game | null> {
    return this.gameRepository.findById(id);
  }

  async updateGame(id: number, data: Partial<Game>): Promise<Game | null> {
    return this.gameRepository.update(id, data);
  }

  async deleteGame(id: number): Promise<boolean> {
    return this.gameRepository.delete(id);
  }
}
