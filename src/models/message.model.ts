export interface MessageData {
    [key: string]: string;
}

export interface MessageGroupRequest {
    recipient: string;
    data: MessageData;
}

export interface EditGroupMessageRequest {
    type: string;
    [key: string]: string;
}

export interface DeleteMessageRequest {
    recipient: string;
    data: MessageData;
}