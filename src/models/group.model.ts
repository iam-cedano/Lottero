export interface MessageData {
  command?: string;
  [key: string]: unknown;
}

export interface MessageRequest {
  channel?: string;
  data?: MessageData;
}

export interface EditMessageRequest {
  channel?: string;
  data?: MessageData;
}

export interface DeleteMessageRequest {
  channel?: string;
  data?: MessageData;
}

export interface CreateGroupRequest {
  casino_id: number;
  game_id: number;
  strategy?: string;
  status?: boolean;
}
