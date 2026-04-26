export interface GroupMessage {
  id: number;
  group_id: number;
  data: Record<string, unknown>;
  created: Date;
}
