import {AbstractCollection} from "./abstract-collection";

export class AbstractList<T> extends AbstractCollection<T>{

  constructor(...args:T[]) {
    super(...args);
  }

  /*
    Read an item from the list
  */
  get(index:number):T|undefined {
    return this._store[index];
  }



}
