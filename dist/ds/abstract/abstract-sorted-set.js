"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const abstract_set_1 = require("./abstract-set");
class AbstractSortedSet extends abstract_set_1.AbstractSet {
    constructor(compareFn, ...items) {
        super(...items);
        this._comparator = compareFn;
        this._store.sort(compareFn);
    }
    /**
    * Adds the specified element to this set if it is not already present
    * @example
    *   //set contains [1,3,6,8] //compareFn is ascending
    *   set.add(4); //set: [1,3,4,6,8]
    */
    add(item) {
        if (super.add(item)) {
            this._store.sort(this._comparator);
            return true;
        }
        else
            return false;
    }
    /**
    * Inserts all items of an array into this set.
    * @example
    *   //set containes [1,8,12] (compareFn designed for ascending order)
    *   set.addAll([6,10,15]); //[1,6,8,10,12,15]
    */
    addAll(items) {
        return super.addAll(items) && !!this._store.sort(this._comparator);
    }
    /**
    * Returns the compare function used to order the elements in this set.
    * @example
    *   set.comparator(); //returns a function
    */
    comparator() {
        return this._comparator;
    }
    /**
    * Returns the first (lowest) element currently in this set.
    * @example
    *   //set contains [1,2,3,4]
    *   set.first()
    */
    first() {
        return this._store[0];
    }
    /**
    * Returns the last (highest) element currently in this set.
    * @example
    *   //set contains [1,2,3,4]
    *   set.last();
    */
    last() {
        return this._store[this.size() - 1];
    }
    /**
    * Returns a view of the portion of this set whose elements range from fromElement, inclusive, to toElement, exclusive.
    * @example
    *   //set contains [1,2,3,4,5,6,7,8,9,10]
    *   set.subSet(4,9) //returns set : [4,5,6,7,8]
    */
    subSet(fromItem, toItem) {
        let subArray = this._store.filter((x) => {
            return (this._comparator(x, fromItem) >= 0) && (this._comparator(x, toItem) < 0);
        });
        return new this.constructor(this.comparator(), ...subArray);
    }
    /**
    * Returns a view of the portion of this set whose elements are strictly less than toElement.
    * @example
    *   //set : [1,2,3,5,7,9]
    *   set.headSet(6) //returns set : [1,2,3,5]
    */
    headSet(toItem) {
        return this.subSet(this.first(), toItem);
    }
    /**
    * Returns a view of the portion of this set whose elements are greater than or equal to fromElement.
    * @example
    *   //set : [1,2,3,5,7,9]
    *   set.tailSet(4) //returns set : [5,7,9]
    */
    tailSet(fromItem) {
        let subArray = this._store.filter((x) => {
            return (this._comparator(x, fromItem) > 0) && (this._comparator(x, this.last()) <= 0);
        });
        return new this.constructor(this.comparator(), ...subArray);
    }
}
exports.AbstractSortedSet = AbstractSortedSet;
