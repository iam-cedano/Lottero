import { MessageRequest } from "@/models/message.model";

export default class MessageDomain {
    /**
     * Validate if the request sent has the proper schema.
     * @param request request to validate
     * @returns boolean
     */
    public static IsMessageValid(request: MessageRequest): boolean {
        const { recipient, data } = request;

        return (
            MessageDomain.IsChannelValid(recipient) && MessageDomain.IsDataValid(data)
        );
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

}