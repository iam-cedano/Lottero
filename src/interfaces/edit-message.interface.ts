import { MessageData } from "@/models/message.model";

export default interface EditMessageInterface {
  editMessage(data: MessageData): Promise<void>;
}
