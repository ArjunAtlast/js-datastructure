import { Collection } from "./collection";

/**
* A collection that contains no duplicate elements
*/
export interface Set<E> extends Collection<E> {
  /**
  * Adds the specified element to this set if it is not already present
  */
  add(item:E):boolean;
  /**
  * Adds all of the elements in the specified array to this set if they're not already present
  */
  addAll(items:E[]):boolean;
  /**
  * Returns a new set created by union of this set and the set specified
  */
  union(set:Set<E>):Set<E>;
  /**
  * Returns a new set created by intersection of this set and the set specified
  */
  intersection(set:Set<E>):Set<E>;
  /**
  * Returns a new set created by subtracting the specified set from this set.
  */
  difference(set:Set<E>):Set<E>;
  /**
  * Returns a new set created by exclusion of this set and the set specified.
  */
  exclusion(set:Set<E>):Set<E>;
}