import BaseException from "@/exceptions/base.exception";

export default class ConflictException extends BaseException {
  constructor(message: string) {
    super(message, 409);
    this.name = "ConflictException";
  }
}
