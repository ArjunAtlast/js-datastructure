import {Collection} from "./collection";
import {ListIterator} from "../classes/list-iterator";

/**
  Sub interface of Collection. List has much more functionalities than a collection.
*/
export interface List<E> extends Collection<E> {
  /**
    Read an item from the list
  */
  get(index: number):E;
  /**
    Returns the position of first occurrence of the element.
  */
  indexOf(item: E):number;
  /**
    Returns the position of last occurrence of the element.
  */
  lastIndexOf(item: E):number;
  /**
    Returns a list iterator over the elements in this list starting from the 'index'
  */
  listIterator(index:number):ListIterator<E>;
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
  sort(compareFn:(x:E,y:E)=>boolean):void;
  /**
    Returns a view of the portion of this list between the specified fromIndex, inclusive, and toIndex, exclusive.
  */
  subList(fromIndex:number, toIndex:number):List<E>;
}
