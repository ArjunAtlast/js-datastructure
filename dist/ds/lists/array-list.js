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
var abstract_list_1 = require("../abstract/abstract-list");
/**
  Resizable-array implementation of the List interface.
*/
var ArrayList = /** @class */ (function (_super) {
    __extends(ArrayList, _super);
    function ArrayList(initialCapacity) {
        if (initialCapacity === void 0) { initialCapacity = 10; }
        var items = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            items[_i - 1] = arguments[_i];
        }
        var _this = _super.apply(this, items.slice(0, initialCapacity)) || this;
        _this._capacity = Math.floor(initialCapacity);
        return _this;
    }
    ArrayList.prototype.add = function (item, index) {
        if (this.size() < this._capacity)
            return index ? _super.prototype.add.call(this, item, index) : _super.prototype.add.call(this, item);
        else
            return false;
    };
    ArrayList.prototype.addAll = function (items, index) {
        if (items.length <= this._capacity - this.size())
            return index ? _super.prototype.addAll.call(this, items, index) : _super.prototype.addAll.call(this, items);
        else
            return false;
    };
    /**
    * Increases the capacity of this ArrayList instance, if necessary, to ensure that it can hold at least the number of elements specified by the minimum capacity argument.
    * @example
    *   //arrayList has a capacity 10
    *   arrayList.ensureCapacity(15);
    *   //new capacity is 15
    */
    ArrayList.prototype.ensureCapacity = function (minCapacity) {
        this._capacity = Math.max(this._capacity, Math.floor(minCapacity));
    };
    /**
    * Replaces each element of this list with the result of applying the mapping function
    * @example
    *   //arrayList contains [1,2,3,4]
    *   arrayList.map((x)=>(x*2));
    *   //now arrayList contains [2,4,6,8]
    */
    ArrayList.prototype.replaceAll = function (mappingFn) {
        this._store = this._store.map(function (item) { return (mappingFn(item)); });
    };
    /**
    * Returns a shallow copy of this ArrayList instance.
    * @example
    *   let newArrayList = arrayList.clone();
    */
    ArrayList.prototype.clone = function () {
        return new (ArrayList.bind.apply(ArrayList, [void 0, this._capacity].concat(this._store)))();
    };
    /**
    * Trims the capacity of this ArrayList instance to be the list's current size.
    * @example
    *   //arrayList contains [1,2,3,4,5] and capacity is 10
    *   arrayList.trimToSize(); //new capacity is 5
    */
    ArrayList.prototype.trimToSize = function () {
        this._capacity = this.size();
    };
    /**
    * Converts the arrayList into a JSON String
    * @example
    *   //arrayList contains [1,2,3,4]
    *   console.log(arrayList.toString());
    *   //Output
    *   //"[1,2,3,4]"
    */
    ArrayList.prototype.toString = function (serializerFn) {
        return "[" + this._store.map(function (item) {
            return serializerFn(item);
        }).join(",") + "]";
    };
    /**
    * Return the Object from the JSON string
    * @example
    *   //json = "[1,2,3,4]"
    *   arrayList = new ArrayList<number>().fromString(json,(x)=>(parseFloat(x)));
    *   //arrayList contains [1,2,3,4]
    *
    */
    ArrayList.prototype.fromString = function (json, deserializerFn) {
        var object = JSON.parse(json);
        var finalArr = object.map(function (x) { return (deserializerFn(JSON.stringify(x))); });
        return new (ArrayList.bind.apply(ArrayList, [void 0, finalArr.length].concat(finalArr)))();
    };
    return ArrayList;
}(abstract_list_1.AbstractList));
exports.ArrayList = ArrayList;
