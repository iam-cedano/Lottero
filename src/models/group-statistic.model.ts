export interface CreateGroupStatisticRequest {
  group_id: number;
  the_date: string;
  data: Record<string, unknown>;
}

export interface UpdateGroupStatisticRequest {
  group_id: number;
  the_date: string;
  data: Record<string, unknown>;
}
