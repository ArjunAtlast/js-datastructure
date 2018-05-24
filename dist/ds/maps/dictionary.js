"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const abstract_map_1 = require("../abstract/abstract-map");
const abstract_set_1 = require("../abstract/abstract-set");
/**
  A Map whose keys are always of string type.
*/
class Dictionary extends abstract_map_1.AbstractMap {
    /**
    * Returns the number occurances of an item in the dictionary
    * @example
    *   //dict contains [{'a':1},{'b':2},{'c':3},{'d':2},{'f':1},{'e':2},{'g':4}]
    *   dict.count(2) // returns 3
    *   dict.count(7) // return 0
    */
    count(item) {
        let count = 0;
        if (this.containsValue(item)) {
            this.forEach((key, value, map) => {
                if (value === item)
                    count++;
            });
        }
        return count;
    }
    /**
    * Returns a set of keys associated with a given item
    * @example
    *   //dict contains [{'a':1},{'b':2},{'c':3},{'d':2},{'f':1},{'e':2},{'g':4}]
    *   dict.getKeys(2) //return a set containing ['b','d','e']
    */
    getKeys(item) {
        let keys = new abstract_set_1.AbstractSet();
        if (this.containsValue(item)) {
            this.forEach((key, value, map) => {
                if (value === item)
                    keys.add(key);
            });
        }
        return keys;
    }
    /**
    * Returns a shallow copy of this Dictionary instance.
    * @example
    *   let newDict = dict.clone();
    */
    clone() {
        return new Dictionary(...this.entrySet().toArray());
    }
    /**
    * Converts the dictionary into a JSON String
    * @example
    *   //dictionary contains [{'a':1},{'b':2},{'c':3}]
    *   console.log(arrayList.toString((x)=>(x.toString())));
    *   //Output
    *   //'{"a":1,"b":2,"c":3}'
    */
    toString(serializerFn) {
        let ret = [];
        this.forEach((key, value, map) => {
            ret.push(`"${key}":${serializerFn(value)}`);
        });
        return `{${ret.join(",")}}`;
    }
    /**
    * Return the Object from the JSON string
    * @example
    *   //json = '{"a":1,"b":2,"c":3}'
    *   dict = new Dictionary<number>().fromString(json,(x)=>(parseFloat(x)));
    *   //dict contains [{'a':1},{'b':2},{'c':3}]
    *
    */
    fromString(json, deserializerFn) {
        let jsonObject = JSON.parse(json);
        let dict = new this.constructor();
        for (let k in jsonObject) {
            dict.put(k, deserializerFn(JSON.stringify(jsonObject[k])));
        }
        return dict;
    }
}
exports.Dictionary = Dictionary;
