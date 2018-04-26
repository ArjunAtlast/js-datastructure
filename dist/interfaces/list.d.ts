import { Collection } from "./collection";
import { ListIterator } from "../classes/list-iterator";
export interface List<E> extends Collection<E> {
    get: (index: number) => E;
    indexOf: (item: E) => number;
    lastIndexOf: (item: E) => number;
    listIterator: (index: number) => ListIterator<E>;
    removeAt: (index: number) => E;
    set: (index: number, item: E) => E;
    sort: (compareFn: (x: E, y: E) => boolean) => void;
    subList: (fromIndex: number, toIndex: number) => List<E>;
}
