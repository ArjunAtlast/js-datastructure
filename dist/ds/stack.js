"use strict";
/** Create a Stack (LIFO) datastructure. */
Object.defineProperty(exports, "__esModule", { value: true });
var Stack = /** @class */ (function () {
    function Stack() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this._store = args.slice();
    }
    Object.defineProperty(Stack.prototype, "height", {
        /**
        * Number of elements in stack
        * @example
        *   //stack contains [1,2,3,4]
        *   console.log(stack.height);
        *   //Output: 4
        */
        get: function () {
            return this._store.length;
        },
        enumerable: true,
        configurable: true
    });
    /**
    * Push item/items to the top of the stack
    * @example
    *   //stack contains [1,2,3,4]
    *   stack.push(5);
    *   //now stack contains [1,2,3,4,5]
    *   stack.push(6,7);
    *   //now stack contains [1,2,3,4,5,6,7]
    */
    Stack.prototype.push = function () {
        var items = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            items[_i] = arguments[_i];
        }
        (_a = this._store).push.apply(_a, items);
        var _a;
    };
    /**
    * Pop top of the stack and return
    * @example
    *   //stack contains [1,2,3,4,5,6,7]
    *   console.log(stack.pop());
    *   //Output: 7
    *   //now stack contains [1,2,3,4,5,6]
    */
    Stack.prototype.pop = function () {
        return this._store.pop();
    };
    /**
    * Return top of the stack (does not pop)
    * @example
    *   //stack contains [1,2,3,4,5,6]
    *   console.log(stack.peek());
    *   //Output: 6 (stack does not change)
    */
    Stack.prototype.peek = function () {
        return this._store[this._store.length - 1];
    };
    /**
    * Return first index (from top of the stack) of an item in stack
    * @example
    *   //stack contains [1,2,3,4,3,5]
    *   console.log(stack.search(3));
    *   //Output: 4
    */
    Stack.prototype.search = function (item) {
        return this._store.lastIndexOf(item);
    };
    return Stack;
}());
exports.Stack = Stack;
