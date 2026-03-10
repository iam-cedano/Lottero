import { Pool } from "pg";
import { injectable, inject } from "tsyringe";
import BaseRepository from "@/repositories/base.repository";
import { ChannelGroup } from "@/entities/channel-group.entity";

@injectable()
export default class ChannelGroupRepository extends BaseRepository<ChannelGroup> {
  constructor(@inject("PgPool") pool: Pool) {
    super(pool, "channel_groups");
  }

  async findByCasinoId(casinoId: number): Promise<ChannelGroup[]> {
    const result = await this.pool.query(
      `SELECT * FROM ${this.tableName} WHERE casino_id = $1`,
      [casinoId],
    );
    return result.rows;
  }
}
