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
var abstract_map_1 = require("../abstract/abstract-map");
var ArrayMap = /** @class */ (function (_super) {
    __extends(ArrayMap, _super);
    function ArrayMap(initialCapacity) {
        if (initialCapacity === void 0) { initialCapacity = 10; }
        var items = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            items[_i - 1] = arguments[_i];
        }
        var _this = _super.apply(this, items.slice(0, initialCapacity)) || this;
        _this._capacity = 10;
        _this._capacity = initialCapacity;
        return _this;
    }
    /**
    * Associates the specified value with the specified key in this map.Returns the old value associated with the key or  undefined.
    * (Throws an Error if ArrayMap is at maximum capacity)
    * @example
    * //map : [{"one":1},{"two":2},{"three":3}]
    * map.put("one",22); //return 1
    * //now map : [{"one":22},{"two":2},{"three":3}]
    * map.put("four",4);//return undefined
    * //now map : [{"one":22},{"two":2},{"three":3},{"four":4}]
    */
    ArrayMap.prototype.put = function (key, value) {
        if (this.size() >= this._capacity) {
            throw new Error("Couldn't put item " + key + "=>" + value + "ArrayMap Overflow");
        }
        return _super.prototype.put.call(this, key, value);
    };
    /**
    * Increases the capacity of this ArrayMap instance, if necessary, to ensure that it can hold at least the number of elements specified by the minimum capacity argument.
    * @example
    *   //arrayMap has a capacity 10
    *   arrayMap.ensureCapacity(15);
    *   //new capacity is 15
    */
    ArrayMap.prototype.ensureCapacity = function (minCapacity) {
        this._capacity = Math.max(this._capacity, Math.floor(minCapacity));
    };
    /**
    * Returns a shallow copy of this ArrayMap instance.
    * @example
    *   let newArrayMap = arrayMap.clone();
    */
    ArrayMap.prototype.clone = function () {
        return new (ArrayMap.bind.apply(ArrayMap, [void 0, this._capacity].concat(this.entrySet().toArray())))();
    };
    /**
    * Trims the capacity of this ArrayMap instance to be the list's current size.
    * @example
    *   //arrayMap contains [{"one":1},{"two":2},{"three":3}] and capacity is 10
    *   arrayMap.trimToSize(); //new capacity is 3
    */
    ArrayMap.prototype.trimToSize = function () {
        this._capacity = this.size();
    };
    return ArrayMap;
}(abstract_map_1.AbstractMap));
exports.ArrayMap = ArrayMap;
