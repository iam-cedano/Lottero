import { MessageData } from "@/models/group.model";

export default interface SendMessageInterface {
  sendMessage(data: MessageData): Promise<void>;
}
