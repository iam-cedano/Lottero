import { injectable, inject } from "tsyringe";
import GroupService from "@/services/group.service";
import CasinoRepository from "@/repositories/casino.repository";
import GroupRepository from "@/repositories/group.repository";
import ReportingServiceAbstract from "@/services/reporting.service.abstract";

@injectable()
export default class OneWinBroadcastService extends ReportingServiceAbstract {
  constructor(
    @inject(CasinoRepository) private casinoRepo: CasinoRepository,
    @inject(GroupRepository)
    private groupRepo: GroupRepository,
  ) {
    super();
  }

  public sendMessage(): Promise<void> {
    throw new Error("Not implemented yet.");
  }

  public editMessage(): Promise<void> {
    throw new Error("Not implemented yet.");
  }

  public deleteMessage(): Promise<void> {
    throw new Error("Not implemented yet.");
  }
}
