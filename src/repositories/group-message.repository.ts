import { Pool } from "pg";
import { injectable, inject } from "tsyringe";
import BaseRepository from "@/repositories/base.repository";
import { GroupMessage, MessageFromGroup } from "@/entities/group-message.entity";

@injectable()
export default class GroupMessageRepository extends BaseRepository<GroupMessage> {
  constructor(@inject("PgPool") pool: Pool) {
    super(pool, "group_messages");
  }

  async getChannelMessagesById(id: number): Promise<MessageFromGroup[]> {
    const result = await this.pool.query(
      `SELECT c.chat_id, cm.telegram_message_id FROM group_messages gm 
	      INNER JOIN channel_messages cm ON gm.id = cm.group_message_id
	      INNER JOIN channels c ON cm.channel_id  = c.id
        WHERE gm.id = $1`,
      [id]
    );

    return result.rows;
  }
}
