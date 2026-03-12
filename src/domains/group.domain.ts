import MessageEnum from "@/enums/message.enum";
import MessageException from "@/exceptions/message.exception";

export default class GroupDomain {
  public static getMessageType(message: string): MessageEnum {
    const [casino, game, strategy] = message.split("-");

    if (
      casino == undefined ||
      casino == "" ||
      game == undefined ||
      game == ""
    ) {
      throw new MessageException("Casino or game is undefined");
    }

    return MessageEnum.GROUP;
  }
}
