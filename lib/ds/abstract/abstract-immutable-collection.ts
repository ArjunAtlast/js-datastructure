import { ImmutableCollection } from "../../interfaces/immutable-collection";

/**
 * Abstract Implementation of ImmutableCollection Interface
 */
export abstract class AbstractImmutableCollection<E> implements ImmutableCollection<E> {

    protected readonly _store: ReadonlyArray<E>;

    constructor(...items:E[]) {
        this._store = Object.freeze(items);
    }
    
    /**
     * Returns true if this collection contains the specified element.
     * @example
     *   //collection contains [1,2,3]
     *   console.log(collection.contains(3));
     *   //Output: true
     */
    contains(item:E):boolean {
        return this._store.indexOf(item) !== -1;
    }
    /**
     * Returns true if this collection contains all of the elements in the specified array.
     * @example
     *   //collection contains [1,2,3]
     *   console.log(collection.contains([1,2,4]));
     *   //Output: false
     */
    containsAll(items:E[]):boolean {
        for(let item of items) {
            if(!this.contains(item)) return false;
        }
        return !!items.length;
    }
    /**
     * Returns the size of the collection
     * @example
     *   //collection contains [1,2,3,4]
     *   console.log(collection.size());
     *   //Output: 4
     */
    size(): number {
        return this._store.length;
    }

}