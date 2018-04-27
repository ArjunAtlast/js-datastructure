import { AbstractCollection } from "./abstract-collection";
import { ListIterator } from "../classes/list-iterator";
export declare class AbstractList<T> extends AbstractCollection<T> {
    constructor(...args: T[]);
    /**
      Read an item from the list
    */
    get(index: number): T | undefined;
    /**
      Returns a list iterator over the elements in this list
    */
    listIterator(index?: number): ListIterator<T>;
}
