import { Pool } from "pg";
import { injectable, inject } from "tsyringe";
import BaseRepository from "@/repositories/base.repository";
import { ChannelGroupStatistic } from "@/entities/channel-group-statistic.entity";

@injectable()
export default class ChannelGroupStatisticRepository extends BaseRepository<ChannelGroupStatistic> {
  constructor(@inject("PgPool") pool: Pool) {
    super(pool, "channel_group_statistics");
  }

  async findByChannelGroupId(
    channelGroupId: number,
  ): Promise<ChannelGroupStatistic[]> {
    const result = await this.pool.query(
      `SELECT * FROM ${this.tableName} WHERE channel_group_id = $1`,
      [channelGroupId],
    );
    return result.rows;
  }

  async findByChannelGroupAndDate(
    channelGroupId: number,
    date: Date,
  ): Promise<ChannelGroupStatistic | null> {
    const result = await this.pool.query(
      `SELECT * FROM ${this.tableName} WHERE channel_group_id = $1 AND the_date = $2`,
      [channelGroupId, date],
    );
    return result.rows[0] ?? null;
  }
}
