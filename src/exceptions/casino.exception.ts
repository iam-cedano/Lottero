import Spelling from "@/utils/spelling.util";

export default class CasinoException extends Error {
  constructor(casino: string) {
    const casinoCorrected = Spelling.capitalizeFirstLetter(casino);

    super(`${casinoCorrected} doesn't exist`);
  }
}
