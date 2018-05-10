"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const abstract_collection_1 = require("./abstract-collection");
/**
  Abstract implementation of Queue interface
*/
class AbstractQueue extends abstract_collection_1.AbstractCollection {
    /**
    * Retrieves, but does not remove, the head of this queue
    * @example
    *   //queue has elements [1,2,3,4]
    *   console.log(queue.element());
    *   //Output: 1
    */
    element() {
        return this._store[0];
    }
    /**
    * Retrieves and removes the head of this queue.
    * @example
    *   //queue has elements [1,2,3,4]
    *   console.log(queue.element());
    *   //Output: 1 and queue now has elements [2,3,4]
    */
    poll() {
        return this._store.splice(0, 1)[0];
    }
}
exports.AbstractQueue = AbstractQueue;
