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

        for (const [groupIdStr, channels] of Object.entries(telegramMessages)) {
            const groupFromDb = await this.groupMessageService.createGroupMessage({
                group_id: Number(groupIdStr),
                created: new Date(),
                data,
            });


            for (const channelMessage of channels) {
                if (!channelMessage.status) continue;


                await this.channelMessageService.createChannelMessage({
                    group_message_id: groupFromDb.id,
                    channel_id: Number(channelMessage.channel_id),
                    telegram_message_id: Number(channelMessage.telegram_message_id),
                });
            }
        }

        return telegramMessages;
    }

    async editMessage(_groupMessageId: number, _newData: MessageData) {
        throw new Error("Edit message functionality is not implemented yet");
    }
}
