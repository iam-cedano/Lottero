import { MessageData } from "@/models/message.model";
import { inject, injectable } from "tsyringe";
import GroupDomain from "@/domains/group.domain";
import ValidationException from "@/exceptions/validation.exception";
import TemplateService from "@/services/template.service";
import TelegramService from "@/services/telegram.service";
import Spelling from "@/utils/spelling.util";
import GroupMessageService from "@/services/group-message.service";
import ChannelMessageService from "@/services/channel-message.service";

@injectable()
export default class MessagesService {
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

        const groups = telegramMessages.reduce((acc, tgMessage) => {
            const { group_id, channel_id, status, telegram_message_id } = tgMessage;

            if (!status) return acc;

            if (telegram_message_id == null) {
                console.error(`Telegram message ID is missing for group ${group_id} and channel ${channel_id}`);
                return acc;
            }

            acc[group_id] ??= {};
            acc[group_id][channel_id] = telegram_message_id;

            return acc;
        }, {} as Record<number, { [channel_id: number]: number }>);

        for (const [groupIdStr, channels] of Object.entries(groups)) {
            const groupFromDb = await this.groupMessageService.createGroupMessage({
                group_id: Number(groupIdStr),
                created: new Date(),
                data,
            });

            for (const [channelIdStr, telegram_message_id] of Object.entries(channels)) {
                await this.channelMessageService.createChannelMessage({
                    group_message_id: groupFromDb.id,
                    channel_id: Number(channelIdStr),
                    telegram_message_id,
                });
            }
        }

        return telegramMessages.sortByStatus();
    }
}
