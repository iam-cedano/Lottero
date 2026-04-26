export interface Template {
  id: number;
  group_id: number;
  channel_id: number;
  name: string;
  language: string;
  content: string;
}

export interface TemplateInput {
  id: number;
  group_id: number;
  channel_id: number;
  content: string;
  chat_id: string;
}