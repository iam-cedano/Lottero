import { MessageData } from "@/models/group.model";
import { inject, singleton } from "tsyringe";
import CasinoRepository from "@/repositories/casino.repository";
import GroupRepository from "@/repositories/group.repository";
import ReportingServiceAbstract from "@/services/reporting.service.abstract";

namespace OneWinGames {
  @singleton()
  export class Aviator extends ReportingServiceAbstract {
    constructor(
      @inject(CasinoRepository) private casinoRepo: CasinoRepository,
      @inject(GroupRepository) private groupRepo: GroupRepository,
    ) {
      super(groupRepo, "onewin", "aviator");
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

export default OneWinGames;
