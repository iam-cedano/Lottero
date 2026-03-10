import { injectable } from "tsyringe";
import MessageRepository from "@/repositories/message.repository";
import { Message } from "@/entities/message.entity";

@injectable()
export default class MessageService {
  constructor(private readonly messageRepository: MessageRepository) {}

  async createMessage(data: Partial<Message>): Promise<Message> {
    return this.messageRepository.create(data);
  }

  async getMessages(): Promise<Message[]> {
    return this.messageRepository.findAll();
  }

  async getMessageById(id: number): Promise<Message | null> {
    return this.messageRepository.findById(id);
  }

  async updateMessage(
    id: number,
    data: Partial<Message>,
  ): Promise<Message | null> {
    return this.messageRepository.update(id, data);
  }

  async deleteMessage(id: number): Promise<boolean> {
    return this.messageRepository.delete(id);
  }
}
