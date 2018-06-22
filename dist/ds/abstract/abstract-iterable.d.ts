import { Iterable } from "../../interfaces/iterable";
import { Iterator } from "../../classes/iterator";
import { Collection } from "../../interfaces/collection";
export declare abstract class AbstractIterable<E> implements Iterable<E> {
    abstract forEach(action: (item: E, index: number, collection: Collection<E>) => void): void;
    abstract iterator(): Iterator<E>;
    [Symbol.iterator](): IterableIterator<E>;
}
