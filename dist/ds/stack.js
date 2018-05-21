"use strict";
/** Create a Stack (LIFO) datastructure. */
Object.defineProperty(exports, "__esModule", { value: true });
class Stack {
    constructor(...args) {
        this._store = [...args];
    }
    /**
    * Number of elements in stack
    * @example
    *   //stack contains [1,2,3,4]
    *   console.log(stack.height);
    *   //Output: 4
    */
    get height() {
        return this._store.length;
    }
    /**
    * Push item/items to the top of the stack
    * @example
    *   //stack contains [1,2,3,4]
    *   stack.push(5);
    *   //now stack contains [1,2,3,4,5]
    *   stack.push(6,7);
    *   //now stack contains [1,2,3,4,5,6,7]
    */
    push(...items) {
        this._store.push(...items);
    }
    /**
    * Pop top of the stack and return
    * @example
    *   //stack contains [1,2,3,4,5,6,7]
    *   console.log(stack.pop());
    *   //Output: 7
    *   //now stack contains [1,2,3,4,5,6]
    */
    pop() {
        return this._store.pop();
    }
    /**
    * Return top of the stack (does not pop)
    * @example
    *   //stack contains [1,2,3,4,5,6]
    *   console.log(stack.peek());
    *   //Output: 6 (stack does not change)
    */
    peek() {
        return this._store[this._store.length - 1];
    }
    /**
    * Return first index (from top of the stack) of an item in stack
    * @example
    *   //stack contains [1,2,3,4,3,5]
    *   console.log(stack.search(3));
    *   //Output: 4
    */
    search(item) {
        return this._store.lastIndexOf(item);
    }
    /**
    * Returns true if stack is empty.
    * * @example
    *   //stack contains [1]
    *   console.log(stack.isEmpty());
    *   //Output: false
    *   stack.pop();
    *   console.log(stack.isEmpty());
    *   //Output: true
    */
    isEmpty() {
        return this._store.length == 0;
    }
}
exports.Stack = Stack;
