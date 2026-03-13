import { MessageData } from "@/models/group.model";

export default interface EditMessageInterface {
  editMessage(data: MessageData): Promise<void>;
}
