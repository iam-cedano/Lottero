export interface CreateMessageRequest {
  content: string;
  action: string;
}

export interface UpdateMessageRequest {
  content?: string;
  action?: string;
}
