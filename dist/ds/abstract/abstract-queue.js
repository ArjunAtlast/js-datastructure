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
var abstract_collection_1 = require("./abstract-collection");
var AbstractQueue = /** @class */ (function (_super) {
    __extends(AbstractQueue, _super);
    function AbstractQueue() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
    * Retrieves, but does not remove, the head of this queue
    * @example
    *   //queue has elements [1,2,3,4]
    *   console.log(queue.element());
    *   //Output: 1
    */
    AbstractQueue.prototype.element = function () {
        return this._store[0];
    };
    /**
    * Retrieves and removes the head of this queue.
    * @example
    *   //queue has elements [1,2,3,4]
    *   console.log(queue.element());
    *   //Output: 1 and queue now has elements [2,3,4]
    */
    AbstractQueue.prototype.poll = function () {
        return this._store.splice(0, 1)[0];
    };
    return AbstractQueue;
}(abstract_collection_1.AbstractCollection));
exports.AbstractQueue = AbstractQueue;
