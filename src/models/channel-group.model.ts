export interface MessageRequest {
  channel_group: string;
  action: string;
  data: object;
}

export interface EditMessageRequest {
  channel_group: string;
  data: object;
}

export interface DeleteMessageRequest {
  channel_group: string;
  data: object;
}

export interface CreateChannelGroupRequest {
  casino_id: number;
  game_id: number;
  strategy?: string;
  status?: boolean;
}
