import { Iterable } from "../interfaces/iterable";

export class Iterator<E> {
  protected _target:E[];
  protected _index: number = 0;

  constructor(target:E[],index:number = 0) {
    this._target = target;
    this._index = 0;
  }

  /**
    Performs the given action for each remaining element until all elements have been processed or the action throws an exception.
  */
  forEachRemaining(action:(item:E, index:number)=>void):void {
    for(let i=this._index; i<this._target.length; i++) {
      action(this._target[i],i);
    }
  }

  /**
    Returns true if the iteration has more elements.
  */
  hasNext():boolean {
    return !(this._index == this._target.length);
  }

  /**
    Returns the next element in the iteration.
  */
  next():E|undefined {
    return this.hasNext()?this._target[this._index++]:undefined;
  }

  /**
    Removes from the underlying Iterable the last element returned by this iterator.
  */
  remove():void {
    this._target.splice(--this._index,1);
  }

}
