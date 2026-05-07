import { MessageData } from "@/models/message.model";
import { inject, injectable } from "tsyringe";
import GroupDomain from "@/domains/group.domain";
import ValidationException from "@/exceptions/validation.exception";
import TemplateService from "@/services/template.service";
import TelegramService from "@/services/telegram.service";
import Spelling from "@/utils/spelling.util";
import GroupMessageService from "@/services/group-message.service";
import ChannelMessageService from "@/services/channel-message.service";
import { TelegramMessage } from "@/models/telegram.model";

@injectable()
export default class MessageService {
    constructor(
        @inject(TelegramService) private readonly telegramService: TelegramService,
        @inject(TemplateService) private readonly templateService: TemplateService,
        @inject(GroupMessageService) private readonly groupMessageService: GroupMessageService,
        @inject(ChannelMessageService) private readonly channelMessageService: ChannelMessageService,
    ) { }

    async sendMessage(recipient: string, data: MessageData) {
        if (!GroupDomain.IsMessageValid({ recipient, data })) {
            throw new ValidationException("Invalid recipient or data format");
        }

        const [casino, game, strategy] = recipient.split("-");
        const { type } = data;

        const templatesRaw = await this.templateService.getTemplatesByFilter(casino, game, strategy, type);

        const templates = templatesRaw.map(template => {
            template.content = Spelling.replaceAll(template.content, data);

            return template;
        });

        const telegramMessages = await this.telegramService.sendMessages(templates);

        const groupsWithMessages: Record<number, { group_message_id: number, telegram_messages: Partial<TelegramMessage>[] }> = {};

        for (const telegramMessage of Object.values(telegramMessages)) {
            const { group_id, channel_id, reason, status, telegram_chat_id, telegram_message_id } = telegramMessage;

            if (!groupsWithMessages[group_id]) {
                const { id } = await this.groupMessageService.createGroupMessage({ group_id, data });

                groupsWithMessages[group_id] = { group_message_id: id, telegram_messages: [] };
            }

            if (status) {
                await this.channelMessageService.createChannelMessage({
                    group_message_id: groupsWithMessages[group_id].group_message_id,
                    channel_id,
                    telegram_message_id,
                });

                groupsWithMessages[group_id].telegram_messages.push({
                    status,
                    channel_id,
                    telegram_chat_id,
                    telegram_message_id,
                });

                continue;
            }

            groupsWithMessages[group_id].telegram_messages.push({
                status,
                channel_id,
                telegram_chat_id,
                reason,
            });
        }

        return groupsWithMessages;
    }

    async editMessage(_groupMessageId: number, _newData: MessageData) {
        throw new Error("Edit message functionality is not implemented yet");
    }
}
