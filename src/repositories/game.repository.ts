import { Pool } from "pg";
import { injectable, inject } from "tsyringe";
import BaseRepository from "@/repositories/base.repository";
import { Game } from "@/entities/game.entity";

@injectable()
export default class GameRepository extends BaseRepository<Game> {
  constructor(@inject("PgPool") pool: Pool) {
    super(pool, "games");
  }

  async findByName(name: string): Promise<Game | null> {
    const result = await this.pool.query(
      `SELECT * FROM ${this.tableName} WHERE name = $1`,
      [name],
    );
    return result.rows[0] ?? null;
  }
}
