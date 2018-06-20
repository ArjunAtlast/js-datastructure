/**
 * A Collection whose properties / elements cannot be changed.
 */
export interface ImmutableCollection<E> {

  /**
   * Returns true if this collection contains the specified element.
   */
  contains(item:E):boolean;
  /**
   * Returns true if this collection contains all of the elements in the specified array.
   */
  containsAll(items:E[]):boolean;
  /**
   * Returns the size of the collection
   */
  size(): number;
  
}