import { Pool } from "pg";
import { injectable, inject } from "tsyringe";
import BaseRepository from "@/repositories/base.repository";
import { Channel } from "@/entities/channel.entity";

@injectable()
export default class ChannelRepository extends BaseRepository<Channel> {
  constructor(@inject("PgPool") pool: Pool) {
    super(pool, "channels");
  }

  async findByGroupId(groupId: number): Promise<Channel[]> {
    const result = await this.pool.query(
      `SELECT c.* FROM ${this.tableName} c JOIN channels_groups cg ON c.id = cg.channel_id WHERE cg.group_id = $1`,
      [groupId],
    );
    return result.rows;
  }

  async findByGroupIdAndLanguage(
    groupId: number,
    language: string,
  ): Promise<Channel | null> {
    const result = await this.pool.query(
      `SELECT c.* FROM ${this.tableName} c JOIN channels_groups cg ON c.id = cg.channel_id WHERE cg.group_id = $1 AND c.language = $2`,
      [groupId, language],
    );
    return result.rows[0] || null;
  }

  async findAllWithGroup(): Promise<Channel[]> {
    const result = await this.pool.query(
      `SELECT c.*, 
        COALESCE(
          json_agg(
            json_build_object(
              'casino_id', g.casino_id, 
              'game_id', g.game_id, 
              'strategy', g.strategy, 
              'status', g.status
            )
          ) FILTER (WHERE g.id IS NOT NULL), '[]'
        ) as groups
       FROM ${this.tableName} c 
       LEFT JOIN channels_groups cg ON c.id = cg.channel_id 
       LEFT JOIN groups g ON cg.group_id = g.id
       GROUP BY c.id
       ORDER BY c.id ASC`
    );
    
    return result.rows.map((row) => {
      const channel = { ...row };
      if (channel.groups && channel.groups.length === 0) {
        delete channel.groups;
      }
      return channel;
    });
  }

  async findByIdWithGroup(id: number): Promise<Channel | null> {
    const result = await this.pool.query(
      `SELECT c.*, 
        COALESCE(
          json_agg(
            json_build_object(
              'casino_id', g.casino_id, 
              'game_id', g.game_id, 
              'strategy', g.strategy, 
              'status', g.status
            )
          ) FILTER (WHERE g.id IS NOT NULL), '[]'
        ) as groups
       FROM ${this.tableName} c 
       LEFT JOIN channels_groups cg ON c.id = cg.channel_id 
       LEFT JOIN groups g ON cg.group_id = g.id 
       WHERE c.id = $1
       GROUP BY c.id`,
      [id]
    );
    
    if (result.rows.length === 0) return null;
    
    const channel = { ...result.rows[0] };
    if (channel.groups && channel.groups.length === 0) {
      delete channel.groups;
    }
    
    return channel;
  }
}
