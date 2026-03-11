export interface CreateGroupMessageRequest {
  group_id: number;
  data?: any;
  created?: Date;
}

export interface UpdateGroupMessageRequest {
  group_id?: number;
  data?: any;
  created?: Date;
}
