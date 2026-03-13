import { MessageData } from "@/models/group.model";
import { inject, singleton } from "tsyringe";
import CasinoRepository from "@/repositories/casino.repository";
import GroupRepository from "@/repositories/group.repository";
import ReportingServiceAbstract from "@/services/reporting.service.abstract";

namespace OneWinAviators {
  @singleton()
  export class SimpleStrategyService extends ReportingServiceAbstract {
    constructor(
      @inject(CasinoRepository) private casinoRepo: CasinoRepository,
      @inject(GroupRepository) private groupRepo: GroupRepository,
    ) {
      super();

      console.info("OneWinAviators loaded");
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
