import { Collection } from "../../interfaces/collection";
import { Iterator } from "../../classes/iterator";
import { AbstractIterable } from "./abstract-iterable";
/**
 An abstract implementation of Collection interface
*/
export declare class AbstractCollection<T> extends AbstractIterable<T> implements Collection<T> {
    [index: number]: T;
    protected _store: T[];
    constructor(...items: T[]);
    /**
    * Add an item to this collection
    * @example
    *   //collection contains [1,2,3,4]
    *   collection.add(5);
    *   //now collection contains [1,2,3,4,5]
    */
    add(item: T): boolean;
    /**
    * Add all items of an array to this collection
    * @example
    *   //collection contains [1,2,3,4,5]
    *   collection.addAll([6,7]);
    *   //now collection contains [1,2,3,4,5,6,7]
    */
    addAll(items: T[]): boolean;
    /**
    * Removes all the elements
    * @example
    *   //collection contains [1,2,3]
    *   collection.clear();
    *   //now collection contains []
    */
    clear(): void;
    /**
    * Returns true if this collection contains the specified element.
    * @example
    *   //collection contains [1,2,3]
    *   console.log(collection.contains(3));
    *   //Output: true
    */
    contains(item: T): boolean;
    /**
    * Returns true if this collection contains all of the elements in the specified array.
    * @example
    *   //collection contains [1,2,3]
    *   console.log(collection.contains([1,2,4]));
    *   //Output: false
    */
    containsAll(items: T[]): boolean;
    /**
    * Compares the specified object with this collection for equality.
    * @example
    *   //collection1 contains [1,2,3] and collection2 contains [1,2,3]
    *   console.log(collection1.equals(collection2));
    *   //Output: true
    */
    equals(collection: Collection<T>): boolean;
    /**
    * Returns true if this collection contains no elements.
    * @example
    *   //collection contains [1,2,3]
    *   console.log(collection.isEmpty());
    *   //Output: false
    */
    isEmpty(): boolean;
    /**
    * Removes a single instance of the specified element from this collection, if it is present
    * @example
    *   //collection contains [1,2,3]
    *   collection.remove(3);
    *   //now collection contains [1,2]
    */
    remove(item: T): boolean;
    /**
    * Removes all of this collection's elements that are also contained in the specified array.
    * @example
    *   //collection contains [1,2,3,4]
    *   collection.removeAll([1,3,5,7]);
    *   //now collection contains [2,4]
    */
    removeAll(items: T[]): boolean;
    /**
    * Removes all of the elements of this collection that satisfy the given filter function.
    * @example
    * //collection contains [1,2,3,4,5,6,7,8,9]
    * collection.removeIf(function(x) {
    *   return (x%2==0);
    * }); //removing even numbers
    * //now collection contains [1,3,5,7,9]
    */
    removeIf(filterFn: (item: T, index: number, collection: Collection<T>) => boolean): boolean;
    /**
    * Retains only the elements in this collection that are contained in the specified array.
    * @example
    *   //collection contains [1,2,3,4]
    *   collection.retainAll([1,3,5,7]);
    *   //now collection contains [1,3]
    */
    retainAll(items: T[]): boolean;
    /**
    * Returns the number of elements in this collection.
    * @example
    *   //collection contains [1,2,3,4]
    *   console.log(collection.size());
    *   //Output: 4
    */
    size(): number;
    /**
    * Returns an array containing all of the elements in this collection
    * @example
    *   //collection contains [1,2,3,4]
    *   console.log(collection.toArray());
    *   //Output: [1,2,3,4]
    */
    toArray(): T[];
    /**
    * Performs an action for each item in this collection.
    * @example
    *   //collection contains [1,2,3,4]
    *   collection.forEach(function(item) {
    *     console.log(item * 4);
    *   });
    *   //Output: 4 8 12 16
    */
    forEach(action: (item: T, index: number, collection: Collection<T>) => void): void;
    /**
    * Returns an iterator for the collection
    * @example
    *   var iterator = collection.iterator(); //returns an Iterator for the collection
    */
    iterator(): Iterator<T>;
}
