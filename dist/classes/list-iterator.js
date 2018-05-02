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
var iterator_1 = require("./iterator");
/** Iterator modified to iterate over lists*/
var ListIterator = /** @class */ (function (_super) {
    __extends(ListIterator, _super);
    function ListIterator() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.lastIndex = -1;
        return _this;
    }
    /**
    * Inserts the specified element into the list.
    * @example
    *   //target contains [1,5,11,26] and iterator pointer between 11 and 26
    *   iterator.add(25);
    *   //new list contains [1,5,11,25,26]
    */
    ListIterator.prototype.add = function (item) {
        this._target.splice(this._index, 0, item);
        this.lastIndex = -1;
    };
    /**
    * Returns the next element in the iteration.
    * @example
    *   //target contains [1,5,11,26] and iterator pointer between 5 and 11
    *   console.log(iterator.next());
    *   //Output: 11
    */
    ListIterator.prototype.next = function () {
        if (this.hasNext()) {
            this.lastIndex = this._index;
            return this._target[this._index++];
        }
        return undefined;
    };
    /**
    * Returns true if this list iterator has more elements when traversing the list in the reverse direction.
    * @example
    *   //target contains [1,5,11,26] and iterator pointer before 1
    *   console.log(iterator.hasPrevious());
    *   //Output: false
    */
    ListIterator.prototype.hasPrevious = function () {
        return !(this._index == 0);
    };
    /**
    * Returns the previous element in the list and moves the cursor position backwards.
    * @example
    *   //target contains [1,5,11,26] and iterator pointer between 11 and 26
    *   console.log(iterator.previous());
    *   //Output: 11
    */
    ListIterator.prototype.previous = function () {
        if (this.hasPrevious()) {
            this.lastIndex = this._index - 1;
            return this._target[--this._index];
        }
        return undefined;
    };
    /**
    * Returns the index of the element that would be returned by a subsequent call to next().
    * @example
    *   //target contains [1,5,11,26] and iterator pointer between 11 and 26
    *   console.log(iterator.nextIndex());
    *   //Output: 3
    *   iterator.next();
    *   console.log(iterator.nextIndex());
    *   //Output: -1
    */
    ListIterator.prototype.nextIndex = function () {
        return this.hasNext() ? (this._index) : -1;
    };
    /**
    * Returns the index of the element that would be returned by a subsequent call to previous().
    * @example
    *   //target contains [1,5,11,26] and iterator pointer between 11 and 26
    *   console.log(iterator.previousIndex());
    *   //Output: 2
    */
    ListIterator.prototype.previousIndex = function () {
        return this.hasPrevious() ? (this._index - 1) : -1;
    };
    /**
    * Replaces the last element returned by next() or previous() with the specified element.
    * @example
    *   //target contains [1,5,11,26] and iterator pointer between 5 and 11
    *   iterator.next(); //returns 11
    *   iterator.set(15);
    *   //now target contains [1,5,15,26]
    */
    ListIterator.prototype.set = function (item) {
        if (this.lastIndex != -1) {
            this._target[this.lastIndex] = item;
        }
    };
    /**
    * Removes from the underlying Iterable the last element returned by this iterator.
    * @example
    *   //target contains [1,5,11,26] and iterator pointer between 5 and 11
    *   iterator.previous(); //returns 5
    *   iterator.remove(); //removes 5
    *   //now target contains [1,11,26]
    */
    ListIterator.prototype.remove = function () {
        _super.prototype.remove.call(this);
        this.lastIndex = -1;
    };
    return ListIterator;
}(iterator_1.Iterator));
exports.ListIterator = ListIterator;
