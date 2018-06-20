"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const abstract_map_1 = require("../abstract/abstract-map");
class ArrayMap extends abstract_map_1.AbstractMap {
    constructor(initialCapacity = 10, ...items) {
        super(...items.slice(0, initialCapacity));
        this._capacity = 10;
        this._capacity = initialCapacity;
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
    put(key, value) {
        if (this.size() >= this._capacity) {
            throw new Error(`Couldn't put item ${key}=>${value}ArrayMap Overflow`);
        }
        return super.put(key, value);
    }
    /**
    * Increases the capacity of this ArrayMap instance, if necessary, to ensure that it can hold at least the number of elements specified by the minimum capacity argument.
    * @example
    *   //arrayMap has a capacity 10
    *   arrayMap.ensureCapacity(15);
    *   //new capacity is 15
    */
    ensureCapacity(minCapacity) {
        this._capacity = Math.max(this._capacity, Math.floor(minCapacity));
    }
    /**
    * Returns a shallow copy of this ArrayMap instance.
    * @example
    *   let newArrayMap = arrayMap.clone();
    */
    clone() {
        return new this.constructor(this._capacity, ...this.entrySet().toArray());
    }
    /**
    * Trims the capacity of this ArrayMap instance to be the list's current size.
    * @example
    *   //arrayMap contains [{"one":1},{"two":2},{"three":3}] and capacity is 10
    *   arrayMap.trimToSize(); //new capacity is 3
    */
    trimToSize() {
        this._capacity = this.size();
    }
    /**
     * Returns a sub map of the current map based on the selection function
     * @example
     *  //arrayMap contains [{"one":1},{"two":2},{"three":3}]
     *  arrayMap.subMap((k,v) => (v<=2)); //returns [{"one":1},{"two":2}]
    */
    subMap(selectionFn) {
        let sMap = new this.constructor(this._capacity);
        this.forEach((k, v, m) => {
            if (selectionFn(k, v, m))
                sMap.put(k, v);
        });
        return sMap;
    }
}
exports.ArrayMap = ArrayMap;
