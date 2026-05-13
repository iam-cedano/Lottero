import { inject, injectable } from "tsyringe";
import { DeleteMessagePayload, SentTelegramMessage } from "@/models/telegram.model";
import { EditGroupMessageRequest, MessageData } from "@/models/message.model";
import ValidationException from "@/exceptions/validation.exception";
import TemplateService from "@/services/template.service";
import TelegramService from "@/services/telegram.service";
import Spelling from "@/utils/spelling.util";
import GroupMessageService from "@/services/group-message.service";
import ChannelMessageService from "@/services/channel-message.service";
import Clock from "@/utils/clock.util";
import MessageDomain from "@/domains/message.domain";

@injectable()
export default class MessageService {
    constructor(
        @inject(TelegramService) private readonly telegramService: TelegramService,
        @inject(TemplateService) private readonly templateService: TemplateService,
        @inject(GroupMessageService) private readonly groupMessageService: GroupMessageService,
        @inject(ChannelMessageService) private readonly channelMessageService: ChannelMessageService,
        @inject(Clock) private readonly clock: Clock,
    ) { }

    async sendGroupMessage(recipient: string, data: MessageData) {
        if (!MessageDomain.IsChannelValid(recipient)) {
            throw new ValidationException("Invalid recipient format. Expected format: 'casino-game-strategy' or 'casino-game' or 'casino'.");
        }

        const [casino, game, strategy] = recipient.split("-");
        const now = this.clock.nowFormatted();
        const { type } = data;

        const templatesRaw = await this.templateService.getTemplatesByCasinoAndGameAndStrategyAndType(casino, game, strategy, type);

        const templates = templatesRaw.map(template => {
            template.content = Spelling.replaceAll(template.content, data);

            return template;
        });

        const telegramMessages = await this.telegramService.sendMessages(templates);

        const groupsWithMessages: Record<number, { group_message_id: number, telegram_messages: Partial<SentTelegramMessage>[] }> = {};

        for (const telegramMessage of Object.values(telegramMessages)) {
            const { group_id, channel_id, reason, status, telegram_chat_id, telegram_message_id } = telegramMessage;

            if (!groupsWithMessages[group_id]) {
                const { id } = await this.groupMessageService.createGroupMessage({ group_id, data, created: now });

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

    async editGroupMessage(groupMessageId: number, data: EditGroupMessageRequest) {
        const doesGroupMessageExist = await this.groupMessageService.getGroupMessageById(groupMessageId);

        if (!doesGroupMessageExist) {
            throw new ValidationException("Group message with the provided ID does not exist.");
        }

        const { type } = data;

        const templatesRaw = await this.templateService.getTemplatesByGroupIdAndType(groupMessageId, type);

        const templates = templatesRaw.map(template => {
            template.content = Spelling.replaceAll(template.content, data);

            return template;
        });

        const response = await this.telegramService.editMessages(templates);

        return response;
    }

    async deleteGroupMessage(groupMessageId: number) {
        const doesGroupMessageExist = await this.groupMessageService.getGroupMessageById(groupMessageId);

        if (!doesGroupMessageExist) {
            throw new ValidationException("Group message with the provided ID does not exist.");
        }

        const telegramMessages = await this.groupMessageService.getChannelMessagesById(groupMessageId);

        const deletePayloads: DeleteMessagePayload[] = telegramMessages.map((message) => ({
            chat_id: message.chat_id,
            telegram_message_id: message.telegram_message_id,
        }));

        await this.telegramService.deleteMessages(deletePayloads);

        return telegramMessages;
    }
}
