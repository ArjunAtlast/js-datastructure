import { Iterator } from "./iterator";
export declare class ListIterator<E> extends Iterator<E> {
    protected lastIndex: number;
    /**
      Inserts the specified element into the list.
    */
    add(item: E): void;
    /**
      Removes from the underlying Iterable the last element returned by this iterator.
    */
    remove(): void;
    /**
      Returns the next element in the iteration.
    */
    next(): E | undefined;
    /**
      Returns true if this list iterator has more elements when traversing the list in the reverse direction.
    */
    hasPrevious(): boolean;
    /**
      Returns the previous element in the list and moves the cursor position backwards.
    */
    previous(): E | undefined;
    /**
      Returns the index of the element that would be returned by a subsequent call to next().
    */
    nextIndex(): number;
    /**
      Returns the index of the element that would be returned by a subsequent call to previous().
    */
    previousIndex(): number;
    /**
      Replaces the last element returned by next() or previous() with the specified element.
    */
    set(item: E): void;
}
