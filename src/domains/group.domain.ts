import MessageEnum from "@/enums/message.enum";
import { ChannelFormatException } from "@/exceptions/group.exception";
import { MessageRequest } from "@/models/group.model";
import ReportingServiceAbstract from "@/services/reporting.service.abstract";
import { container } from "tsyringe";

export default class GroupDomain {
  /**
   * Get the type of message to send.
   * There are three types of messages:
   *  - BROADCAST: when the message is sent to all channels from a casino.
   *  - GAME: when the message is sent to a specific group of channels from a casino's game.
   * @param channel where the message will be sent. Format: casino-game-strategy
   * @returns MessageEnum | undefined
   */
  public static GetMessageType(channel: string): MessageEnum | undefined {
    const [casino, game, strategy] = channel.split("-");

    if (channel == undefined || channel == "") {
      return undefined;
    }

    if (!GroupDomain.CheckChannelFormat(channel)) {
      return undefined;
    }

    if (casino == undefined || casino == "") {
      return undefined;
    }

    if (game == undefined || game == "") {
      return MessageEnum.BROADCAST;
    }

    if (strategy == undefined || strategy == "") {
      return MessageEnum.GAME;
    }

    return MessageEnum.STRATEGY;
  }

  /**
   * Validate if the request sent has the proper schema.
   * @param request request to validate
   * @returns boolean
   */
  public static IsMessageValid(request: MessageRequest): boolean {
    const { channel, data } = request;

    if (channel == undefined || channel == "") {
      return false;
    }

    if (data == undefined || Object.keys(data).length === 0) {
      return false;
    }

    if (!GroupDomain.CheckChannelFormat(channel)) {
      return false;
    }

    if (!GroupDomain.CheckDataFormat(data)) {
      return false;
    }

    return true;
  }

  /**
   * Get the group instance.
   * @param channel channel to get the instance from
   * @returns ReportingService
   */
  public static GetReportingInstance(
    channel: string,
  ): ReportingServiceAbstract | undefined {
    return container.resolve<ReportingServiceAbstract>(channel);
  }

  /**
   * Check if the channel format is valid.
   * @param channel channel to check
   * @returns boolean
   */
  private static CheckChannelFormat(channel: string): boolean {
    const regex = /^\w+(-\w+(-\w+)?)?$/;

    return regex.test(channel);
  }

  /**
   * Check if the data format is valid.
   * @param data data to check
   * @returns boolean
   */
  private static CheckDataFormat(data: Record<string, unknown>): boolean {
    return data["command"] != undefined && data["command"] != "";
  }
}
