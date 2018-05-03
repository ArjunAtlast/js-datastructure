import { AbstractQueue } from "../abstract/abstract-queue";
import { Serializable } from "../../interfaces/serializable";
/**
  An unbounded priority queue. The elements of the priority queue are ordered according to the compare function provided at queue construction time.
*/
export declare class PriorityQueue<E> extends AbstractQueue<E> implements Serializable {
    protected _comparator: (x: E, y: E) => number;
    constructor(compareFn: (x: E, y: E) => number, ...items: E[]);
    /**
    * Inserts the specified item into this priority queue.
    * @example
    *   //queue containes [1,8,12] (compareFn designed for ascending order)
    *   queue.add(6); //[1,6,8,12]
    */
    add(item: E): boolean;
    /**
    * Inserts all items of an array into this priority queue.
    * @example
    *   //queue containes [1,8,12] (compareFn designed for ascending order)
    *   queue.add([6,10,15]); //[1,6,8,10,12,15]
    */
    addAll(items: E[]): boolean;
    /**
    * Returns the compare function used to order the elements in this queue.
    * @example
    *   queue.comparator; //returns a function
    */
    readonly comparator: (x: E, y: E) => number;
    /**
    * Converts the queue into a JSON String
    * @example
    *   //queue contains [1,2,3,4]
    *   console.log(queue.toString());
    *   //Output
    *   //[1,2,3,4]
    */
    toString(): string;
}
