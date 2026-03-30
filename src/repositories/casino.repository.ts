import { Pool } from "pg";
import { injectable, inject } from "tsyringe";
import BaseRepository from "@/repositories/base.repository";
import { Casino } from "@/entities/casino.entity";

@injectable()
export default class CasinoRepository extends BaseRepository<Casino> {
  constructor(@inject("PgPool") pool: Pool) {
    super(pool, "casinos");
  }

  async findByName(name: string): Promise<Casino | null> {
    const result = await this.pool.query(
      `SELECT * FROM ${this.tableName} WHERE name = $1`,
      [name],
    );
    return result.rows[0] ?? null;
  }
}
