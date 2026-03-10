export interface CreateChannelRequest {
  channel_group_id: number;
  language: string;
  chat_id: string;
  status?: boolean;
}
