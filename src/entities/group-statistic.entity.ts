export interface GroupStatistic {
  id: number;
  group_id: number;
  the_date: string;
  data: Record<string, unknown>;
}
