"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var iterator_1 = require("../../classes/iterator");
/**
 An abstract implementation of Collection interface
*/
var AbstractCollection = /** @class */ (function () {
    function AbstractCollection() {
        var items = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            items[_i] = arguments[_i];
        }
        this._store = [];
        this._store = items.slice();
    }
    /**
    * Add an item to this collection
    * @example
    *   //collection contains [1,2,3,4]
    *   collection.add(5);
    *   //now collection contains [1,2,3,4,5]
    */
    AbstractCollection.prototype.add = function (item) {
        return !!this._store.push(item);
    };
    /**
    * Add all items of an array to this collection
    * @example
    *   //collection contains [1,2,3,4,5]
    *   collection.addAll([6,7]);
    *   //now collection contains [1,2,3,4,5,6,7]
    */
    AbstractCollection.prototype.addAll = function (items) {
        var _this = this;
        var flag = true;
        items.forEach(function (item) {
            flag = _this.add(item) || flag;
        });
        return flag;
    };
    /**
    * Removes all the elements
    * @example
    *   //collection contains [1,2,3]
    *   collection.clear();
    *   //now collection contains []
    */
    AbstractCollection.prototype.clear = function () {
        this._store = [];
    };
    /**
    * Returns true if this collection contains the specified element.
    * @example
    *   //collection contains [1,2,3]
    *   console.log(collection.contains(3));
    *   //Output: true
    */
    AbstractCollection.prototype.contains = function (item) {
        return this._store.some(function (ele) {
            return ele === item;
        });
    };
    /**
    * Returns true if this collection contains all of the elements in the specified array.
    * @example
    *   //collection contains [1,2,3]
    *   console.log(collection.contains([1,2,4]));
    *   //Output: false
    */
    AbstractCollection.prototype.containsAll = function (items) {
        for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
            var item = items_1[_i];
            if (!this.contains(item))
                return false;
        }
        return !!items.length;
    };
    /**
    * Compares the specified object with this collection for equality.
    * @example
    *   //collection1 contains [1,2,3] and collection2 contains [1,2,3]
    *   console.log(collection1.equals(collection2));
    *   //Output: true
    */
    AbstractCollection.prototype.equals = function (collection) {
        var _this = this;
        //Comparing types of both collection
        if (collection.constructor !== this.constructor)
            return false;
        //Compare size
        if (collection.size() !== this.size())
            return false;
        //Compare each item;
        return collection.toArray().every(function (item, index) {
            return (_this._store[index] === item);
        });
    };
    /**
    * Returns true if this collection contains no elements.
    * @example
    *   //collection contains [1,2,3]
    *   console.log(collection.isEmpty());
    *   //Output: false
    */
    AbstractCollection.prototype.isEmpty = function () {
        return !this._store.length;
    };
    /**
    * Removes a single instance of the specified element from this collection, if it is present
    * @example
    *   //collection contains [1,2,3]
    *   collection.remove(3);
    *   //now collection contains [1,2]
    */
    AbstractCollection.prototype.remove = function (item) {
        var i = this._store.indexOf(item);
        return (i != -1) && !!this._store.splice(i, 1);
    };
    /**
    * Removes all of this collection's elements that are also contained in the specified array.
    * @example
    *   //collection contains [1,2,3,4]
    *   collection.removeAll([1,3,5,7]);
    *   //now collection contains [2,4]
    */
    AbstractCollection.prototype.removeAll = function (items) {
        var _this = this;
        var flag = false;
        items.forEach(function (item) {
            flag = (_this.contains(item) && _this.remove(item)) || flag;
        });
        return flag;
    };
    /**
    * Removes all of the elements of this collection that satisfy the given filter function.
    * @example
    * //collection contains [1,2,3,4,5,6,7,8,9]
    * collection.removeIf(function(x) {
    *   return (x%2==0);
    * }); //removing even numbers
    * //now collection contains [1,3,5,7,9]
    */
    AbstractCollection.prototype.removeIf = function (filterFn) {
        var _this = this;
        var flag = false;
        this._store = this._store.filter(function (item, index) {
            var fl = filterFn(item, index, _this);
            flag = flag || fl;
            return !fl;
        });
        return flag;
    };
    /**
    * Retains only the elements in this collection that are contained in the specified array.
    * @example
    *   //collection contains [1,2,3,4]
    *   collection.retainAll([1,3,5,7]);
    *   //now collection contains [1,3]
    */
    AbstractCollection.prototype.retainAll = function (items) {
        return this.removeIf(function (item) { return (items.indexOf(item) == -1); });
    };
    /**
    * Returns the number of elements in this collection.
    * @example
    *   //collection contains [1,2,3,4]
    *   console.log(collection.size());
    *   //Output: 4
    */
    AbstractCollection.prototype.size = function () {
        return this._store.length;
    };
    /**
    * Returns an array containing all of the elements in this collection
    * @example
    *   //collection contains [1,2,3,4]
    *   console.log(collection.toArray());
    *   //Output: [1,2,3,4]
    */
    AbstractCollection.prototype.toArray = function () {
        return this._store.slice();
    };
    /**
    * Performs an action for each item in this collection.
    * @example
    *   //collection contains [1,2,3,4]
    *   collection.forEach(function(item) {
    *     console.log(item * 4);
    *   });
    *   //Output: 4 8 12 16
    */
    AbstractCollection.prototype.forEach = function (action) {
        var _this = this;
        this._store.forEach(function (item, index) {
            action(item, index, _this);
        });
    };
    /**
    * Returns an iterator for the collection
    * @example
    *   var iterator = collection.iterator(); //returns an Iterator for the collection
    */
    AbstractCollection.prototype.iterator = function () {
        return new iterator_1.Iterator(this._store);
    };
    return AbstractCollection;
}());
exports.AbstractCollection = AbstractCollection;
