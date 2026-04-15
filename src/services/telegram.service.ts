import { Template } from "@/entities/template.entity";
import { TelegramMessage } from "@/models/telegram.model";
import { injectable, singleton } from "tsyringe";

@injectable()
@singleton()
export default class TelegramService {
    public async sendMessage(_chatId: string, _message: string): Promise<TelegramMessage> {
        return {
            telegram_message_id: "1234567890"
        }
    }

    public async sendBunchOfMessages(_templates: (Pick<Template, "id" | "channel_id" | "content"> & { chat_id: string })[]): Promise<TelegramMessage[]> {
        const messages: TelegramMessage[] = [];

        for (const template of _templates) {
            const message = await this.sendMessage(template.chat_id, template.content);
            messages.push(message);
        }

        return messages;
    }
}