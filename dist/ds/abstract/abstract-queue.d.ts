import { AbstractCollection } from "./abstract-collection";
import { Queue } from "../../interfaces/queue";
/**
  Abstract implementation of Queue interface
*/
export declare class AbstractQueue<E> extends AbstractCollection<E> implements Queue<E> {
    /**
    * Retrieves, but does not remove, the head of this queue
    * @example
    *   //queue has elements [1,2,3,4]
    *   console.log(queue.element());
    *   //Output: 1
    */
    element(): E;
    /**
    * Retrieves and removes the head of this queue.
    * @example
    *   //queue has elements [1,2,3,4]
    *   console.log(queue.element());
    *   //Output: 1 and queue now has elements [2,3,4]
    */
    poll(): E;
}
