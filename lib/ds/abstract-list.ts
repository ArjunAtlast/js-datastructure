import {AbstractCollection} from "./abstract-collection";
import {ListIterator} from "../classes/list-iterator";

export class AbstractList<T> extends AbstractCollection<T>{

  constructor(...args:T[]) {
    super(...args);
  }

  /**
    Read an item from the list
  */
  get(index:number):T|undefined {
    return this._store[index];
  }

  /**
    Returns a list iterator over the elements in this list
  */
  listIterator(index:number=0):ListIterator<T> {
    return new ListIterator(this._store, index);
  }


}
