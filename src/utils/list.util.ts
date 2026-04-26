export class List<T extends { status: boolean }> extends Array<T> {
    constructor(...items: T[]) {
        super(...items);
    }

    public sortByStatus(): this {
        return this.sort((a, b) =>
            a.status === b.status ? 0 : a.status ? -1 : 1,
        );
    }
}
