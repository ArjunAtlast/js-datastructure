import {Collection} from "./collection";

/**
  Sub interface of Collection. List has much more functionalities than a collection.
*/
export interface List<E> extends Collection<E> {
  /**
    Appends the specified element to the end of this list
  */
  add(item:E):boolean;
  /**
    Inserts the specified element at the specified position in this list
  */
  add(item:E, index:number):boolean;
  /**
    Appends all of the elements in the specified array to the end of this list
  */
  addAll(items:E[]):boolean;
  /**
    Inserts all of the elements in the specified array into this list at the specified position.
  */
  addAll(items:E[], index:number):boolean;
  /**
    Read an item from the list
  */
  get(index: number):E|undefined;
  /**
    Returns the position of first occurrence of the element.
  */
  indexOf(item: E):number;
  /**
    Returns the position of last occurrence of the element.
  */
  lastIndexOf(item: E):number;
  /**
   * Returns the median of the list
  */
  median(): E;
  /**
    Removes the element at the specified position in this list.
  */
  removeAt(index:number):E;
  /**
    Replaces the element at the specified position in this list with the specified element
  */
  set(index:number, item:E):E;
  /**
    Sorts this list according to the compareFn
  */
  sort(compareFn:(x:E,y:E)=>number):this;
  /**
    Returns a view of the portion of this list between the specified fromIndex, inclusive, and toIndex, exclusive.
  */
  subList(fromIndex:number, toIndex:number):this;
  /**
  * Reverse the list
  */
  reverse():this;
}
