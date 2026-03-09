import { injectable, inject } from "tsyringe";
import ChannelService from "@/services/channel.service";
import CasinoRepository from "@/repositories/casino.repository";
import ChannelRepository from "@/repositories/channel.repository";

@injectable()
export default class OneWinAviatorService extends ChannelService {
  constructor(
    @inject(CasinoRepository) private casinoRepo: CasinoRepository,
    @inject(ChannelRepository) private channelRepo: ChannelRepository,
  ) {
    super(channelRepo);
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
