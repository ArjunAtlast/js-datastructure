"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var iterator_1 = require("../classes/iterator");
/** Creates a simple Queue (FIFO) datastructure */
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
        * Return front of the queue
        * @example
        *   //queue contains [1,2,3,4]
        *   console.log(queue.front);
        *   //Output: 1
        */
        get: function () {
            return this._store[0];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Queue.prototype, "rear", {
        /**
        * Return rear of the queue
        * @example
        *   //queue contains [1,2,3,4]
        *   console.log(queue.rear);
        *   //Output: 4
        */
        get: function () {
            return this._store[this._store.length - 1];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Queue.prototype, "length", {
        /**
        * Returns size of the queue
        * @example
        *   //queue contains [1,2,3,4]
        *   console.log(queue.length);
        *   //Output: 4
        */
        get: function () {
            return this._store.length;
        },
        enumerable: true,
        configurable: true
    });
    /**
    * Add item to the end of the queue
    * @example
    *   //queue contains [1,2,3,4]
    *   queue.enqueue(5);
    *   //now queue contains [1,2,3,4,5]
    */
    Queue.prototype.enqueue = function (item) {
        this._store.push(item);
    };
    /**
    * Remove item from the beginning of the queue and return
    * @example
    *   //queue contains [1,2,3,4,5]
    *   console.log(queue.dequeue());
    *   //Output: 5
    *   //now queue contains [1,2,3,4]
    */
    Queue.prototype.dequeue = function () {
        return this._store.shift();
    };
    /**
    * Do an action for each item in queue
    * @example
    *   //queue contains [1,2,3,4]
    *   queue.forEach(function(item) {
    *     console.log(item + 4);
    *   });
    *   //Output: 5 6 7 8
    */
    Queue.prototype.forEach = function (action) {
        var _this = this;
        this._store.forEach(function (item, index) {
            action(item, index, _this);
        });
    };
    /**
    * Return iterator for the queue
    * @example
    *   var iterator = queue.iterator(); //returns an Iterator for the queue
    */
    Queue.prototype.iterator = function () {
        return new iterator_1.Iterator(this._store);
    };
    return Queue;
}());
exports.Queue = Queue;
