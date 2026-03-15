export interface GroupStatistic {
  id: number;
  group_id: number;
  the_date: Date;
  data: Record<string, unknown>;
}
