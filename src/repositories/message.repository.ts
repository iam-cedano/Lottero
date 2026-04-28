import { ChannelMessage } from "@/entities/channel-message.entity";
import { GroupMessage } from "@/entities/group-message.entity";
import BaseRepository from "@/repositories/base.repository";

export default class MessageRepository extends BaseRepository<GroupMessage | ChannelMessage> {


}