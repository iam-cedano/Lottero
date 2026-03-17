import BaseException from "@/exceptions/base.exception";

export default class ValidationException extends BaseException {
  constructor(message: string) {
    super(message, 400);
    this.name = "ValidationException";
  }
}
