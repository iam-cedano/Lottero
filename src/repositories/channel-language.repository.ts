import { Pool } from "pg";
import { injectable, inject } from "tsyringe";
import BaseRepository from "@/repositories/base.repository";
import { ChannelLanguage } from "@/entities/channel-language.entity";

@injectable()
export default class ChannelLanguageRepository extends BaseRepository<ChannelLanguage> {
  constructor(@inject("PgPool") pool: Pool) {
    super(pool, "channel_languages");
  }

  async findByChannelId(channelId: number): Promise<ChannelLanguage[]> {
    const result = await this.pool.query(
      `SELECT * FROM ${this.tableName} WHERE channel_id = $1`,
      [channelId],
    );
    return result.rows;
  }

  async findByChannelIdAndLanguage(
    channelId: number,
    language: string,
  ): Promise<ChannelLanguage | null> {
    const result = await this.pool.query(
      `SELECT * FROM ${this.tableName} WHERE channel_id = $1 AND language = $2`,
      [channelId, language],
    );
    return result.rows[0] || null;
  }
}
