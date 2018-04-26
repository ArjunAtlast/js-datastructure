"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var iterator_1 = require("../classes/iterator");
var Queue = /** @class */ (function () {
    function Queue() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this._store = args.slice();
    }
    Object.defineProperty(Queue.prototype, "front", {
        /**
          Return front of the queue
        */
        get: function () {
            return this._store[0];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Queue.prototype, "rear", {
        /**
          Return rear of the queue
        */
        get: function () {
            return this._store[this._store.length - 1];
        },
        enumerable: true,
        configurable: true
    });
    /**
      Add item to the end of the queue
    */
    Queue.prototype.enqueue = function (item) {
        this._store.push(item);
    };
    /**
      Remove item from the beginning of the queue and return
    */
    Queue.prototype.dequeue = function () {
        return this._store.shift();
    };
    /**
      Do an action for each item in queue
    */
    Queue.prototype.forEach = function (action) {
        var _this = this;
        this._store.forEach(function (item, index) {
            action(item, index, _this);
        });
    };
    /**
      Return iterator for the queue
    */
    Queue.prototype.iterator = function () {
        return new iterator_1.Iterator(this._store);
    };
    return Queue;
}());
exports.Queue = Queue;
