import { Template, TemplateInput } from "@/entities/template.entity";
import { TelegramMessage } from "@/models/telegram.model";
import { injectable, singleton } from "tsyringe";
import { config } from "@/config";
import axios from "axios";

export interface SendMessagePayload {
    id: Template["id"];
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
}