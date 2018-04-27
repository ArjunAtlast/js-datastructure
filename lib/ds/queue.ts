import { Iterable } from "../interfaces/iterable";
import { Iterator } from "../classes/iterator";

export class Queue<T> implements Iterable<T> {
  private _store:T[];

  constructor(...args:T[]) {
    this._store = [...args];
  }

  /**
    Return front of the queue
  */
  get front():T|undefined {
    return this._store[0];
  }

  /**
    Return rear of the queue
  */
  get rear():T|undefined {
    return this._store[this._store.length - 1];
  }

  /**
    Returns size of the queue
  */
  get length():number {
    return this._store.length;
  }

  /**
    Add item to the end of the queue
  */
  enqueue(item:T):void {
    this._store.push(item);
  }

  /**
    Remove item from the beginning of the queue and return
  */
  dequeue():T|undefined {
    return this._store.shift();
  }

  /**
    Do an action for each item in queue
  */
  forEach(action:(item:T,index:number,queue:Queue<T>)=>void):void {
    this._store.forEach((item:T,index:number)=> {
      action(item,index,this);
    });
  }

  /**
    Return iterator for the queue
  */
  iterator():Iterator<T> {
    return new Iterator<T>(this._store);
  }
}
