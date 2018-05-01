/** Create a Stack (LIFO) datastructure. */

export class Stack<T> {
  private _store:T[];

  constructor(...args:T[]) {
    this._store = [...args];
  }

  /**
    Number of elements in stack
  */
  get height():number {
    return this._store.length;
  }

  /**
    Push item to the top of the stack
  */
  push(item: T):void {
    this._store.push(item);
  }

  /**
    Pop top of the stack and return
  */
  pop():T|undefined {
    return this._store.pop();
  }

  /**
    return top of the stack (does not pop)
  */
  peek():T|undefined {
    return this._store[this._store.length-1];
  }

  /**
    return first index (from top of the stack) of an item in stack
  */
  search(item:T):number {
    return this._store.lastIndexOf(item);
  }
}
