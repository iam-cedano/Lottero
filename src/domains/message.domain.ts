export default class MessageDomain {
    /**
        * Check if the channel format is valid.
        * @param channel channel to check
        * @returns boolean
    */
    public static IsChannelValid(channel: string): boolean {
        const regex = /^\w+(-\w+(-\w+)?)?$/;

        return channel != undefined && channel != "" && regex.test(channel);
    }
}