import { Pool } from "pg";
import { injectable, inject } from "tsyringe";
import BaseRepository from "@/repositories/base.repository";
import { ChannelUrl } from "@/entities/channel-url.entity";

@injectable()
export default class ChannelUrlRepository extends BaseRepository<ChannelUrl> {
  constructor(@inject("PgPool") pool: Pool) {
    super(pool, "channel_urls");
  }

  async findByChannelId(channelId: number): Promise<ChannelUrl[]> {
    const result = await this.pool.query(
      `SELECT * FROM ${this.tableName} WHERE channel_id = $1`,
      [channelId],
    );
    return result.rows;
  }

  async findByChannelIdAndLanguage(
    channelId: number,
    language: string,
  ): Promise<ChannelUrl | null> {
    const result = await this.pool.query(
      `SELECT * FROM ${this.tableName} WHERE channel_id = $1 AND language = $2`,
      [channelId, language],
    );
    return result.rows[0] || null;
  }
}
