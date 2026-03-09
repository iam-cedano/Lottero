import { Pool } from "pg";
import { injectable, inject } from "tsyringe";
import BaseRepository from "@/repositories/base.repository";
import { ChannelStatistic } from "@/entities/channel-statistic.entity";

@injectable()
export default class ChannelStatisticRepository extends BaseRepository<ChannelStatistic> {
  constructor(@inject("PgPool") pool: Pool) {
    super(pool, "channel_statistics");
  }

  async findByChannelId(channelId: number): Promise<ChannelStatistic[]> {
    const result = await this.pool.query(
      `SELECT * FROM ${this.tableName} WHERE channel_id = $1`,
      [channelId],
    );
    return result.rows;
  }

  async findByChannelAndDate(
    channelId: number,
    date: Date,
  ): Promise<ChannelStatistic | null> {
    const result = await this.pool.query(
      `SELECT * FROM ${this.tableName} WHERE channel_id = $1 AND the_date = $2`,
      [channelId, date],
    );
    return result.rows[0] ?? null;
  }
}
