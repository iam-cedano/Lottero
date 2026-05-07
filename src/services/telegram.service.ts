import { EditMessagePayload, SendMessagePayload, TelegramMessage } from "@/models/telegram.model";
import { injectable, singleton } from "tsyringe";
import { config } from "@/config";
import axios from "axios";

@injectable()
@singleton()
export default class TelegramService {
    private readonly baseUrl = `https://api.telegram.org/bot${config.botToken}`;

    public async sendMessage(template: SendMessagePayload): Promise<TelegramMessage> {
        return axios
            .post(`${this.baseUrl}/sendMessage`, {
                chat_id: `@${template.chat_id}`,
                text: template.content,
                parse_mode: "HTML",
            })
            .then((response) => ({
                status: true,
                group_id: template.group_id,
                channel_id: template.channel_id,
                telegram_chat_id: template.chat_id,
                telegram_message_id: response.data.result.message_id,
            }))
            .catch((_) => ({
                status: false,
                group_id: template.group_id,
                channel_id: template.channel_id,
                telegram_chat_id: template.chat_id,
                reason: "Could not send message",
            }));
    }

    public async editMessage(template: EditMessagePayload, messageId: number): Promise<TelegramMessage> {
        return axios
            .post(`${this.baseUrl}/editMessageText`, {
                chat_id: `@${template.chat_id}`,
                message_id: messageId,
                text: template.content,
                parse_mode: "HTML",
            })
            .then((response) => ({
                status: true,
                group_id: template.group_id,
                channel_id: template.channel_id,
                telegram_chat_id: template.chat_id,
                telegram_message_id: response.data.result.message_id,
            }))
            .catch((_) => ({
                status: false,
                group_id: template.group_id,
                channel_id: template.channel_id,
                telegram_chat_id: template.chat_id,
                reason: "Could not edit message",
            }));
    }

    public async sendMessages(templates: SendMessagePayload[]): Promise<Record<number, TelegramMessage>> {
        return await Promise.all(templates.map((template) => this.sendMessage(template)));
    }

    public async editMessages(template: EditMessagePayload, messageIds: number[]): Promise<Record<number, TelegramMessage>> {
        return await Promise.all(messageIds.map((messageId) => this.editMessage(template, messageId)));
    }
}