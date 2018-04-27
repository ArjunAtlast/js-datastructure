"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Iterator = /** @class */ (function () {
    function Iterator(target, index) {
        if (index === void 0) { index = 0; }
        this._index = 0;
        this._target = target;
        this._index = 0;
    }
    /**
      Performs the given action for each remaining element until all elements have been processed or the action throws an exception.
    */
    Iterator.prototype.forEachRemaining = function (action) {
        for (var i = this._index; i < this._target.length; i++) {
            action(this._target[i], i);
        }
    };
    /**
      Returns true if the iteration has more elements.
    */
    Iterator.prototype.hasNext = function () {
        return !(this._index == this._target.length);
    };
    /**
      Returns the next element in the iteration.
    */
    Iterator.prototype.next = function () {
        return this.hasNext() ? this._target[this._index++] : undefined;
    };
    /**
      Removes from the underlying Iterable the last element returned by this iterator.
    */
    Iterator.prototype.remove = function () {
        this._target.splice(--this._index, 1);
    };
    return Iterator;
}());
exports.Iterator = Iterator;
