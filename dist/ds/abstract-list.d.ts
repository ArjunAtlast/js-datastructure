import { AbstractCollection } from "./abstract-collection";
export declare class AbstractList<T> extends AbstractCollection<T> {
    constructor(...args: T[]);
    get(index: number): T | undefined;
}
