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
var abstract_set_1 = require("./abstract-set");
var AbstractSortedSet = /** @class */ (function (_super) {
    __extends(AbstractSortedSet, _super);
    function AbstractSortedSet(compareFn) {
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
    * Adds the specified element to this set if it is not already present
    * @example
    *   //set contains [1,3,6,8] //compareFn is ascending
    *   set.add(4); //set: [1,3,4,6,8]
    */
    AbstractSortedSet.prototype.add = function (item) {
        if (_super.prototype.add.call(this, item)) {
            this._store.sort(this._comparator);
            return true;
        }
        else
            return false;
    };
    /**
    * Inserts all items of an array into this set.
    * @example
    *   //set containes [1,8,12] (compareFn designed for ascending order)
    *   set.addAll([6,10,15]); //[1,6,8,10,12,15]
    */
    AbstractSortedSet.prototype.addAll = function (items) {
        if (_super.prototype.addAll.call(this, items)) {
            this._store.sort(this._comparator);
            return true;
        }
        else
            return false;
    };
    /**
    * Returns the compare function used to order the elements in this set.
    * @example
    *   set.comparator(); //returns a function
    */
    AbstractSortedSet.prototype.comparator = function () {
        return this._comparator;
    };
    /**
    * Returns the first (lowest) element currently in this set.
    * @example
    *   //set contains [1,2,3,4]
    *   set.first()
    */
    AbstractSortedSet.prototype.first = function () {
        return this._store[0];
    };
    /**
    * Returns the last (highest) element currently in this set.
    * @example
    *   //set contains [1,2,3,4]
    *   set.last();
    */
    AbstractSortedSet.prototype.last = function () {
        return this._store[this.size() - 1];
    };
    /**
    * Returns a view of the portion of this set whose elements range from fromElement, inclusive, to toElement, exclusive.
    * @example
    *   //set contains [1,2,3,4,5,6,7,8,9,10]
    *   set.subSet(4,9) //returns set : [4,5,6,7,8]
    */
    AbstractSortedSet.prototype.subSet = function (fromItem, toItem) {
        var _this = this;
        var subArray = this._store.filter(function (x) {
            return (_this._comparator(x, fromItem) >= 0) && (_this._comparator(x, toItem) < 0);
        });
        return new (AbstractSortedSet.bind.apply(AbstractSortedSet, [void 0, this.comparator()].concat(subArray)))();
    };
    /**
    * Returns a view of the portion of this set whose elements are strictly less than toElement.
    * @example
    *   //set : [1,2,3,5,7,9]
    *   set.headSet(6) //returns set : [1,2,3,5]
    */
    AbstractSortedSet.prototype.headSet = function (toItem) {
        return this.subSet(this.first(), toItem);
    };
    /**
    * Returns a view of the portion of this set whose elements are greater than or equal to fromElement.
    * @example
    *   //set : [1,2,3,5,7,9]
    *   set.tailSet(4) //returns set : [5,7,9]
    */
    AbstractSortedSet.prototype.tailSet = function (fromItem) {
        var _this = this;
        var subArray = this._store.filter(function (x) {
            return (_this._comparator(x, fromItem) > 0) && (_this._comparator(x, _this.last()) <= 0);
        });
        return new (AbstractSortedSet.bind.apply(AbstractSortedSet, [void 0, this.comparator()].concat(subArray)))();
    };
    return AbstractSortedSet;
}(abstract_set_1.AbstractSet));
exports.AbstractSortedSet = AbstractSortedSet;
