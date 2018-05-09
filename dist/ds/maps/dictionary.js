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
var abstract_set_1 = require("../abstract/abstract-set");
/**
  A Map whose keys are always of string type.
*/
var Dictionary = /** @class */ (function (_super) {
    __extends(Dictionary, _super);
    function Dictionary() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
    * Returns the number occurances of an item in the dictionary
    * @example
    *   //dict contains [{'a':1},{'b':2},{'c':3},{'d':2},{'f':1},{'e':2},{'g':4}]
    *   dict.count(2) // returns 3
    *   dict.count(7) // return 0
    */
    Dictionary.prototype.count = function (item) {
        var count = 0;
        if (this.containsValue(item)) {
            this.forEach(function (key, value, map) {
                if (value === item)
                    count++;
            });
        }
        return count;
    };
    /**
    * Returns a set of keys associated with a given item
    * @example
    *   //dict contains [{'a':1},{'b':2},{'c':3},{'d':2},{'f':1},{'e':2},{'g':4}]
    *   dict.getKeys(2) //return a set containing ['b','d','e']
    */
    Dictionary.prototype.getKeys = function (item) {
        var keys = new abstract_set_1.AbstractSet();
        if (this.containsValue(item)) {
            this.forEach(function (key, value, map) {
                if (value === item)
                    keys.add(key);
            });
        }
        return keys;
    };
    /**
    * Returns a shallow copy of this Dictionary instance.
    * @example
    *   let newDict = dict.clone();
    */
    Dictionary.prototype.clone = function () {
        return new (Dictionary.bind.apply(Dictionary, [void 0].concat(this.entrySet().toArray())))();
    };
    /**
    * Converts the dictionary into a JSON String
    * @example
    *   //dictionary contains [{'a':1},{'b':2},{'c':3}]
    *   console.log(arrayList.toString((x)=>(x.toString())));
    *   //Output
    *   //'{"a":1,"b":2,"c":3}'
    */
    Dictionary.prototype.toString = function (serializerFn) {
        var ret = [];
        this.forEach(function (key, value, map) {
            ret.push("\"" + key + "\":" + serializerFn(value));
        });
        return "{" + ret.join(",") + "}";
    };
    /**
    * Return the Object from the JSON string
    * @example
    *   //json = '{"a":1,"b":2,"c":3}'
    *   dict = new Dictionary<number>().fromString(json,(x)=>(parseFloat(x)));
    *   //dict contains [{'a':1},{'b':2},{'c':3}]
    *
    */
    Dictionary.prototype.fromString = function (json, deserializerFn) {
        var jsonObject = JSON.parse(json);
        var dict = new Dictionary();
        for (var k in jsonObject) {
            dict.put(k, deserializerFn(JSON.stringify(jsonObject[k])));
        }
        return dict;
    };
    return Dictionary;
}(abstract_map_1.AbstractMap));
exports.Dictionary = Dictionary;
