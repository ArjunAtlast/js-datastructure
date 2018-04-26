import { Iterable } from "./iterable";
import { Iterator } from "../classes/iterator";

export interface Collection<T> extends Iterable<T> {
  add: (item:T) => boolean;
  addAll: (items:T[]) => boolean;
  clear: () => void;
  contains: (item:T) => boolean;
  containsAll: (items:T[]) => boolean;
  equals: (collection:Collection<T>) => boolean;
  isEmpty: () => boolean;
  remove: (item:T) => boolean;
  removeAll: (items:T[]) => boolean;
  removeIf: (filterFn: (item:T, index:number, collection:Collection<T>)=>boolean) => boolean;
  retainAll: (items:T[]) => boolean;
  size: () => number;
  toArray: () => T[];
  forEach: (action:(item:T, index:number, collection:Collection<T>) => void)=>void;
}
