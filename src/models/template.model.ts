export interface CreateTemplateRequest {
  group_id: number;
  name: string;
  language: string;
  content: string;
}

export interface UpdateTemplateRequest {
  group_id: number;
  name: string;
  language: string;
  content: string;
}
