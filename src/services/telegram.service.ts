import { Template, TemplateInput } from "@/entities/template.entity";
import { TelegramMessage } from "@/models/telegram.model";
import { List } from "@/utils/list.util";
import { injectable, singleton } from "tsyringe";
import { config } from "@/config";
import axios from "axios";

@injectable()
@singleton()
export default class TelegramService {
    private readonly baseUrl = `https://api.telegram.org/bot${config.botToken}`;

    public async sendMessage(template: Pick<Template, "id" | "content"> & Pick<TemplateInput, "chat_id" | "group_id" | "channel_id">): Promise<TelegramMessage> {
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

    public async sendMessages(templates: (Pick<Template, "id" | "content"> & Pick<TemplateInput, "chat_id" | "group_id" | "channel_id">)[]): Promise<Record<number, TelegramMessage[]>> {
        const results = (await Promise.all(templates.map((template) => this.sendMessage(template)))).reduce((acc, msg) => {
            acc[msg.group_id] ??= [] as TelegramMessage[];

            acc[msg.group_id].push(msg);

            return acc;
        }, {} as Record<number, TelegramMessage[]>);

        return results;
    }
}