import { Pool } from "pg";
import { injectable, inject } from "tsyringe";
import BaseRepository from "@/repositories/base.repository";
import { Group } from "@/entities/group.entity";
import { Channel } from "@/entities/channel.entity";
import { PartiesIndex } from "@/entities/party.entity";

@injectable()
export default class GroupRepository extends BaseRepository<Group> {
  constructor(@inject("PgPool") pool: Pool) {
    super(pool, "groups");
  }

  async findByCasinoId(casinoId: number): Promise<Group[]> {
    const result = await this.pool.query(
      `SELECT * FROM ${this.tableName} WHERE casino_id = $1`,
      [casinoId],
    );
    return result.rows;
  }

  async findByCasinoAndGame(casino: string, game: string): Promise<Channel[]> {
    const query = `SELECT c.id as channel_id, c.chat_id FROM ${this.tableName} g 
    INNER JOIN channel_groups cg ON g.id = cg.group_id 
    INNER JOIN channels c ON cg.channel_id = c.id 
    INNER JOIN casinos ca ON g.casino_id = ca.id 
    INNER JOIN games ga ON g.game_id = ga.id 
    WHERE ca.name = $1 AND ga.name = $2`;

    const result = await this.pool.query(query, [casino, game]);

    return result.rows;
  }

  async getParties(): Promise<PartiesIndex> {
    const query = `
      WITH channel_objects AS (
        SELECT
          chg.group_id,
          ch.chat_id,
          COALESCE(
            (
              SELECT jsonb_object_agg(t.name, t.content)
              FROM templates t
              WHERE t.channel_id = ch.id AND t.group_id = chg.group_id
            ),
            '{}'::jsonb
          ) AS channel_data
        FROM channels_groups chg
        INNER JOIN channels ch ON ch.id = chg.channel_id
      )
      SELECT
        ca.name AS casino_name,
        ga.name AS game_name,
        g.strategy,
        jsonb_object_agg(co.chat_id, co.channel_data) AS channels
      FROM channel_objects co
      JOIN groups g ON g.id = co.group_id
      JOIN casinos ca ON ca.id = g.casino_id
      JOIN games ga ON ga.id = g.game_id
      GROUP BY co.group_id, g.strategy, ca.name, ga.name;
    `;

    const result = await this.pool.query(query);
    const index: PartiesIndex = {};

    for (const row of result.rows) {
      const casinoName = row.casino_name as string;
      const gameName = row.game_name as string;
      const strategyName = String(row.strategy ?? "");
      const raw = (row.channels ?? {}) as Record<string, Record<string, string>>;
      const channels = Object.fromEntries(
        Object.entries(raw).map(([chatId, data]) => [chatId, data]),
      );

      if (!index[casinoName]) index[casinoName] = {};
      if (!index[casinoName][gameName]) index[casinoName][gameName] = {};
      index[casinoName][gameName][strategyName] = channels;
    }

    return index;
  }
}
