import { inject, injectable } from "tsyringe";
import { Game } from "@/entities/game.entity";
import GameRepository from "@/repositories/game.repository";
import GameDomain from "@/domains/game.domain";
import ConflictException from "@/exceptions/conflict.exception";
import ValidationException from "@/exceptions/validation.exception";

@injectable()
export default class GameService {
  constructor(
    @inject(GameRepository) private readonly gameRepository: GameRepository,
  ) {}

  async createGame(data: Partial<Game>): Promise<Game> {
    const existing = await this.gameRepository.findByName(data.name!);

    if (existing) {
      throw new ConflictException("Game name already registered");
    }

    if (!GameDomain.doesHaveValidName(data.name!)) {
      throw new ValidationException(
        "Name cannot contain numbers, capitalized and special characters (except for underscores)",
      );
    }

    return this.gameRepository.create(data);
  }

  async getGames(): Promise<Game[]> {
    return this.gameRepository.findAll();
  }

  async getGameById(id: number): Promise<Game | null> {
    return this.gameRepository.findById(id);
  }

  async updateGame(id: number, data: Partial<Game>): Promise<Game | null> {
    const existing = await this.gameRepository.findById(id);

    if (!existing) {
      throw new ConflictException("Game not found");
    }

    if (data.name && !GameDomain.doesHaveValidName(data.name)) {
      throw new ValidationException(
        "Name cannot contain numbers, capitalized and special characters (except for underscores)",
      );
    }

    return this.gameRepository.update(id, { ...existing, ...data });
  }

  async deleteGame(id: number): Promise<boolean> {
    const existing = await this.gameRepository.findById(id);

    if (!existing) {
      throw new ConflictException("Game not found");
    }

    return this.gameRepository.delete(id);
  }
}
