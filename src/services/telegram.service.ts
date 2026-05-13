import { DeletedTelegramMessage, DeleteMessagePayload, EditedTelegramMessage, EditMessagePayload, SendMessagePayload, SentTelegramMessage } from "@/models/telegram.model";
import { injectable, singleton } from "tsyringe";
import { config } from "@/config";
import axios from "axios";

@injectable()
@singleton()
export default class TelegramService {
    private readonly baseUrl = `https://api.telegram.org/bot${config.botToken}`;

    public async sendMessage(template: SendMessagePayload): Promise<SentTelegramMessage> {
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

    public async editMessage(template: EditMessagePayload): Promise<EditedTelegramMessage> {
        return axios
            .post(`${this.baseUrl}/editMessageText`, {
                chat_id: `@${template.chat_id}`,
                message_id: template.telegram_message_id,
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

    public async deleteMessage(template: DeleteMessagePayload): Promise<DeletedTelegramMessage> {
        return axios
            .post(`${this.baseUrl}/deleteMessage`, {
                chat_id: `@${template.chat_id}`,
                message_id: template.telegram_message_id,
            })
            .then((_) => ({
                status: true,
                telegram_chat_id: template.chat_id,
                telegram_message_id: template.telegram_message_id,
            }))
            .catch((_) => ({
                status: false,
                telegram_chat_id: template.chat_id,
                reason: "Could not delete message",
            }));
    }

    public async sendMessages(templates: SendMessagePayload[]): Promise<Record<number, SentTelegramMessage>> {
        return await Promise.all(templates.map((template) => this.sendMessage(template)));
    }

    public async editMessages(templates: EditMessagePayload[]): Promise<Record<number, EditedTelegramMessage>> {
        return await Promise.all(templates.map((template) => this.editMessage(template)));
    }

    public async deleteMessages(templates: DeleteMessagePayload[]): Promise<Record<number, DeletedTelegramMessage>> {
        return await Promise.all(templates.map((template) => this.deleteMessage(template)));
    }
}