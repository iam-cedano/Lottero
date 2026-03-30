import { Pool } from "pg";
import { injectable, inject } from "tsyringe";
import BaseRepository from "@/repositories/base.repository";
import { GroupStatistic } from "@/entities/group-statistic.entity";

@injectable()
export default class GroupStatisticRepository extends BaseRepository<GroupStatistic> {
  constructor(@inject("PgPool") pool: Pool) {
    super(pool, "group_statistics");
  }
}
