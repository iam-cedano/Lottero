import { Pool } from "pg";
import { injectable, inject } from "tsyringe";
import BaseRepository from "@/repositories/base.repository";
import { Message } from "@/entities/message.entity";

@injectable()
export default class MessageRepository extends BaseRepository<Message> {
  constructor(@inject("PgPool") pool: Pool) {
    super(pool, "messages");
  }
}
