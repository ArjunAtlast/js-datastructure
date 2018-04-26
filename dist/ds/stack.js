"use strict";
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
          Number of elements in stack
        */
        get: function () {
            return this._store.length;
        },
        enumerable: true,
        configurable: true
    });
    /**
      Push item to the top of the stack
    */
    Stack.prototype.push = function (item) {
        this._store.push(item);
    };
    /**
      Pop top of the stack and return
    */
    Stack.prototype.pop = function () {
        return this._store.pop();
    };
    /**
      return top of the stack (does not pop)
    */
    Stack.prototype.peek = function () {
        return this._store[this._store.length - 1];
    };
    /**
      return first index (from top of the stack) of an item in stack
    */
    Stack.prototype.search = function (item) {
        return this._store.lastIndexOf(item);
    };
    return Stack;
}());
exports.Stack = Stack;
