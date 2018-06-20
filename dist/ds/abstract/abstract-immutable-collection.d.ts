import { ImmutableCollection } from "../../interfaces/immutable-collection";
/**
 * Abstract Implementation of ImmutableCollection Interface
 */
export declare abstract class AbstractImmutableCollection<E> implements ImmutableCollection<E> {
    protected readonly _store: ReadonlyArray<E>;
    constructor(...items: E[]);
    /**
     * Returns true if this collection contains the specified element.
     * @example
     *   //collection contains [1,2,3]
     *   console.log(collection.contains(3));
     *   //Output: true
     */
    contains(item: E): boolean;
    /**
     * Returns true if this collection contains all of the elements in the specified array.
     * @example
     *   //collection contains [1,2,3]
     *   console.log(collection.contains([1,2,4]));
     *   //Output: false
     */
    containsAll(items: E[]): boolean;
    /**
     * Returns the size of the collection
     * @example
     *   //collection contains [1,2,3,4]
     *   console.log(collection.size());
     *   //Output: 4
     */
    size(): number;
}
