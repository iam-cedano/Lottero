import { Pool } from "pg";
import { injectable, inject } from "tsyringe";
import BaseRepository from "@/repositories/base.repository";
import { ChannelsGroups } from "@/entities/channels-groups.entity";

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
}
