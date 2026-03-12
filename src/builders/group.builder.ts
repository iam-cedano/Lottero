import container from "@/container";
import CasinoException from "@/exceptions/casino.exception";
import GameException from "@/exceptions/game.exception";

export default class GroupBuilder {
  static getGroup(casino: string, game?: string) {
    const token = game ? `${casino}_${game}` : `${casino}_broadcast`;

    if (!container.isRegistered(token)) {
      if (!game) {
        throw new CasinoException(casino);
      } else {
        if (!container.isRegistered(`${casino}_broadcast`)) {
          throw new CasinoException(casino);
        }
        throw new GameException(casino, game);
      }
    }

    return container.resolve(token);
  }
}
