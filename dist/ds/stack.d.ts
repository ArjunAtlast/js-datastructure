/** Create a Stack (LIFO) datastructure. */
export declare class Stack<T> {
    private _store;
    constructor(...args: T[]);
    /**
    * Number of elements in stack
    * @example
    *   //stack contains [1,2,3,4]
    *   console.log(stack.height);
    *   //Output: 4
    */
    readonly height: number;
    /**
    * Push item/items to the top of the stack
    * @example
    *   //stack contains [1,2,3,4]
    *   stack.push(5);
    *   //now stack contains [1,2,3,4,5]
    *   stack.push(6,7);
    *   //now stack contains [1,2,3,4,5,6,7]
    */
    push(...items: T[]): void;
    /**
    * Pop top of the stack and return
    * @example
    *   //stack contains [1,2,3,4,5,6,7]
    *   console.log(stack.pop());
    *   //Output: 7
    *   //now stack contains [1,2,3,4,5,6]
    */
    pop(): T | undefined;
    /**
    * Return top of the stack (does not pop)
    * @example
    *   //stack contains [1,2,3,4,5,6]
    *   console.log(stack.peek());
    *   //Output: 6 (stack does not change)
    */
    peek(): T | undefined;
    /**
    * Return first index (from top of the stack) of an item in stack
    * @example
    *   //stack contains [1,2,3,4,3,5]
    *   console.log(stack.search(3));
    *   //Output: 4
    */
    search(item: T): number;
}
