import { Template, TemplateInput } from "@/entities/template.entity";

export interface TelegramMessage {
    status: boolean;
    group_id: number;
    channel_id: number;
    telegram_chat_id: string;
    reason?: string;
    telegram_message_id?: number;
}

export interface SendMessagePayload {
    content: Template["content"];
    chat_id: TemplateInput["chat_id"];
    group_id: TemplateInput["group_id"];
    channel_id: TemplateInput["channel_id"];
}

export interface EditMessagePayload {
    content: Template["content"];
    chat_id: TemplateInput["chat_id"];
    group_id: TemplateInput["group_id"];
    channel_id: TemplateInput["channel_id"];
}