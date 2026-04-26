export interface TelegramMessage {
    status: boolean;
    group_id: number;
    channel_id: number;
    telegram_chat_id: string;
    reason?: string;
    telegram_message_id?: number;
}