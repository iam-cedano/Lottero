export interface CreateGroupMessageRequest {
  group_id: number;
  data?: Record<string, unknown>;
  created?: Date;
}

export interface UpdateGroupMessageRequest {
  group_id?: number;
  data?: Record<string, unknown>;
  created?: Date;
}
