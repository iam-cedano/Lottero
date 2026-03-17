import { container } from "tsyringe";
import { MessageRequest } from "@/models/group.model";
import SendMessageInterface from "@/interfaces/send-message.interface";

export default class GroupDomain {
  /**
   * Validate if the request sent has the proper schema.
   * @param request request to validate
   * @returns boolean
   */
  public static IsMessageValid(request: MessageRequest): boolean {
    const { channel, data } = request;

    return GroupDomain.IsChannelValid(channel) && GroupDomain.IsDataValid(data);
  }

  /**
   * Get the group instance.
   * @param channel channel to get the instance from
   * @returns ReportingService
   */
  public static GetReportingInstance(
    channel: string,
  ): SendMessageInterface | undefined {
    return container.resolve<SendMessageInterface>(channel);
  }

  /**
   * Check if the strategy format is valid.
   * @param strategy strategy to check
   * @returns boolean
   */
  public static IsStrategyValid(strategy: string): boolean {
    const regex = /^[a-z0-9_]+$/;
    return regex.test(strategy);
  }

  /**
   * Check if the channel format is valid.
   * @param channel channel to check
   * @returns boolean
   */
  private static IsChannelValid(channel: string): boolean {
    const regex = /^\w+(-\w+(-\w+)?)?$/;

    return channel != undefined && channel != "" && regex.test(channel);
  }

  /**
   * Check if the data format is valid.
   * @param data data to check
   * @returns boolean
   */
  private static IsDataValid(data: Record<string, unknown>): boolean {
    return (
      data != undefined && data["command"] != undefined && data["command"] != ""
    );
  }

  private static CheckCommandFormat(command: string): boolean {
    const regex = /^[a-z0-9]+$/;
    return regex.test(command);
  }
}
