export declare class Iterator<E> {
    protected _target: E[];
    protected _index: number;
    constructor(target: E[], index?: number);
    /**
      Performs the given action for each remaining element until all elements have been processed or the action throws an exception.
    */
    forEachRemaining(action: (item: E, index: number) => void): void;
    /**
      Returns true if the iteration has more elements.
    */
    hasNext(): boolean;
    /**
      Returns the next element in the iteration.
    */
    next(): E | undefined;
    /**
      Removes from the underlying Iterable the last element returned by this iterator.
    */
    remove(): void;
}
