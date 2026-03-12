import { inject, injectable } from "tsyringe";
import GroupMessageRepository from "@/repositories/group-message.repository";
import { GroupMessage } from "@/entities/group-message.entity";

@injectable()
export default class GroupMessageService {
  constructor(
    @inject(GroupMessageRepository)
    private readonly groupMessageRepository: GroupMessageRepository,
  ) {}

  async createGroupMessage(data: Partial<GroupMessage>): Promise<GroupMessage> {
    return this.groupMessageRepository.create(data);
  }

  async getGroupMessages(): Promise<GroupMessage[]> {
    return this.groupMessageRepository.findAll();
  }

  async getMessageById(id: number): Promise<GroupMessage | null> {
    return this.groupMessageRepository.findById(id);
  }

  async updateGroupMessage(
    id: number,
    data: Partial<GroupMessage>,
  ): Promise<GroupMessage | null> {
    return this.groupMessageRepository.update(id, data);
  }

  async deleteGroupMessage(id: number): Promise<boolean> {
    return this.groupMessageRepository.delete(id);
  }
}
