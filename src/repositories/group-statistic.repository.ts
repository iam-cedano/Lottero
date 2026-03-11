import { Pool } from "pg";
import { injectable, inject } from "tsyringe";
import BaseRepository from "@/repositories/base.repository";
import { GroupStatistic } from "@/entities/group-statistic.entity";

@injectable()
export default class GroupStatisticRepository extends BaseRepository<GroupStatistic> {
  constructor(@inject("PgPool") pool: Pool) {
    super(pool, "group_statistics");
  }

  async findByGroupId(
    groupId: number,
  ): Promise<GroupStatistic[]> {
    const result = await this.pool.query(
      `SELECT * FROM ${this.tableName} WHERE group_id = $1`,
      [groupId],
    );
    return result.rows;
  }

  async findByGroupAndDate(
    groupId: number,
    date: Date,
  ): Promise<GroupStatistic | null> {
    const result = await this.pool.query(
      `SELECT * FROM ${this.tableName} WHERE group_id = $1 AND the_date = $2`,
      [groupId, date],
    );
    return result.rows[0] ?? null;
  }
}
