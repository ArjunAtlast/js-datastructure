"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var iterator_1 = require("../classes/iterator");
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
      Add an item to collection
    */
    AbstractCollection.prototype.add = function (item) {
        return !!this._store.push(item);
    };
    /**
      Add all items of an array to collection
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
      Removes all of the elements from this collection
    */
    AbstractCollection.prototype.clear = function () {
        this._store = [];
    };
    /**
      Returns true if this collection contains the specified element.
    */
    AbstractCollection.prototype.contains = function (item) {
        return this._store.some(function (ele) {
            return ele === item;
        });
    };
    /**
      Returns true if this collection contains all of the elements in the specified array.
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
      Compares the specified object with this collection for equality.
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
      Returns true if this collection contains no elements.
    */
    AbstractCollection.prototype.isEmpty = function () {
        return !this._store.length;
    };
    /**
      Removes a single instance of the specified element from this collection, if it is present
    */
    AbstractCollection.prototype.remove = function (item) {
        var i = this._store.indexOf(item);
        return (i != -1) && !!this._store.splice(i, 1);
    };
    /**
      Removes all of this collection's elements that are also contained in the specified array.
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
      Removes all of the elements of this collection that satisfy the given filter function.
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
      Retains only the elements in this collection that are contained in the specified array.
    */
    AbstractCollection.prototype.retainAll = function (items) {
        return this.removeIf(function (item) { return (items.indexOf(item) == -1); });
    };
    /**
      Returns the number of elements in this collection.
    */
    AbstractCollection.prototype.size = function () {
        return this._store.length;
    };
    /**
      Returns an array containing all of the elements in this collection
    */
    AbstractCollection.prototype.toArray = function () {
        return this._store.slice();
    };
    /**
      Performs an action for each item in this collection.
    */
    AbstractCollection.prototype.forEach = function (action) {
        var _this = this;
        this._store.forEach(function (item, index) {
            action(item, index, _this);
        });
    };
    /**
      Return iterator for this collection.
    */
    AbstractCollection.prototype.iterator = function () {
        return new iterator_1.Iterator(this._store);
    };
    return AbstractCollection;
}());
exports.AbstractCollection = AbstractCollection;
