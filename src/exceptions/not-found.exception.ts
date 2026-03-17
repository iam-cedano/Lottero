import BaseException from "@/exceptions/base.exception";

export default class NotFoundException extends BaseException {
  constructor(message: string) {
    super(message, 404);
    this.name = "NotFoundException";
  }
}
