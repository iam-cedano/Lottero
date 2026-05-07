export interface GroupMessage {
  id: number;
  group_id: number;
  data: Record<string, unknown>;
  created: Date;
}

export interface MessageFromGroup {
  channel_id: string;
  telegram_message_id: number;
}