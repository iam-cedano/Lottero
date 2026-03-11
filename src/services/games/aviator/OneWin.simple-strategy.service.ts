import { injectable, inject } from "tsyringe";
import CasinoRepository from "@/repositories/casino.repository";
import GroupRepository from "@/repositories/group.repository";
import ReportingServiceAbstract from "@/services/reporting.service.abstract";

@injectable()
export default class OneWinAviatorService implements ReportingServiceAbstract {
  constructor(
    @inject(CasinoRepository) private casinoRepo: CasinoRepository,
    @inject(GroupRepository) private groupRepo: GroupRepository,
  ) {}

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
