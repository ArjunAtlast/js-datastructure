import { ImmutableCollection } from "./immutable-collection";

/**
 * A List whose properties / elements cannot be changed.
 */
export interface ImmutableList<E> extends ImmutableCollection<E> {

    /**
     * Returns true if this list contains the specified element.
     */
    contains(item:E): boolean;
    /**
     * Returns true if this list contains all of the elements in the specified array.
     */
    containsAll(items:E[]): boolean;
    /**
     * Returns the size of this list
     */
    size(): number;
    /**
     * Read an item at the specified position in the list.
     */
    get(index:number): E;

}