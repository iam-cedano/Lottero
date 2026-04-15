export interface Template {
  id: number;
  channel_id: number;
  group_id: number;
  name: string;
  language: string;
  content: string;
}

export interface TemplateInput {
  id: number;
  channel_id: number;
  content: string;
  chat_id: string;
}