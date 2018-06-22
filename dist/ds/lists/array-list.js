"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const abstract_list_1 = require("../abstract/abstract-list");
/**
  Resizable-array implementation of the List interface.
*/
class ArrayList extends abstract_list_1.AbstractList {
    constructor(initialCapacity = 10, ...items) {
        super(...items.slice(0, initialCapacity));
        this._capacity = Math.floor(initialCapacity);
    }
    add(item, index) {
        if (this.size() < this._capacity)
            return (index !== undefined) ? super.add(item, index) : super.add(item);
        else
            return false;
    }
    addAll(items, index) {
        if (items.length <= this._capacity - this.size())
            return index ? super.addAll(items, index) : super.addAll(items);
        else
            return false;
    }
    /**
    * Increases the capacity of this ArrayList instance, if necessary, to ensure that it can hold at least the number of elements specified by the minimum capacity argument.
    * @example
    *   //arrayList has a capacity 10
    *   arrayList.ensureCapacity(15);
    *   //new capacity is 15
    */
    ensureCapacity(minCapacity) {
        this._capacity = Math.max(this._capacity, Math.floor(minCapacity));
    }
    filter(filterFn, capacity = this._capacity) {
        let filteredArr = this._store.filter((item, index) => {
            return filterFn(item, index, this);
        });
        return new this.constructor(Math.max(filteredArr.length, capacity), ...filteredArr);
    }
    /**
    * Replaces each element of this list with the result of applying the mapping function
    * @example
    *   //arrayList contains [1,2,3,4]
    *   arrayList.map((x)=>(x*2));
    *   //now arrayList contains [2,4,6,8]
    */
    replaceAll(mappingFn) {
        this._store = this._store.map((item) => (mappingFn(item)));
    }
    /**
    * Returns a view of the portion of this list between the specified fromIndex, inclusive, and toIndex, exclusive.
    * @example
    *   //list contains [1,8,6,2,7,3,9,11]
    *   list.subList(2,7); // returns a list containing [6, 2, 7, 3, 9]
    */
    subList(fromIndex, toIndex) {
        return new this.constructor(this._capacity, ...this._store.slice(fromIndex, toIndex));
    }
    /**
    * Returns a shallow copy of this ArrayList instance.
    * @example
    *   let newArrayList = arrayList.clone();
    */
    clone() {
        return new this.constructor(this._capacity, ...this._store);
    }
    /**
    * Trims the capacity of this ArrayList instance to be the list's current size.
    * @example
    *   //arrayList contains [1,2,3,4,5] and capacity is 10
    *   arrayList.trimToSize(); //new capacity is 5
    */
    trimToSize() {
        this._capacity = this.size();
    }
    /**
    * Converts the arrayList into a JSON String
    * @example
    *   //arrayList contains [1,2,3,4]
    *   console.log(arrayList.toString((x)=>(x.toString())));
    *   //Output
    *   //"[1,2,3,4]"
    */
    toString(serializerFn) {
        return "[" + this._store.map((item) => {
            return serializerFn(item);
        }).join(",") + "]";
    }
    /**
    * Return the Object from the JSON string
    * @example
    *   //json = "[1,2,3,4]"
    *   arrayList = new ArrayList<number>().fromString(json,(x)=>(parseFloat(x)));
    *   //arrayList contains [1,2,3,4]
    *
    */
    fromString(json, deserializerFn) {
        let object = JSON.parse(json);
        let finalArr = object.map((x) => (deserializerFn(JSON.stringify(x))));
        return new this.constructor(Math.max(this._capacity, finalArr.length), ...finalArr);
    }
}
exports.ArrayList = ArrayList;
