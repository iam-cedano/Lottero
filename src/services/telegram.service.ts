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
}