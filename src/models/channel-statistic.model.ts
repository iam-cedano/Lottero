export interface CreateChannelStatisticRequest {
  channel_id: number;
  the_date: string;
  data: Record<string, any>;
}

export interface UpdateChannelStatisticRequest {
  channel_id?: number;
  the_date?: string;
  data?: Record<string, any>;
}
