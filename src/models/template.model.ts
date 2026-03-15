export interface CreateTemplateRequest {
  channel_id: number;
  group_id: number;
  name: string;
  content: string;
}

export interface UpdateTemplateRequest {
  group_id?: number;
  name?: string;
  content?: string;
}
