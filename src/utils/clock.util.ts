import { injectable, singleton } from "tsyringe";

@injectable()
@singleton()
export default class Clock {
    public now(): Date {
        return new Date();
    }

    public nowTimestamp(): number {
        return Date.now();
    }

    public nowFormatted(): string {
        return new Date().toISOString();
    }
}
