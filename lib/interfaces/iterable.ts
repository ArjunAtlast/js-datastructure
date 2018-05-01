import { Iterator } from "../classes/iterator"

/** Anything whose elements can be iterated over.*/
export interface Iterable<T> {
  /**
    Do an action for each item in this object
  */
  forEach(action:(item:T, index:number, iterable:Iterable<T>) => void):void;
  /**
    Return iterator for this object
  */
  iterator():Iterator<T>;
}
