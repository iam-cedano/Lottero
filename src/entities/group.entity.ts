export interface Group {
  id: number;
  casino_id: number;
  game_id: number;
  strategy: string;
  strategy_alias: string;
  created: Date;
  status: boolean;
}
