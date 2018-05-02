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
var list_iterator_1 = require("../../classes/list-iterator");
/**
 An abstract implementation of List interface
*/
var AbstractList = /** @class */ (function (_super) {
    __extends(AbstractList, _super);
    function AbstractList() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return _super.apply(this, args) || this;
    }
    AbstractList.prototype.add = function (item, index) {
        if (index !== undefined) {
            return !!this._store.splice(index, 0, item);
        }
        else {
            return _super.prototype.add.call(this, item);
        }
    };
    AbstractList.prototype.addAll = function (items, index) {
        if (index != undefined) {
            return !!(_a = this._store).splice.apply(_a, [index, 0].concat(items));
        }
        else {
            return _super.prototype.addAll.call(this, items);
        }
        var _a;
    };
    /**
    * Read an item from the list
    * @example
    *   //list contains [1,2,3]
    *   console.log(list.get(2));
    *   //Output: 3
    */
    AbstractList.prototype.get = function (index) {
        return this._store[index];
    };
    /**
    * Returns the index of the first occurrence of the specified element in this list, or -1 if this list does not contain the element
    * @example
    *   //list contains [1,2,3,2,4]
    *   console.log(list.indexOf(2));
    *   //Output: 1
    */
    AbstractList.prototype.indexOf = function (item) {
        return this._store.indexOf(item);
    };
    /**
    * Returns the index of last occurrence of the element.
    *   //list contains [1,2,3,2,4]
    *   console.log(list.lastIndexOf(2));
    *   //Output: 3
    */
    AbstractList.prototype.lastIndexOf = function (item) {
        return this._store.lastIndexOf(item);
    };
    /**
    * Returns a list iterator over the elements in this list
    * @example
    *   var listIterator = list.listIterator(); //starts at index 0
    */
    AbstractList.prototype.listIterator = function (index) {
        if (index === void 0) { index = 0; }
        return new list_iterator_1.ListIterator(this._store, index);
    };
    /**
    * Removes the element at the specified position in this list.
    * @example
    *   //list contains [1,2,3]
    *   console.log(list.removeAt(1)); //[1,3]
    *   //Output: 2
    */
    AbstractList.prototype.removeAt = function (index) {
        return this._store.splice(index, 1)[0];
    };
    /**
    * Removes from this list all of the elements whose index is between fromIndex, inclusive, and toIndex, exclusive.
    * @example
    *   //list contains [1,2,3,4,5,6]
    *   console.log(list.removeRange(1,4)); //[1,5,6]
    *   //Output: [2,3,4]
    */
    AbstractList.prototype.removeRange = function (fromIndex, toIndex) {
        return this._store.splice(fromIndex, (toIndex - fromIndex));
    };
    /**
    * Replaces the element at the specified position in this list with the specified element
    * @example
    *   //list contains [1,2,3]
    *   console.log(list.set(1,2.5)); //[1,2.5,3]
    *   //Output: 2
    */
    AbstractList.prototype.set = function (index, item) {
        return this._store.splice(index, 1, item)[0];
    };
    /**
    * Sorts this list according to the compareFn.
    * compareFn is a function which should return a number value (-ve, zero, or +ve).
    * x is sorted as the lowest value if compareFn(x,y) is the lowest.
    * @example
    *   //list contains [1,8,6,2,7,3,9,11]
    *   list.sort(function(x,y) {
    *     return x-y;
    *   }); // [1, 2, 3, 6, 7, 8, 9, 11]
    *
    */
    AbstractList.prototype.sort = function (compareFn) {
        this._store.sort(compareFn);
    };
    /**
    * Returns a view of the portion of this list between the specified fromIndex, inclusive, and toIndex, exclusive.
    * @example
    *   //list contains [1,8,6,2,7,3,9,11]
    *   list.subList(2,7); // returns a list containing [6, 2, 7, 3, 9]
    */
    AbstractList.prototype.subList = function (fromIndex, toIndex) {
        return new (AbstractList.bind.apply(AbstractList, [void 0].concat(this._store.slice(fromIndex, toIndex))))();
    };
    return AbstractList;
}(abstract_collection_1.AbstractCollection));
exports.AbstractList = AbstractList;
