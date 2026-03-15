import { Pool } from "pg";
import { injectable, inject } from "tsyringe";
import BaseRepository from "@/repositories/base.repository";
import { Group } from "@/entities/group.entity";
import { Channel } from "@/entities/channel.entity";

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
}
