import { Iterable } from "../../interfaces/iterable";
import { Iterator } from "../../classes/iterator";

export abstract class AbstractIterable<E> implements Iterable<E> {
    [index:number]:E;

    abstract forEach(action:(item:E, index:number, collection:Iterable<E>)=>void): void;

    abstract iterator(): Iterator<E>;

    [Symbol.iterator](): IterableIterator<E> {
        return this.iterator();
    }
}