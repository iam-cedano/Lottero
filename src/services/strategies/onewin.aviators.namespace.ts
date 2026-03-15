import { MessageData } from "@/models/group.model";
import { inject, singleton } from "tsyringe";
import GroupRepository from "@/repositories/group.repository";
import ReportingServiceAbstract from "@/services/reporting.service.abstract";

namespace OneWinAviators {
  @singleton()
  export class SimpleStrategyService extends ReportingServiceAbstract {
    constructor(@inject(GroupRepository) groupRepository: GroupRepository) {
      super(groupRepository, "onewin", "aviator", "simple_strategy");
    }

    public async sendMessage(_data: MessageData): Promise<void> {
      return;
    }

    public async editMessage(_data: MessageData): Promise<void> {
      return;
    }

    public async deleteMessage(_data: MessageData): Promise<void> {
      return;
    }
  }
}

export default OneWinAviators;
