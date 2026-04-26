import { MessageData } from "@/models/message.model";

export default interface DeleteMessageInterface {
  deleteMessage(data: MessageData): Promise<void>;
}
