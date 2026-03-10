export interface CreateGroupMessageRequest {
  channel_group_id: number;
  data?: any;
  created?: Date;
}

export interface UpdateGroupMessageRequest {
  channel_group_id?: number;
  data?: any;
  created?: Date;
}
