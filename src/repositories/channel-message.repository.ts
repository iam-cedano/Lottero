import { Pool } from "pg";
import { injectable, inject } from "tsyringe";
import BaseRepository from "@/repositories/base.repository";
import { ChannelMessage } from "@/entities/channel-message.entity";

@injectable()
export default class ChannelMessageRepository extends BaseRepository<ChannelMessage> {
  constructor(@inject("PgPool") pool: Pool) {
    super(pool, "channel_messages");
  }

  async findByChannelId(channelId: number): Promise<ChannelMessage[]> {
    const result = await this.pool.query(
      `SELECT * FROM ${this.tableName} WHERE channel_id = $1`,
      [channelId],
    );
    return result.rows;
  }

  async findByMessageId(messageId: number): Promise<ChannelMessage[]> {
    const result = await this.pool.query(
      `SELECT * FROM ${this.tableName} WHERE message_id = $1`,
      [messageId],
    );
    return result.rows;
  }
}
