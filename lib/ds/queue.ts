import { Iterable } from "../interfaces/iterable";
import { Iterator } from "../classes/iterator";

/** Creates a simple Queue (FIFO) datastructure */
export class Queue<T> implements Iterable<T> {
  private _store:T[];

  constructor(...args:T[]) {
    this._store = [...args];
  }

  /**
  * Return front of the queue
  * @example
  *   //queue contains [1,2,3,4]
  *   console.log(queue.front);
  *   //Output: 1
  */
  get front():T|undefined {
    return this._store[0];
  }

  /**
  * Return rear of the queue
  * @example
  *   //queue contains [1,2,3,4]
  *   console.log(queue.rear);
  *   //Output: 4
  */
  get rear():T|undefined {
    return this._store[this._store.length - 1];
  }

  /**
  * Returns size of the queue
  * @example
  *   //queue contains [1,2,3,4]
  *   console.log(queue.length);
  *   //Output: 4
  */
  get length():number {
    return this._store.length;
  }

  /**
  * Add item to the end of the queue
  * @example
  *   //queue contains [1,2,3,4]
  *   queue.enqueue(5);
  *   //now queue contains [1,2,3,4,5]
  */
  enqueue(item:T):void {
    this._store.push(item);
  }

  /**
  * Remove item from the beginning of the queue and return
  * @example
  *   //queue contains [1,2,3,4,5]
  *   console.log(queue.dequeue());
  *   //Output: 5
  *   //now queue contains [1,2,3,4]
  */
  dequeue():T|undefined {
    return this._store.shift();
  }

  /**
  * Do an action for each item in queue
  * @example
  *   //queue contains [1,2,3,4]
  *   queue.forEach(function(item) {
  *     console.log(item + 4);
  *   });
  *   //Output: 5 6 7 8
  */
  forEach(action:(item:T,index:number,queue:Queue<T>)=>void):void {
    this._store.forEach((item:T,index:number)=> {
      action(item,index,this);
    });
  }

  /**
  * Return iterator for the queue
  * @example
  *   var iterator = queue.iterator(); //returns an Iterator for the queue
  */
  iterator():Iterator<T> {
    return new Iterator<T>(this._store);
  }
}
