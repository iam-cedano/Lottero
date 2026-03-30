import { Pool } from "pg";
import { injectable, inject } from "tsyringe";
import BaseRepository from "@/repositories/base.repository";
import { ChannelsGroups } from "@/entities/channels-groups.entity";
import { Channel } from "@/entities/channel.entity";

@injectable()
export default class ChannelsGroupsRepository extends BaseRepository<ChannelsGroups> {
  constructor(@inject("PgPool") pool: Pool) {
    super(pool, "channels_groups");
  }

  async findByGroupId(groupId: number): Promise<ChannelsGroups[]> {
    const result = await this.pool.query(
      `SELECT * FROM ${this.tableName} WHERE group_id = $1`,
      [groupId],
    );
    return result.rows;
  }

  async findByChannelId(channelId: number): Promise<ChannelsGroups[]> {
    const result = await this.pool.query(
      `SELECT * FROM ${this.tableName} WHERE channel_id = $1`,
      [channelId],
    );
    return result.rows;
  }

  async findByGroupIdAndChannelId(groupId: number, channelId: number): Promise<ChannelsGroups | null> {
    const result = await this.pool.query(
      `SELECT * FROM ${this.tableName} WHERE group_id = $1 AND channel_id = $2`,
      [groupId, channelId],
    );
    return result.rows[0] || null;
  }

  async deleteByGroupIdAndChannelId(groupId: number, channelId: number): Promise<boolean> {
    const result = await this.pool.query(
      `DELETE FROM ${this.tableName} WHERE group_id = $1 AND channel_id = $2`,
      [groupId, channelId],
    );
    return (result.rowCount ?? 0) > 0;
  }

  async findChannelsByGroupIds(groupIds: number[]): Promise<(Pick<Channel, "id" | "chat_id">)[]> {
    const setOfGroupsIds = [...new Set(groupIds)];

    const result = await this.pool.query(
      `SELECT c.id, c.chat_id FROM ${this.tableName} cg
			  INNER JOIN groups g ON cg.group_id = g.id
			  INNER JOIN channels c ON cg.channel_id = c.id
        WHERE cg.group_id = ANY($1::int[])`,
      [setOfGroupsIds]
    );

    return result.rows;
  }

  async findChannelsByGroupIdsAndGameIdAndStrategy(groupIds: number[], gameId: number, strategy: string): Promise<Pick<Channel, "id" | "chat_id">[]> {
    const result = await this.pool.query(
      `SELECT c.id, c.chat_id FROM ${this.tableName} cg
        INNER JOIN groups g ON cg.group_id = g.id
        INNER JOIN channels c ON cg.channel_id = c.id
        WHERE cg.group_id = ANY($1::int[])
          AND g.game_id = $2
          AND g.strategy = $3`,
      [groupIds, gameId, strategy]
    );

    return result.rows;
  }

  async findChannelsByGroupIdsAndGameId(groupIds: number[], gameId: number): Promise<Pick<Channel, "id" | "chat_id">[]> {
    const result = await this.pool.query(
      `SELECT c.id, c.chat_id FROM ${this.tableName} cg
        INNER JOIN groups g ON cg.group_id = g.id
        INNER JOIN channels c ON cg.channel_id = c.id
        WHERE cg.group_id = ANY($1::int[])
          AND g.game_id = $2`,
      [groupIds, gameId]
    );

    return result.rows;
  }
}
