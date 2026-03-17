import { Pool } from "pg";
import { injectable, inject } from "tsyringe";
import BaseRepository from "@/repositories/base.repository";
import { Template } from "@/entities/template.entity";

@injectable()
export default class TemplateRepository extends BaseRepository<Template> {
  constructor(@inject("PgPool") pool: Pool) {
    super(pool, "templates");
  }

  async findByChannelId(channelId: number): Promise<Template[]> {
    const result = await this.pool.query(
      `SELECT * FROM ${this.tableName} WHERE channel_id = $1`,
      [channelId],
    );
    return result.rows;
  }

  async findByGroupId(groupId: number): Promise<Template[]> {
    const result = await this.pool.query(
      `SELECT * FROM ${this.tableName} WHERE group_id = $1`,
      [groupId],
    );

    return result.rows;
  }

  async findByChannelIdAndGroupId(
    channelId: number,
    groupId: number,
  ): Promise<Template | null> {
    const result = await this.pool.query(
      `SELECT * FROM ${this.tableName} WHERE channel_id = $1 AND group_id = $2`,
      [channelId, groupId],
    );

    return result.rows[0] || null;
  }

  async doesExistInChannelAndGroup(
    channelId: number,
    groupId: number,
    name: string,
  ): Promise<boolean> {
    const result = await this.pool.query(
      `SELECT EXISTS (SELECT * FROM ${this.tableName} WHERE channel_id = $1 AND group_id = $2 AND name = $3)`,
      [channelId, groupId, name],
    );

    return result.rows[0].exists;
  }
}
