import { SortedSet } from "../../interfaces/sorted-set";
import { AbstractSet } from "./abstract-set";
export declare class AbstractSortedSet<E> extends AbstractSet<E> implements SortedSet<E> {
    protected _comparator: (x: E, y: E) => number;
    constructor(compareFn: (x: E, y: E) => number, ...items: E[]);
    /**
    * Adds the specified element to this set if it is not already present
    * @example
    *   //set contains [1,3,6,8] //compareFn is ascending
    *   set.add(4); //set: [1,3,4,6,8]
    */
    add(item: E): boolean;
    /**
    * Inserts all items of an array into this set.
    * @example
    *   //set containes [1,8,12] (compareFn designed for ascending order)
    *   set.addAll([6,10,15]); //[1,6,8,10,12,15]
    */
    addAll(items: E[]): boolean;
    /**
    * Returns the compare function used to order the elements in this set.
    * @example
    *   set.comparator(); //returns a function
    */
    comparator(): (x: E, y: E) => number;
    /**
    * Returns the first (lowest) element currently in this set.
    * @example
    *   //set contains [1,2,3,4]
    *   set.first()
    */
    first(): E;
    /**
    * Returns the last (highest) element currently in this set.
    * @example
    *   //set contains [1,2,3,4]
    *   set.last();
    */
    last(): E;
    /**
    * Returns a view of the portion of this set whose elements range from fromElement, inclusive, to toElement, exclusive.
    * @example
    *   //set contains [1,2,3,4,5,6,7,8,9,10]
    *   set.subSet(4,9) //returns set : [4,5,6,7,8]
    */
    subSet(fromItem: E, toItem: E): AbstractSortedSet<E>;
    /**
    * Returns a view of the portion of this set whose elements are strictly less than toElement.
    * @example
    *   //set : [1,2,3,5,7,9]
    *   set.headSet(6) //returns set : [1,2,3,5]
    */
    headSet(toItem: E): AbstractSortedSet<E>;
    /**
    * Returns a view of the portion of this set whose elements are greater than or equal to fromElement.
    * @example
    *   //set : [1,2,3,5,7,9]
    *   set.tailSet(4) //returns set : [5,7,9]
    */
    tailSet(fromItem: E): AbstractSortedSet<E>;
}
