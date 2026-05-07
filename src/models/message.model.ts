export interface MessageData {
    [key: string]: string;
}

export interface MessageRequest {
    recipient: string;
    data: MessageData;
}

export interface EditMessageRequest {
    channel: string;
    data: MessageData;
}

export interface DeleteMessageRequest {
    channel: string;
    data: MessageData;
}