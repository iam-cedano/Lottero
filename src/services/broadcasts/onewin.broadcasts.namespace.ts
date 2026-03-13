import { injectable, inject, singleton } from "tsyringe";
import CasinoRepository from "@/repositories/casino.repository";
import GroupRepository from "@/repositories/group.repository";
import ReportingServiceAbstract from "@/services/reporting.service.abstract";
import { MessageData } from "@/models/group.model";

namespace OneWinBroadcasts {
  @singleton()
  export class GlobalService extends ReportingServiceAbstract {
    constructor(
      @inject(CasinoRepository) private casinoRepo: CasinoRepository,
      @inject(GroupRepository) private groupRepo: GroupRepository,
    ) {
      super();

      console.info("OneWinBroadcasts loaded");
    }

    public async sendMessage(_data: MessageData): Promise<void> {
      throw new Error("Method not implemented.");
    }

    public async editMessage(_data: MessageData): Promise<void> {
      throw new Error("Method not implemented.");
    }

    public async deleteMessage(_data: MessageData): Promise<void> {
      throw new Error("Method not implemented.");
    }
  }
}

export default OneWinBroadcasts;
