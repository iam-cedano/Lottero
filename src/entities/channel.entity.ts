export interface Channel {
  id: number;
  language: string;
  chat_id: string;
  status: boolean;
  groups?: {
    casino_id: number;
    game_id: number;
    strategy?: string;
    status: boolean;
  }[];
}
