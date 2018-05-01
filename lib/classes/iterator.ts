import { Iterable } from "../interfaces/iterable";

/** Used to iterate over Iterable objects*/
export class Iterator<E> {
  protected _target:E[];
  protected _index: number = 0;

  constructor(target:E[])
  constructor(target:E[], index:number)
  constructor(target:E[],index:number = 0) {
    this._target = target;
    this._index = 0;
  }

  /**
  * Performs the given action for each remaining element until all elements have been processed or the action throws an exception.
  * @example
  *   //target contains [1,2,3,4], iterator pointer after 2
  *   iterator.forEachRemaining(function(item, index) {
  *     console.log(item*2);
  *   });
  *   // Output: 6 8
  */
  forEachRemaining(action:(item:E, index:number)=>void):void {
    for(let i=this._index; i<this._target.length; i++) {
      action(this._target[i],i);
    }
  }

  /**
  * Returns true if the iteration has more elements.
  * @example
  *   //target contains [1,2,3,4] iterator pointer after 3.
  *   if(iterator.hasNext()) console.log("Elements remaining");
  *   //Ouput: Elements remaining
  */
  hasNext():boolean {
    return !(this._index == this._target.length);
  }

  /**
  * Returns the next element in the iteration.
  * @example
  *   //target contains [1,25,83,48] iterator pointer after 1.
  *   console.log((item = iterator.next());
  *   //Output 25
  */
  next():E|undefined {
    return this.hasNext()?this._target[this._index++]:undefined;
  }

  /**
  * Removes from the underlying Iterable the last element returned by this iterator.
  * @example
  *   //target contains [1,25,83,48] iterator pointer after 1.
  *   iterator.next() //returns 25
  *   iterator.remove(); //removes 25
  *   // now target contains [1,83,48]
  */
  remove():void {
    this._target.splice(--this._index,1);
  }

}
