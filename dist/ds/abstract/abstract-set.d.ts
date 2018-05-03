import { AbstractCollection } from "./abstract-collection";
import { Set } from "../../interfaces/set";
/**
* Abstract implementation of Set interface.
*/
export declare class AbstractSet<E> extends AbstractCollection<E> implements Set<E> {
    constructor(...items: E[]);
    /**
    * Adds the specified element to this set if it is not already present
    * @example
    *   //set contains [1,2,3,4,5]
    *   set.add(6); //returns true and now set contains [1,2,3,4,5,6]
    *   set.add(5); //returns false since 5 is already in the set.
    */
    add(item: E): boolean;
    /**
    * Adds all of the elements in the specified collection to this set if they're not already present
    * @example
    *   //set contains [1,2,3,4,5]
    *   set.add([4,5,6]); //returns true and now set contains [1,2,3,4,5,6]
    *   set.add([5,6]); //returns false since 5 and 6 are already in the set.
    */
    addAll(items: E[]): boolean;
    /**
    * Returns a new set created by union of this set and the set specified
    * @example
    *   //set1 : [1,2,3,4] and set2 : [4,5,6,7]
    *   set1.union(set2); //returns a new set : [1,2,3,4,5,6,7]
    */
    union(set: AbstractSet<E>): AbstractSet<E>;
    /**
    * Returns a new set created by intersection of this set and the set specified
    * @example
    *   //set1 : [1,2,3,4,5] and set2 : [4,5,6,7]
    *   set1.intersection(set2); //returns a new set : [4,5]
    */
    intersection(set: AbstractSet<E>): AbstractSet<E>;
    /**
    * Returns a new set created by subtracting the specified set from this set.
    * @example
    *   //set1 : [1,2,3,4,5] and set2 : [4,5,6,7]
    *   set1.difference(set2); //returns a new set : [1,2,3]
    */
    difference(set: AbstractSet<E>): AbstractSet<E>;
    /**
    * Returns a new set created by exclusion of this set and the set specified.
    * @example
    *   //set1 : [1,2,3,4,5] and set2 : [4,5,6,7]
    *   set1.difference(set2); //returns a new set : [1,2,3,6,7]
    */
    exclusion(set: AbstractSet<E>): AbstractSet<E>;
}
