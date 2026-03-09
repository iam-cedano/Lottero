import Spelling from "@/utils/spelling.util";

export default class GameException extends Error {
  constructor(casino: string, game: string) {
    const casinoCorrected = Spelling.capitalizeFirstLetter(casino);
    const gameCorrected = Spelling.capitalizeFirstLetter(game);

    super(`A game named ${gameCorrected} exists in ${casinoCorrected}`);
  }
}
