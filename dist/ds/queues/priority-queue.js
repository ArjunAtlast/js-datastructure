"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const abstract_queue_1 = require("../abstract/abstract-queue");
/**
  An unbounded priority queue. The elements of the priority queue are ordered according to the compare function provided at queue construction time.
*/
class PriorityQueue extends abstract_queue_1.AbstractQueue {
    constructor(compareFn, ...items) {
        super(...items);
        this._comparator = compareFn;
        this._store.sort(compareFn);
    }
    /**
    * Inserts the specified item into this priority queue.
    * @example
    *   //queue containes [1,8,12] (compareFn designed for ascending order)
    *   queue.add(6); //[1,6,8,12]
    */
    add(item) {
        return super.add(item) && !!this._store.sort(this._comparator);
    }
    /**
    * Inserts all items of an array into this priority queue.
    * @example
    *   //queue containes [1,8,12] (compareFn designed for ascending order)
    *   queue.addAll([6,10,15]); //[1,6,8,10,12,15]
    */
    addAll(items) {
        return super.addAll(items) && !!this._store.sort(this._comparator);
    }
    /**
    * Returns the compare function used to order the elements in this queue.
    * @example
    *   queue.comparator(); //returns a function
    */
    comparator() {
        return this._comparator;
    }
    /**
    * Converts the queue into a JSON String
    * @example
    *   //queue contains [1,2,3,4]
    *   console.log(queue.toString((x)=>(x.toString())));
    *   //Output
    *   //[1,2,3,4]
    */
    toString(serializerFn) {
        return "[" + this._store.map((item) => {
            return serializerFn(item);
        }).join(",") + "]";
    }
    /**
    * Return the Object from the JSON string
    * @example
    *   //json = "[1,2,3,4]"
    *   queue = new PriorityQueue<number>((x,y)=>(x-y)).fromString(json,(x)=>(parseFloat(x)));
    *   //queue contains [1,2,3,4]
    *
    */
    fromString(json, deserializerFn) {
        let object = JSON.parse(json);
        let finalArr = object.map((x) => (deserializerFn(JSON.stringify(x))));
        return new this.constructor(this.comparator(), ...finalArr);
    }
}
exports.PriorityQueue = PriorityQueue;
