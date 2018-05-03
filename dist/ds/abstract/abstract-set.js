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
/**
* Abstract implementation of Set interface.
*/
var AbstractSet = /** @class */ (function (_super) {
    __extends(AbstractSet, _super);
    function AbstractSet() {
        var items = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            items[_i] = arguments[_i];
        }
        var _this = this;
        var uniqueItems = items.filter(function (item, index, self) { return (self.indexOf(item) === index); });
        _this = _super.apply(this, uniqueItems) || this;
        return _this;
    }
    /**
    * Adds the specified element to this set if it is not already present
    * @example
    *   //set contains [1,2,3,4,5]
    *   set.add(6); //returns true and now set contains [1,2,3,4,5,6]
    *   set.add(5); //returns false since 5 is already in the set.
    */
    AbstractSet.prototype.add = function (item) {
        if (!this.contains(item))
            return _super.prototype.add.call(this, item);
        else
            return false;
    };
    /**
    * Adds all of the elements in the specified collection to this set if they're not already present
    * @example
    *   //set contains [1,2,3,4,5]
    *   set.add([4,5,6]); //returns true and now set contains [1,2,3,4,5,6]
    *   set.add([5,6]); //returns false since 5 and 6 are already in the set.
    */
    AbstractSet.prototype.addAll = function (items) {
        var _this = this;
        var newItems = items.filter(function (item) { return (!_this.contains(item)); });
        if (newItems.length > 0)
            return _super.prototype.addAll.call(this, items);
        else
            return false;
    };
    /**
    * Returns a new set created by union of this set and the set specified
    * @example
    *   //set1 : [1,2,3,4] and set2 : [4,5,6,7]
    *   set1.union(set2); //returns a new set : [1,2,3,4,5,6,7]
    */
    AbstractSet.prototype.union = function (set) {
        var unionArray = this.toArray().concat(set.toArray());
        return new (AbstractSet.bind.apply(AbstractSet, [void 0].concat(unionArray)))();
    };
    /**
    * Returns a new set created by intersection of this set and the set specified
    * @example
    *   //set1 : [1,2,3,4,5] and set2 : [4,5,6,7]
    *   set1.intersection(set2); //returns a new set : [4,5]
    */
    AbstractSet.prototype.intersection = function (set) {
        var _this = this;
        var intersectionArray = set.toArray().filter(function (item) { return (_this.contains(item)); });
        return new (AbstractSet.bind.apply(AbstractSet, [void 0].concat(intersectionArray)))();
    };
    /**
    * Returns a new set created by subtracting the specified set from this set.
    * @example
    *   //set1 : [1,2,3,4,5] and set2 : [4,5,6,7]
    *   set1.difference(set2); //returns a new set : [1,2,3]
    */
    AbstractSet.prototype.difference = function (set) {
        var diffArray = this.toArray().filter(function (item) { return (!set.contains(item)); });
        return new (AbstractSet.bind.apply(AbstractSet, [void 0].concat(diffArray)))();
    };
    /**
    * Returns a new set created by exclusion of this set and the set specified.
    * @example
    *   //set1 : [1,2,3,4,5] and set2 : [4,5,6,7]
    *   set1.difference(set2); //returns a new set : [1,2,3,6,7]
    */
    AbstractSet.prototype.exclusion = function (set) {
        var exclusionArray = this.union(set).difference(this.intersection(set)).toArray();
        return new (AbstractSet.bind.apply(AbstractSet, [void 0].concat(exclusionArray)))();
    };
    return AbstractSet;
}(abstract_collection_1.AbstractCollection));
exports.AbstractSet = AbstractSet;
