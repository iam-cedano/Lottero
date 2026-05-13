export interface GroupMessage {
  id: number;
  group_id: number;
  data: Record<string, unknown>;
  created: string;
}

export interface MessageFromGroup {
  chat_id: string;
  telegram_message_id: number;
}