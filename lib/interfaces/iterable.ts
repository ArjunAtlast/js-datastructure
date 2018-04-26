import { Iterator } from "../classes/iterator"

export interface Iterable<T> {
  forEach: (action:(item:T, index:number, iterable:Iterable<T>) => void)=>void;
  iterator: () => Iterator<T>;
}
