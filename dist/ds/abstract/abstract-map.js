"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const abstract_list_1 = require("./abstract-list");
const abstract_set_1 = require("./abstract-set");
class AbstractMap {
    constructor(...items) {
        this._values = new abstract_list_1.AbstractList(...items.map((x) => (x.value)));
        this._keys = new abstract_set_1.AbstractSet(...items.map((x) => (x.key)));
    }
    /**
    * Removes all of the mappings from this map.
    * @example
    * //map: [{"1":1},{"2":2},{"3":3}]
    * map.clear();
    * //now : []
    */
    clear() {
        this._keys.clear();
        this._values.clear();
    }
    /**
    * Attempts to compute a mapping for the specified key and its current mapped value.
    * @example
    *   //in map key k1 is mapped to 12
    *   map.compute(k1, (key,value,map)=>(value+11)); //returns 12
    *   //now the value changes to 12+11 -> 23
    */
    compute(key, remappingFn) {
        let oldValue = this.get(key);
        let newValue = remappingFn(key, oldValue, this);
        if (newValue != null)
            this.put(key, newValue);
        return oldValue;
    }
    /**
    * Attempts to compute a mapping for the specified key and its current mapped value.
    * @example
    *   //in map key k1 is mapped to 12
    *   map.computeIfAbsent(k1, (key,value,map)=>(23)); //returns 12
    *   //value does not change
    */
    computeIfAbsent(key, remappingFn) {
        let oldValue = this.get(key);
        if (oldValue === null || oldValue === undefined) {
            let newValue = remappingFn(key, oldValue, this);
            if (newValue != null)
                this.put(key, newValue);
        }
        return oldValue;
    }
    /**
    * Attempts to compute a mapping for the specified key and its current mapped value.
    * @example
    *   //in map key k1 is mapped to null
    *   map.computeIfAbsent(k1, (key,value,map)=>(value+11)); //returns null
    *   //value does not change
    */
    computeIfPresent(key, remappingFn) {
        let oldValue = this.get(key);
        if (oldValue !== null && oldValue !== undefined) {
            let newValue = remappingFn(key, oldValue, this);
            if (newValue != null)
                this.put(key, newValue);
        }
        return oldValue;
    }
    /**
    * Returns true if this map contains a mapping for the specified key.
    * @example
    *   //map : [{k1:1},{k2:2}]
    *   map.conainsKey(k1); //returns true
    *   map.containsKey(k5); //returns false
    */
    containsKey(key) {
        return this._keys.contains(key);
    }
    /**
    * Returns true if this map maps one or more keys to the specified value.
    * @example
    *   //map : [{k1:1},{k2:2}]
    *   map.conainsValue(1); //returns true
    *   map.containsValue(5); //returns false
    */
    containsValue(value) {
        return this._values.contains(value);
    }
    /**
    * Returns a Set view of the mappings contained in this map.
    * @example
    *   //map : [{k1:1},{k2:2}]
    *   map.entrySet(); //returns Set [{key:k1, value:1},{key:k2, value:2}]
    */
    entrySet() {
        let enSet = new abstract_set_1.AbstractSet();
        this._keys.forEach((k, index, set) => {
            let val = this.get(k);
            let entry = { key: k, value: val };
            enSet.add(entry);
        });
        return enSet;
    }
    /**
    * Compares the specified map with this map for equality.
    * @example
    *   //map1 : [{k1:1},{k2:2},{k3:null}]
    *   //map2 : [{k1:1},{k3:4}]
    *   map1.equals(map2) //returns false
    */
    equals(map) {
        //Comparing types of both collection
        if (map.constructor !== this.constructor)
            return false;
        //Compare size
        if (map.size() !== this.size())
            return false;
        //Compare each item;
        return map.keySet().toArray().every((key, index) => {
            return this.get(key) === map.get(key);
        });
    }
    /**
    * Performs the given action for each entry in this map until all entries have been processed or the action throws an exception.
    * @example
    *   //map : [{"one":1},{"two":2},{"three":3}]
    *   map.forEach((key, value, map)=>{
    *      console.log(key+"->"+value+",");
    *   });
    *   //Output: one->1,two->2,three->3
    */
    forEach(action) {
        this._keys.forEach((key, index) => {
            let val = this._values.get(index);
            action(key, val, this);
        });
    }
    /**
    * Returns the value to which the specified key is mapped. undefined if there is no mapping.
    * @example
    *   //map : [{k1:1},{k2:2},{k3:null}]
    *   map.get(k1); //returns 1
    *   map.get(k3); //returns null
    *   map.get(k4); //returns undefined
    */
    get(key) {
        let index = this._keys.toArray().indexOf(key);
        if (index == -1)
            return undefined;
        return this._values.get(index);
    }
    /**
    * Returns the value to which the specified key is mapped, or defaultValue if this map contains no mapping for the key or if key is mapped to null.
    * @example
    *   //map : [{k1:1},{k2:2},{k3:null}]
    *   map.getOrDefault(k1,5); //returns 1
    *   map.getOrDefault(k3,12); //returns 12
    *   map.getOrDefault(k4,16); //returns 16
    */
    getOrDefault(key, defaultValue) {
        return this.get(key) || defaultValue;
    }
    /**
    * Returns true if this map contains no key-value mappings.
    * @example
    *   //map : [{k1:1},{k2:2},{k3:null}]
    *   map.isEmpty(); //false
    *   //map : [{k1:null},{k2:null},{k3:null}]
    *   map.isEmpty(); //false
    *   //map : []
    *   map.isEmpty(); //true
    */
    isEmpty() {
        return this.values().isEmpty() || this.keySet().isEmpty();
    }
    /**
    * Returns true if this map contains mappings to only null values or if  the map is empty.
    * @example
    *   //map : [{k1:1},{k2:2},{k3:null}]
    *   map.isNull(); //false
    *   //map : [{k1:null},{k2:null},{k3:null}]
    *   map.isNull(); //true
    *   //map : []
    *   map.isNull(); //true
    */
    isNull() {
        return this.values().toArray().every((val) => (val === null));
    }
    /**
    * Returns a Set view of the keys contained in this map.
    * @example
    *   //map : [{"one":1},{"two":2},{"three":3}]
    *   map.keySet(); //["one","two","three"]
    */
    keySet() {
        return new abstract_set_1.AbstractSet(...this._keys.toArray());
    }
    /**
    * Associates the specified value with the specified key in this map.Returns the old value associated with the key or  undefined.
    * @example
    * //map : [{"one":1},{"two":2},{"three":3}]
    * map.put("one",22); //return 1
    * //now map : [{"one":22},{"two":2},{"three":3}]
    * map.put("four",4);//return undefined
    * //now map : [{"one":22},{"two":2},{"three":3},{"four":4}]
    */
    put(key, value) {
        if (this.containsKey(key)) {
            let oldValue = this.get(key);
            if (oldValue !== value) {
                let index = this._keys.toArray().indexOf(key);
                this._values.set(index, value);
            }
            return oldValue;
        }
        (this._keys.add(key) && this._values.add(value));
        return undefined;
    }
    /**
    * Copies all of the mappings from the specified map to this map.
    * @example
    *   //map1: [{k1:v1},{k2:v2},{k3:v3}], map2: [{k2:v4},{k4:v6},{k6:v8}]
    *   map1.putAll(map2);
    *   //now map1: [{k1:v1},{k2:v4},{k3:v3},{k4:v6},{k6:v8}]
    */
    putAll(map) {
        map.forEach((key, value, map) => {
            this.put(key, value);
        });
    }
    /**
    * If the specified key is not already associated with a value (or is mapped to null) associates it with the given value and returns undefined, else returns the current value.
    * @example
    *   //map : [{"one":1},{"two":2},{"three":3}]
    *   map.putIfAbsent("four",4); //return undefined (adds {"four":4} to the map)
    *   map.putIfAbsent("one",23); //return 1 (map unchanged)
    */
    putIfAbsent(key, value) {
        let oldValue = this.get(key);
        if (!oldValue)
            return this.put(key, value);
        else
            return oldValue;
    }
    /**
    * Removes the mapping for a key from this map if it is present.
    * @example
    *   //map : [{"one":1},{"two":2},{"three":3}]
    *   map.remove("one"); //return 1
    *   //now map : [{"two":2},{"three":3}]
    *   map.remove("four"); //return undefined (map unchanged)
    */
    remove(key) {
        if (this.containsKey(key)) {
            let index = this._keys.toArray().indexOf(key);
            this._keys.remove(key);
            return this._values.removeAt(index);
        }
        return undefined;
    }
    /**
    * Removes the entry for the specified key only if it is currently mapped to the specified value.
    * @example
    *   //map : [{"one":1},{"two":2},{"three":3}]
    *   map.removeIf("one", 1); //return true
    *   //now map : [{"two":2},{"three":3}]
    *   map.removeIf("two",5); //return false (map unchanged)
    *   map.removeIf("four",4); //return false
    */
    removeIf(key, value) {
        if (this.get(key) === value)
            return (this.remove(key) !== undefined);
        return false;
    }
    /**
    * Replace all entries with specified value with the new value. Returns true if map was changed.
    * @example
    *   //map : [{k1:1},{k2:5},{k3:3},{k4:5},{k5:1}]
    *   map.replace(5,2) //returns true;
    *   //now map : [{k1:1},{k2:2},{k3:3},{k4:2},{k5:1}]
    */
    replace(oldValue, newValue) {
        if (this.containsValue(oldValue)) {
            this.replaceAll((key, value, map) => {
                return (value === oldValue) ? newValue : value;
            });
            return true;
        }
        return false;
    }
    /**
    * Replaces each entry's value with the result of invoking the given function on that entry until all entries have been processed or the function throws an exception.
    * @example
    *   //map : [{k1:1},{k2:5},{k3:3},{k4:5},{k5:1}]
    *   map.replaceAll((k,v,m)=>(v*2)); //replace with its double
    *   //map : [{k1:2},{k2:10},{k3:6},{k4:10},{k5:2}]
    */
    replaceAll(remappingFn) {
        this.forEach((key, value, map) => {
            this.put(key, remappingFn(key, value, map));
        });
    }
    /**
    * Returns the number of key-value mappings in this map.(key->null mappings are counted)
    * @example
    *   //map : [{k1:1},{k2:5},{k3:3},{k4:5},{k5:1}]
    *   map.size(); //return 5
    */
    size() {
        return this._keys.size();
    }
    /**
    * Returns a List view of the values contained in this map.
    * //map : [{k1:1},{k2:5},{k3:3},{k4:5},{k5:1}]
    * map.values(); //return list : [1,5,3,5,1]
    */
    values() {
        return new abstract_list_1.AbstractList(...this._values.toArray());
    }
}
exports.AbstractMap = AbstractMap;
