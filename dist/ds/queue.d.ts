import { Iterable } from "../interfaces/iterable";
import { Iterator } from "../classes/iterator";
/** Creates a simple Queue (FIFO) datastructure */
export declare class Queue<T> implements Iterable<T> {
    private _store;
    constructor(...args: T[]);
    /**
    * Return front of the queue
    * @example
    *   //queue contains [1,2,3,4]
    *   console.log(queue.front);
    *   //Output: 1
    */
    readonly front: T | undefined;
    /**
    * Return rear of the queue
    * @example
    *   //queue contains [1,2,3,4]
    *   console.log(queue.rear);
    *   //Output: 4
    */
    readonly rear: T | undefined;
    /**
    * Returns size of the queue
    * @example
    *   //queue contains [1,2,3,4]
    *   console.log(queue.length);
    *   //Output: 4
    */
    readonly length: number;
    /**
    * Add item to the end of the queue
    * @example
    *   //queue contains [1,2,3,4]
    *   queue.enqueue(5);
    *   //now queue contains [1,2,3,4,5]
    */
    enqueue(item: T): void;
    /**
    * Remove item from the beginning of the queue and return
    * @example
    *   //queue contains [1,2,3,4,5]
    *   console.log(queue.dequeue());
    *   //Output: 5
    *   //now queue contains [1,2,3,4]
    */
    dequeue(): T | undefined;
    /**
    * Do an action for each item in queue
    * @example
    *   //queue contains [1,2,3,4]
    *   queue.forEach(function(item) {
    *     console.log(item + 4);
    *   });
    *   //Output: 5 6 7 8
    */
    forEach(action: (item: T, index: number, queue: Queue<T>) => void): void;
    /**
    * Return iterator for the queue
    * @example
    *   var iterator = queue.iterator(); //returns an Iterator for the queue
    */
    iterator(): Iterator<T>;
}
