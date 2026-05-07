import { Pool } from "pg";
import { injectable, inject } from "tsyringe";
import BaseRepository from "@/repositories/base.repository";
import { GroupMessage } from "@/entities/group-message.entity";
import { ChannelMessage } from "@/entities/channel-message.entity";

@injectable()
export default class GroupMessageRepository extends BaseRepository<GroupMessage> {
  constructor(@inject("PgPool") pool: Pool) {
    super(pool, "group_messages");
  }

  async getChannelMessagesById(_id: number): Promise<ChannelMessage[]> {
    return [];
  }
}
