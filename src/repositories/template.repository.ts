import { Pool } from "pg";
import { injectable, inject } from "tsyringe";
import BaseRepository from "@/repositories/base.repository";
import { Template, TemplateInput } from "@/entities/template.entity";

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

  async findByCasinoIdAndType(casinoId: number, type: string): Promise<TemplateInput[]> {
    const result = await this.pool.query(
      `SELECT t.id AS id, g.id AS group_id, c.id AS channel_id, t.content , c.chat_id FROM channels_groups cg
	    INNER JOIN groups g ON cg.group_id = g.id
	    INNER JOIN channels c ON cg.channel_id = c.id
	    INNER JOIN templates t ON g.id = t.group_id AND t.language = c.language
      INNER JOIN casinos ca ON ca.id = g.casino_id
      WHERE ca.id = $1 AND t.name = $2`,
      [casinoId, type]
    );

    return result.rows;
  }

  async findByCasinoIdAndGameIdAndType(casinoId: number, gameId: number, type: string): Promise<TemplateInput[]> {
    const result = await this.pool.query(
      `SELECT t.id AS id, g.id AS group_id, c.id AS channel_id, t.content , c.chat_id FROM channels_groups cg
      INNER JOIN groups g ON cg.group_id = g.id
      INNER JOIN channels c ON cg.channel_id = c.id
      INNER JOIN templates t ON g.id = t.group_id AND t.language = c.language
      INNER JOIN casinos ca ON ca.id = g.casino_id
      INNER JOIN games ga ON ga.id = g.game_id
      WHERE ca.id = $1 AND ga.id = $2 AND t.name = $3`,
      [casinoId, gameId, type]
    );

    return result.rows;
  }

  async findByCasinoIdAndGameIdAndStrategyAndType(casinoId: number, gameId: number, strategy: string, type: string): Promise<TemplateInput[]> {
    const result = await this.pool.query(
      `SELECT t.id AS id, g.id AS group_id, c.id AS channel_id, t.content , c.chat_id FROM channels_groups cg
      INNER JOIN groups g ON cg.group_id = g.id
      INNER JOIN channels c ON cg.channel_id = c.id
      INNER JOIN templates t ON g.id = t.group_id AND t.language = c.language
      INNER JOIN casinos ca ON ca.id = g.casino_id
      INNER JOIN games ga ON ga.id = g.game_id
      WHERE ca.id = $1 AND ga.id = $2 AND g.strategy = $3 AND t.name = $4`,
      [casinoId, gameId, strategy, type]
    );

    return result.rows;
  }
}
