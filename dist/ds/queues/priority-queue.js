"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var abstract_queue_1 = require("../abstract/abstract-queue");
/**
  An unbounded priority queue. The elements of the priority queue are ordered according to the compare function provided at queue construction time.
*/
var PriorityQueue = /** @class */ (function (_super) {
    __extends(PriorityQueue, _super);
    function PriorityQueue(compareFn) {
        var items = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            items[_i - 1] = arguments[_i];
        }
        var _this = _super.apply(this, items) || this;
        _this._comparator = compareFn;
        _this._store.sort(compareFn);
        return _this;
    }
    /**
    * Inserts the specified item into this priority queue.
    * @example
    *   //queue containes [1,8,12] (compareFn designed for ascending order)
    *   queue.add(6); //[1,6,8,12]
    */
    PriorityQueue.prototype.add = function (item) {
        if (_super.prototype.add.call(this, item)) {
            this._store.sort(this._comparator);
            return true;
        }
        else
            return false;
    };
    /**
    * Inserts all items of an array into this priority queue.
    * @example
    *   //queue containes [1,8,12] (compareFn designed for ascending order)
    *   queue.addAll([6,10,15]); //[1,6,8,10,12,15]
    */
    PriorityQueue.prototype.addAll = function (items) {
        if (_super.prototype.addAll.call(this, items)) {
            this._store.sort(this._comparator);
            return true;
        }
        else
            return false;
    };
    /**
    * Returns the compare function used to order the elements in this queue.
    * @example
    *   queue.comparator(); //returns a function
    */
    PriorityQueue.prototype.comparator = function () {
        return this._comparator;
    };
    /**
    * Converts the queue into a JSON String
    * @example
    *   //queue contains [1,2,3,4]
    *   console.log(queue.toString());
    *   //Output
    *   //[1,2,3,4]
    */
    PriorityQueue.prototype.toString = function () {
        return "[" + this._store.map(function (item) {
            return item.toString();
        }).join(",") + "]";
    };
    /**
    * Return the Object from the JSON string
    * //json = "[1,2,3,4]"
    * queue = new PriorityQueue<number>().fromString(json,(x)=>(parseFloat(x)));
    * //queue contains [1,2,3,4]
    *
    */
    PriorityQueue.prototype.fromString = function (json, deserializerFn) {
        var object = JSON.parse(json);
        var finalArr = object.map(function (x) { return (deserializerFn(JSON.stringify(x))); });
        return new (PriorityQueue.bind.apply(PriorityQueue, [void 0, this.comparator()].concat(finalArr)))();
    };
    return PriorityQueue;
}(abstract_queue_1.AbstractQueue));
exports.PriorityQueue = PriorityQueue;
