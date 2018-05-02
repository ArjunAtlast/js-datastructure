import { Iterator } from "./iterator";
/** Iterator modified to iterate over lists*/
export declare class ListIterator<E> extends Iterator<E> {
    protected lastIndex: number;
    /**
    * Inserts the specified element into the list.
    * @example
    *   //target contains [1,5,11,26] and iterator pointer between 11 and 26
    *   iterator.add(25);
    *   //new list contains [1,5,11,25,26]
    */
    add(item: E): void;
    /**
    * Returns the next element in the iteration.
    * @example
    *   //target contains [1,5,11,26] and iterator pointer between 5 and 11
    *   console.log(iterator.next());
    *   //Output: 11
    */
    next(): E | undefined;
    /**
    * Returns true if this list iterator has more elements when traversing the list in the reverse direction.
    * @example
    *   //target contains [1,5,11,26] and iterator pointer before 1
    *   console.log(iterator.hasPrevious());
    *   //Output: false
    */
    hasPrevious(): boolean;
    /**
    * Returns the previous element in the list and moves the cursor position backwards.
    * @example
    *   //target contains [1,5,11,26] and iterator pointer between 11 and 26
    *   console.log(iterator.previous());
    *   //Output: 11
    */
    previous(): E | undefined;
    /**
    * Returns the index of the element that would be returned by a subsequent call to next().
    * @example
    *   //target contains [1,5,11,26] and iterator pointer between 11 and 26
    *   console.log(iterator.nextIndex());
    *   //Output: 3
    *   iterator.next();
    *   console.log(iterator.nextIndex());
    *   //Output: -1
    */
    nextIndex(): number;
    /**
    * Returns the index of the element that would be returned by a subsequent call to previous().
    * @example
    *   //target contains [1,5,11,26] and iterator pointer between 11 and 26
    *   console.log(iterator.previousIndex());
    *   //Output: 2
    */
    previousIndex(): number;
    /**
    * Replaces the last element returned by next() or previous() with the specified element.
    * @example
    *   //target contains [1,5,11,26] and iterator pointer between 5 and 11
    *   iterator.next(); //returns 11
    *   iterator.set(15);
    *   //now target contains [1,5,15,26]
    */
    set(item: E): void;
    /**
    * Removes from the underlying Iterable the last element returned by this iterator.
    * @example
    *   //target contains [1,5,11,26] and iterator pointer between 5 and 11
    *   iterator.previous(); //returns 5
    *   iterator.remove(); //removes 5
    *   //now target contains [1,11,26]
    */
    remove(): void;
}
