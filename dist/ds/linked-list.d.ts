export declare class LinkedList<T> {
    private _head;
    private _tail;
    constructor(...args: T[]);
    /**
      Insert an item at the given position.
      pos = 0 : insert at beginning.
      pos =-1 : insert at end.
    */
    insert(item: T, pos?: number): void;
    /**
      Delete an item from the given position.
      pos = 0 : insert at beginning.
      pos =-1 : insert at end.
    */
    delete(pos?: number): T | undefined;
    find(pos?: number): T | undefined;
    /**
      Value of head
    */
    readonly first: T | undefined;
    /**
      Value of tail
    */
    readonly last: T | undefined;
}
