export interface MessageRequest {
  group: string;
  action: string;
  data: object;
}

export interface EditMessageRequest {
  group: string;
  data: object;
}

export interface DeleteMessageRequest {
  group: string;
  data: object;
}

export interface CreateGroupRequest {
  casino_id: number;
  game_id: number;
  strategy?: string;
  status?: boolean;
}
