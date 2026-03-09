import { Pool } from "pg";
import { injectable, inject } from "tsyringe";
import BaseRepository from "@/repositories/base.repository";
import { Channel } from "@/entities/channel.entity";

@injectable()
export default class ChannelRepository extends BaseRepository<Channel> {
  constructor(@inject("PgPool") pool: Pool) {
    super(pool, "channels");
  }

  async findByCasinoId(casinoId: number): Promise<Channel[]> {
    const result = await this.pool.query(
      `SELECT * FROM ${this.tableName} WHERE casino_id = $1`,
      [casinoId],
    );
    return result.rows;
  }
}
