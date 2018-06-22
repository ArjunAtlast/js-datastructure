import { Collection } from "./collection";

export interface Queue<E> extends Collection<E> {
  add(item:E):boolean;
  element():E;
  poll():E;
}
