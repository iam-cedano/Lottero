export interface CreateChannelGroupStatisticRequest {
  channel_group_id: number;
  the_date: string;
  data: Record<string, any>;
}

export interface UpdateChannelGroupStatisticRequest {
  channel_group_id?: number;
  the_date?: string;
  data?: Record<string, any>;
}
