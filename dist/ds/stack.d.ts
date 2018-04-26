export declare class Stack<T> {
    private _store;
    constructor(...args: T[]);
    /**
      Number of elements in stack
    */
    readonly height: number;
    /**
      Push item to the top of the stack
    */
    push(item: T): void;
    /**
      Pop top of the stack and return
    */
    pop(): T | undefined;
    /**
      return top of the stack (does not pop)
    */
    peek(): T | undefined;
    /**
      return first index (from top of the stack) of an item in stack
    */
    search(item: T): number;
}
