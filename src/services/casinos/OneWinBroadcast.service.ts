import { injectable, inject } from "tsyringe";
import ChannelGroupService from "@/services/channel-group.service";
import CasinoRepository from "@/repositories/casino.repository";
import ChannelGroupRepository from "@/repositories/channel-group.repository";

@injectable()
export default class OneWinBroadcastService extends ChannelGroupService {
  constructor(
    @inject(CasinoRepository) private casinoRepo: CasinoRepository,
    @inject(ChannelGroupRepository)
    private channelGroupRepo: ChannelGroupRepository,
  ) {
    super(channelGroupRepo);
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
