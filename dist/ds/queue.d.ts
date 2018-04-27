import { Iterable } from "../interfaces/iterable";
import { Iterator } from "../classes/iterator";
export declare class Queue<T> implements Iterable<T> {
    private _store;
    constructor(...args: T[]);
    /**
      Return front of the queue
    */
    readonly front: T | undefined;
    /**
      Return rear of the queue
    */
    readonly rear: T | undefined;
    /**
      Returns size of the queue
    */
    readonly length: number;
    /**
      Add item to the end of the queue
    */
    enqueue(item: T): void;
    /**
      Remove item from the beginning of the queue and return
    */
    dequeue(): T | undefined;
    /**
      Do an action for each item in queue
    */
    forEach(action: (item: T, index: number, queue: Queue<T>) => void): void;
    /**
      Return iterator for the queue
    */
    iterator(): Iterator<T>;
}
