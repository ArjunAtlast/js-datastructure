import { Collection } from "../interfaces/collection";
import { Iterator } from "../classes/iterator";
export declare abstract class AbstractCollection<T> implements Collection<T> {
    protected _store: T[];
    constructor(...items: T[]);
    /**
      Add an item to collection
    */
    add(item: T): boolean;
    /**
      Add all items of an array to collection
    */
    addAll(items: T[]): boolean;
    /**
      Removes all of the elements from this collection
    */
    clear(): void;
    /**
      Returns true if this collection contains the specified element.
    */
    contains(item: T): boolean;
    /**
      Returns true if this collection contains all of the elements in the specified array.
    */
    containsAll(items: T[]): boolean;
    /**
      Compares the specified object with this collection for equality.
    */
    equals(collection: Collection<T>): boolean;
    /**
      Returns true if this collection contains no elements.
    */
    isEmpty(): boolean;
    /**
      Removes a single instance of the specified element from this collection, if it is present
    */
    remove(item: T): boolean;
    /**
      Removes all of this collection's elements that are also contained in the specified array.
    */
    removeAll(items: T[]): boolean;
    /**
      Removes all of the elements of this collection that satisfy the given filter function.
    */
    removeIf(filterFn: (item: T, index: number, collection: Collection<T>) => boolean): boolean;
    /**
      Retains only the elements in this collection that are contained in the specified array.
    */
    retainAll(items: T[]): boolean;
    /**
      Returns the number of elements in this collection.
    */
    size(): number;
    /**
      Returns an array containing all of the elements in this collection
    */
    toArray(): T[];
    /**
      Performs an action for each item in this collection.
    */
    forEach(action: (item: T, index: number, collection: Collection<T>) => void): void;
    /**
      Return iterator for this collection.
    */
    iterator(): Iterator<T>;
}
