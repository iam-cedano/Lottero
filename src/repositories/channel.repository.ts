import { Pool } from "pg";
import { injectable, inject } from "tsyringe";
import BaseRepository from "@/repositories/base.repository";
import { Channel } from "@/entities/channel.entity";

@injectable()
export default class ChannelRepository extends BaseRepository<Channel> {
  constructor(@inject("PgPool") pool: Pool) {
    super(pool, "channels");
  }

  async findByChannelGroupId(channelGroupId: number): Promise<Channel[]> {
    const result = await this.pool.query(
      `SELECT * FROM ${this.tableName} WHERE channel_group_id = $1`,
      [channelGroupId],
    );
    return result.rows;
  }

  async findByChannelGroupIdAndLanguage(
    channelGroupId: number,
    language: string,
  ): Promise<Channel | null> {
    const result = await this.pool.query(
      `SELECT * FROM ${this.tableName} WHERE channel_group_id = $1 AND language = $2`,
      [channelGroupId, language],
    );
    return result.rows[0] || null;
  }
}
