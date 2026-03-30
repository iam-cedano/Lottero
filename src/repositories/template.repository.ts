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

  async findByCasinoIdAndGroupIdAndStrategyAndCommand(
    casinoId: number,
    groupId: number,
    strategy: string,
    command: string
  ): Promise<Pick<Template, "id" | "channel_id" | "name" | "content">[]> {
    const result = await this.pool.query(
      `SELECT t.id, c.chat_id, t.name, t.content FROM channels_groups cg
	    INNER JOIN groups g ON cg.group_id = g.id
	    INNER JOIN channels c ON cg.channel_id = c.id
	    INNER JOIN templates t ON c.id = t.channel_id AND g.id = t.group_id 
      INNER JOIN casinos ca ON ca.id = g.casino_id
      WHERE ca.id = $1 AND g.id = $2 AND ca.strategy = $3 AND t.name = $4`,
      [casinoId, groupId, strategy, command]
    );

    return result.rows;
  }

  async findByCasinoIdAndType(casinoId: number, type: string): Promise<(Pick<Template, "id" | "channel_id" | "group_id" | "content"> & { chat_id: string })[]> {
    const result = await this.pool.query(
      `SELECT t.id, c.chat_id, t.group_id, t.content FROM channels_groups cg
	    INNER JOIN groups g ON cg.group_id = g.id
	    INNER JOIN channels c ON cg.channel_id = c.id
	    INNER JOIN templates t ON c.id = t.channel_id AND g.id = t.group_id 
      INNER JOIN casinos ca ON ca.id = g.casino_id
      WHERE ca.id = $1 AND t.name = $2`,
      [casinoId, type]
    );

    return result.rows;
  }
}
