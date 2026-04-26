export interface CreateGroupRequest {
  casino_id: number;
  game_id: number;
  strategy: string;
  strategy_alias: string;
  status: boolean;
}

export interface UpdateGroupRequest {
  casino_id: number;
  game_id: number;
  strategy: string;
  strategy_alias: string;
  status: boolean;
}
