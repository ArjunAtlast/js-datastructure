export declare class List<T> {
    private _store;
    constructor(...args: T[]);
    add(item: T): number;
    get(index: number): T | undefined;
}
