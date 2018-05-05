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
var SwappableList = /** @class */ (function (_super) {
    __extends(SwappableList, _super);
    function SwappableList() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
    * Swap between items of given indexes. Returns true on success else false.
    * @example
    *   ////list contains [1,2,3,4]
    *   list.swap(1,3); //returns true
    *   //now list contains [1,4,3,2]
    */
    SwappableList.prototype.swap = function (sourceIndex, destinationIndex) {
        var destination = this.get(destinationIndex);
        var source = this.get(sourceIndex);
        if (destination != undefined && source != undefined) {
            this.set(destinationIndex, source);
            this.set(sourceIndex, destination);
            return true;
        }
        return false;
    };
    /**
    * Swap between item in the given index and the item just before it.
    * @example
    *   ////list contains [1,2,3,4]
    *   list.rise(2); //returns true
    *   //now list contains [1,3,2,4]
    */
    SwappableList.prototype.rise = function (index) {
        return this.swap(index, index - 1);
    };
    /**
    * Swap between item in the given index and the item just after it.
    * @example
    *   ////list contains [1,2,3,4]
    *   list.fall(2); //returns true
    *   //now list contains [1,2,4,3]
    */
    SwappableList.prototype.fall = function (index) {
        return this.rise(index + 1);
    };
    /**
    * Rotate the list based on the direction specified (-ve : left, +ve/0 : right);
    * @example
    *   //list contains [1,2,3,4]
    *   list.rotate(-1); //returns true
    *   //now list contains [2,3,4,1]
    */
    SwappableList.prototype.rotate = function (direction) {
        if (direction < 0) {
            var item = this._store.shift();
            if (item)
                this._store.push(item);
        }
        else {
            var item = this._store.pop();
            if (item)
                this._store.unshift(item);
        }
    };
    /**
    * Returns a shallow copy of this ArrayList instance.
    * @example
    *   let newList = swappableList.clone();
    */
    SwappableList.prototype.clone = function () {
        return new (SwappableList.bind.apply(SwappableList, [void 0].concat(this._store)))();
    };
    /**
    * Converts the list into a JSON String
    * @example
    *   //list contains [1,2,3,4]
    *   console.log(list.toString((x)=>(x.toString())));
    *   //Output
    *   //"[1,2,3,4]"
    */
    SwappableList.prototype.toString = function (serializerFn) {
        return "[" + this._store.map(function (item) {
            return serializerFn(item);
        }).join(",") + "]";
    };
    /**
    * Return the Object from the JSON string
    * @example
    *   //json = "[1,2,3,4]"
    *   list = new SwappableList<number>().fromString(json,(x)=>(parseFloat(x)));
    *   //list contains [1,2,3,4]
    *
    */
    SwappableList.prototype.fromString = function (json, deserializerFn) {
        var object = JSON.parse(json);
        var finalArr = object.map(function (x) { return (deserializerFn(JSON.stringify(x))); });
        return new (SwappableList.bind.apply(SwappableList, [void 0].concat(finalArr)))();
    };
    return SwappableList;
}(abstract_list_1.AbstractList));
exports.SwappableList = SwappableList;
