export interface MessageRequest {
  channel: string;
  action: string;
  data: object;
}

export interface EditMessageRequest {
  channel: string;
  data: object;
}

export interface DeleteMessageRequest {
  channel: string;
  data: object;
}

export interface CreateChannelRequest {
  casino_id: number;
  game_id: number;
}
