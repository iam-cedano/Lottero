import { MessageData } from "@/models/message.model";

export default interface SendMessageInterface {
  sendMessage(data: MessageData): Promise<void>;
}
