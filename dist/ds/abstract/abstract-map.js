"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var abstract_list_1 = require("./abstract-list");
var abstract_set_1 = require("./abstract-set");
var AbstractMap = /** @class */ (function () {
    function AbstractMap() {
        var items = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            items[_i] = arguments[_i];
        }
        this._values = new (abstract_list_1.AbstractList.bind.apply(abstract_list_1.AbstractList, [void 0].concat(items.map(function (x) { return (x.value); }))))();
        this._keys = new (abstract_set_1.AbstractSet.bind.apply(abstract_set_1.AbstractSet, [void 0].concat(items.map(function (x) { return (x.key); }))))();
    }
    /**
    * Removes all of the mappings from this map.
    * @example
    * //map: [{"1":1},{"2":2},{"3":3}]
    * map.clear();
    * //now : []
    */
    AbstractMap.prototype.clear = function () {
        this._keys.clear();
        this._values.clear();
    };
    /**
    * Attempts to compute a mapping for the specified key and its current mapped value.
    * @example
    *   //in map key k1 is mapped to 12
    *   map.compute(k1, (key,value,map)=>(value+11)); //returns 12
    *   //now the value changes to 12+11 -> 23
    */
    AbstractMap.prototype.compute = function (key, remappingFn) {
        var oldValue = this.get(key);
        var newValue = remappingFn(key, oldValue, this);
        if (newValue != null)
            this.put(key, newValue);
        return oldValue;
    };
    /**
    * Attempts to compute a mapping for the specified key and its current mapped value.
    * @example
    *   //in map key k1 is mapped to 12
    *   map.computeIfAbsent(k1, (key,value,map)=>(23)); //returns 12
    *   //value does not change
    */
    AbstractMap.prototype.computeIfAbsent = function (key, remappingFn) {
        var oldValue = this.get(key);
        if (oldValue === null || oldValue === undefined) {
            var newValue = remappingFn(key, oldValue, this);
            if (newValue != null)
                this.put(key, newValue);
        }
        return oldValue;
    };
    /**
    * Attempts to compute a mapping for the specified key and its current mapped value.
    * @example
    *   //in map key k1 is mapped to null
    *   map.computeIfAbsent(k1, (key,value,map)=>(value+11)); //returns null
    *   //value does not change
    */
    AbstractMap.prototype.computeIfPresent = function (key, remappingFn) {
        var oldValue = this.get(key);
        if (oldValue !== null && oldValue !== undefined) {
            var newValue = remappingFn(key, oldValue, this);
            if (newValue != null)
                this.put(key, newValue);
        }
        return oldValue;
    };
    /**
    * Returns true if this map contains a mapping for the specified key.
    * @example
    *   //map : [{k1:1},{k2:2}]
    *   map.conainsKey(k1); //returns true
    *   map.containsKey(k5); //returns false
    */
    AbstractMap.prototype.containsKey = function (key) {
        return this._keys.contains(key);
    };
    /**
    * Returns true if this map maps one or more keys to the specified value.
    * @example
    *   //map : [{k1:1},{k2:2}]
    *   map.conainsValue(1); //returns true
    *   map.containsValue(5); //returns false
    */
    AbstractMap.prototype.containsValue = function (value) {
        return this._values.contains(value);
    };
    /**
    * Returns a Set view of the mappings contained in this map.
    * @example
    *   //map : [{k1:1},{k2:2}]
    *   map.entrySet(); //returns Set [{key:k1, value:1},{key:k2, value:2}]
    */
    AbstractMap.prototype.entrySet = function () {
        var _this = this;
        var enSet = new abstract_set_1.AbstractSet();
        this._keys.forEach(function (k, index, set) {
            var val = _this.get(k);
            if (val === undefined)
                val = null;
            var entry = { key: k, value: val };
            enSet.add(entry);
        });
        return enSet;
    };
    /**
    * Compares the specified map with this map for equality.
    * @example
    *   //map1 : [{k1:1},{k2:2},{k3:null}]
    *   //map2 : [{k1:1},{k3:4}]
    *   map1.equals(map2) //returns false
    */
    AbstractMap.prototype.equals = function (map) {
        var _this = this;
        //Comparing types of both collection
        if (map.constructor !== this.constructor)
            return false;
        //Compare size
        if (map.size() !== this.size())
            return false;
        //Compare each item;
        return map.keySet().toArray().every(function (key, index) {
            return _this.get(key) === map.get(key);
        });
    };
    /**
    * Performs the given action for each entry in this map until all entries have been processed or the action throws an exception.
    * @example
    *   //map : [{"one":1},{"two":2},{"three":3}]
    *   map.forEach((key, value, map)=>{
    *      console.log(key+"->"+value+",");
    *   });
    *   //Output: one->1,two->2,three->3
    */
    AbstractMap.prototype.forEach = function (action) {
        var _this = this;
        this._keys.forEach(function (key, index) {
            var val = _this._values.get(index);
            if (val === undefined)
                val = null;
            action(key, val, _this);
        });
    };
    /**
    * Returns the value to which the specified key is mapped. undefined if there is no mapping.
    * @example
    *   //map : [{k1:1},{k2:2},{k3:null}]
    *   map.get(k1); //returns 1
    *   map.get(k3); //returns null
    *   map.get(k4); //returns undefined
    */
    AbstractMap.prototype.get = function (key) {
        var index = this._keys.toArray().indexOf(key);
        if (index == -1)
            return undefined;
        return this._values.get(index);
    };
    /**
    * Returns the value to which the specified key is mapped, or defaultValue if this map contains no mapping for the key or if key is mapped to null.
    * @example
    *   //map : [{k1:1},{k2:2},{k3:null}]
    *   map.getOrDefault(k1,5); //returns 1
    *   map.getOrDefault(k3,12); //returns 12
    *   map.getOrDefault(k4,16); //returns 16
    */
    AbstractMap.prototype.getOrDefault = function (key, defaultValue) {
        return this.get(key) || defaultValue;
    };
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
    AbstractMap.prototype.isEmpty = function () {
        return this.values().isEmpty() || this.keySet().isEmpty();
    };
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
    AbstractMap.prototype.isNull = function () {
        return this.values().toArray().every(function (val) { return (val === null); });
    };
    /**
    * Returns a Set view of the keys contained in this map.
    * @example
    *   //map : [{"one":1},{"two":2},{"three":3}]
    *   map.keySet(); //["one","two","three"]
    */
    AbstractMap.prototype.keySet = function () {
        return new (abstract_set_1.AbstractSet.bind.apply(abstract_set_1.AbstractSet, [void 0].concat(this._keys.toArray())))();
    };
    /**
    * Associates the specified value with the specified key in this map.Returns the old value associated with the key or  undefined.
    * @example
    * //map : [{"one":1},{"two":2},{"three":3}]
    * map.put("one",22); //return 1
    * //now map : [{"one":22},{"two":2},{"three":3}]
    * map.put("four",4);//return undefined
    * //now map : [{"one":22},{"two":2},{"three":3},{"four":4}]
    */
    AbstractMap.prototype.put = function (key, value) {
        if (this.containsKey(key)) {
            var oldValue = this.get(key);
            if (oldValue !== value) {
                var index = this._keys.toArray().indexOf(key);
                this._values.set(index, value);
            }
            return oldValue;
        }
        if (!(this._keys.add(key) && this._values.add(value)))
            this._keys.remove(key);
        return undefined;
    };
    /**
    * Copies all of the mappings from the specified map to this map.
    * @example
    *   //map1: [{k1:v1},{k2:v2},{k3:v3}], map2: [{k2:v4},{k4:v6},{k6:v8}]
    *   map1.putAll(map2);
    *   //now map1: [{k1:v1},{k2:v4},{k3:v3},{k4:v6},{k6:v8}]
    */
    AbstractMap.prototype.putAll = function (map) {
        var _this = this;
        map.forEach(function (key, value, map) {
            _this.put(key, value);
        });
    };
    /**
    * If the specified key is not already associated with a value (or is mapped to null) associates it with the given value and returns undefined, else returns the current value.
    * @example
    *   //map : [{"one":1},{"two":2},{"three":3}]
    *   map.putIfAbsent("four",4); //return undefined (adds {"four":4} to the map)
    *   map.putIfAbsent("one",23); //return 1 (map unchanged)
    */
    AbstractMap.prototype.putIfAbsent = function (key, value) {
        var oldValue = this.get(key);
        if (!oldValue)
            return this.put(key, value);
        else
            return oldValue;
    };
    /**
    * Removes the mapping for a key from this map if it is present.
    * @example
    *   //map : [{"one":1},{"two":2},{"three":3}]
    *   map.remove("one"); //return 1
    *   //now map : [{"two":2},{"three":3}]
    *   map.remove("four"); //return undefined (map unchanged)
    */
    AbstractMap.prototype.remove = function (key) {
        if (this.containsKey(key)) {
            var index = this._keys.toArray().indexOf(key);
            this._keys.remove(key);
            return this._values.removeAt(index);
        }
        return undefined;
    };
    /**
    * Removes the entry for the specified key only if it is currently mapped to the specified value.
    * @example
    *   //map : [{"one":1},{"two":2},{"three":3}]
    *   map.removeIf("one", 1); //return true
    *   //now map : [{"two":2},{"three":3}]
    *   map.removeIf("two",5); //return false (map unchanged)
    *   map.removeIf("four",4); //return false
    */
    AbstractMap.prototype.removeIf = function (key, value) {
        if (this.get(key) === value)
            return (this.remove(key) !== undefined);
        return false;
    };
    /**
    * Replace all entries with specified value with the new value. Returns true if map was changed.
    * @example
    *   //map : [{k1:1},{k2:5},{k3:3},{k4:5},{k5:1}]
    *   map.replace(5,2) //returns true;
    *   //now map : [{k1:1},{k2:2},{k3:3},{k4:2},{k5:1}]
    */
    AbstractMap.prototype.replace = function (oldValue, newValue) {
        if (this.containsValue(oldValue)) {
            this.replaceAll(function (key, value, map) {
                return (value === oldValue) ? newValue : value;
            });
            return true;
        }
        return false;
    };
    /**
    * Replaces each entry's value with the result of invoking the given function on that entry until all entries have been processed or the function throws an exception.
    * @example
    *   //map : [{k1:1},{k2:5},{k3:3},{k4:5},{k5:1}]
    *   map.replaceAll((k,v,m)=>(v*2)); //replace with its double
    *   //map : [{k1:2},{k2:10},{k3:6},{k4:10},{k5:2}]
    */
    AbstractMap.prototype.replaceAll = function (remappingFn) {
        var _this = this;
        this.forEach(function (key, value, map) {
            _this.put(key, remappingFn(key, value, map));
        });
    };
    /**
    * Returns the number of key-value mappings in this map.(key->null mappings are counted)
    * @example
    *   //map : [{k1:1},{k2:5},{k3:3},{k4:5},{k5:1}]
    *   map.size(); //return 5
    */
    AbstractMap.prototype.size = function () {
        return this._keys.size();
    };
    /**
    * Returns a List view of the values contained in this map.
    * //map : [{k1:1},{k2:5},{k3:3},{k4:5},{k5:1}]
    * map.values(); //return list : [1,5,3,5,1]
    */
    AbstractMap.prototype.values = function () {
        return new (abstract_list_1.AbstractList.bind.apply(abstract_list_1.AbstractList, [void 0].concat(this._values.toArray())))();
    };
    return AbstractMap;
}());
exports.AbstractMap = AbstractMap;
