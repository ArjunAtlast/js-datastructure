import { Set } from "./set";
/**
* A Set that further provides a total ordering on its elements. The elements are ordered using the compare function typically provided at sorted set creation time.
*/
export interface SortedSet<E> extends Set<E> {
    /**
    * Adds the specified element to this set if it is not already present
    */
    add(item: E): boolean;
    /**
    * Adds all of the elements in the specified array to this set if they're not already present
    */
    addAll(items: E[]): boolean;
    /**
    * Returns the compare function used to order the elements in this set
    */
    comparator(): (x: E, y: E) => number;
    /**
    * Returns the first (lowest) element currently in this set.
    */
    first(): E;
    /**
    * Returns a view of the portion of this set whose elements are strictly less than toElement.
    */
    headSet(toItem: E): SortedSet<E>;
    /**
    * Returns the last (highest) element currently in this set.
    */
    last(): E;
    /**
    * Returns a view of the portion of this set whose elements range from fromElement, inclusive, to toElement, exclusive.
    */
    subSet(fromItem: E, toItem: E): SortedSet<E>;
    /**
    * Returns a view of the portion of this set whose elements are greater than or equal to fromElement.
    */
    tailSet(fromItem: E): SortedSet<E>;
}
