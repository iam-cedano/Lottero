import DeleteMessageInterface from "@/interfaces/delete-message.interface";
import EditMessageInterface from "@/interfaces/edit-message.interface";
import SendMessageInterface from "@/interfaces/send-message.interface";
import GroupRepository from "@/repositories/group.repository";
import { MessageData } from "@/models/group.model";

export default abstract class ReportingServiceAbstract
  implements SendMessageInterface, EditMessageInterface, DeleteMessageInterface
{
  public constructor(
    private groupRepository: GroupRepository,
    private casino: string,
    private game?: string,
    private strategy?: string,
  ) {}

  public abstract sendMessage(data: MessageData): Promise<void>;
  public abstract editMessage(data: MessageData): Promise<void>;
  public abstract deleteMessage(data: MessageData): Promise<void>;

  protected async getChannels(): Promise<string[]> {
    throw new Error("Not implemented yet.");
  }
}
