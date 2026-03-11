export default abstract class ReportingServiceAbstract {
    public abstract sendMessage(): Promise<void>;
    public abstract editMessage(): Promise<void>;
    public abstract deleteMessage(): Promise<void>;
}