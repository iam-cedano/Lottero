import { Pool } from "pg";
import { injectable, inject } from "tsyringe";
import BaseRepository from "@/repositories/base.repository";
import { ChannelMessage } from "@/entities/channel-message.entity";

@injectable()
export default class ChannelMessageRepository extends BaseRepository<ChannelMessage> {
  constructor(@inject("PgPool") pool: Pool) {
    super(pool, "channel_messages");
  }

  async findByGroupId(
    groupId: number,
  ): Promise<ChannelMessage[]> {
    const result = await this.pool.query(
      `SELECT * FROM ${this.tableName} WHERE group_id = $1`,
      [groupId],
    );
    return result.rows;
  }

  async findByGroupMessageId(
    groupMessageId: number,
  ): Promise<ChannelMessage[]> {
    const result = await this.pool.query(
      `SELECT * FROM ${this.tableName} WHERE group_message_id = $1`,
      [groupMessageId],
    );
    return result.rows;
  }
}
