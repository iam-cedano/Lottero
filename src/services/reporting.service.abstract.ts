import DeleteMessageInterface from "@/interfaces/delete-message.interface";
import EditMessageInterface from "@/interfaces/edit-message.interface";
import SendMessageInterface from "@/interfaces/send-message.interface";
import { MessageData } from "@/models/group.model";

export default abstract class ReportingServiceAbstract
  implements SendMessageInterface, EditMessageInterface, DeleteMessageInterface
{
  public abstract sendMessage(data: MessageData): Promise<void>;
  public abstract editMessage(data: MessageData): Promise<void>;
  public abstract deleteMessage(data: MessageData): Promise<void>;
}
