import { MessageData } from "@/models/group.model";

export default interface DeleteMessageInterface {
  deleteMessage(data: MessageData): Promise<void>;
}
