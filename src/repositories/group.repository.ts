import { Pool } from "pg";
import { injectable, inject } from "tsyringe";
import BaseRepository from "@/repositories/base.repository";
import { Group } from "@/entities/group.entity";

@injectable()
export default class GroupRepository extends BaseRepository<Group> {
  constructor(@inject("PgPool") pool: Pool) {
    super(pool, "groups");
  }

  async findByCasinoId(casinoId: number): Promise<Group[]> {
    const result = await this.pool.query(
      `SELECT * FROM ${this.tableName} WHERE casino_id = $1`,
      [casinoId],
    );
    return result.rows;
  }
}
