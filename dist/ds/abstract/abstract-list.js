"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const abstract_collection_1 = require("./abstract-collection");
const list_iterator_1 = require("../../classes/list-iterator");
/**
 An abstract implementation of List interface
*/
class AbstractList extends abstract_collection_1.AbstractCollection {
    constructor(...args) {
        super(...args);
    }
    add(item, index) {
        if (index !== undefined) {
            return !!this._store.splice(index, 0, item);
        }
        else {
            return super.add(item);
        }
    }
    addAll(items, index) {
        if (index != undefined) {
            return !!this._store.splice(index, 0, ...items);
        }
        else {
            return super.addAll(items);
        }
    }
    /**
    * Read an item from the list
    * @example
    *   //list contains [1,2,3]
    *   console.log(list.get(2));
    *   //Output: 3
    */
    get(index) {
        return this._store[index];
    }
    /**
    * Returns the index of the first occurrence of the specified element in this list, or -1 if this list does not contain the element
    * @example
    *   //list contains [1,2,3,2,4]
    *   console.log(list.indexOf(2));
    *   //Output: 1
    */
    indexOf(item) {
        return this._store.indexOf(item);
    }
    /**
    * Returns the index of last occurrence of the element.
    *   //list contains [1,2,3,2,4]
    *   console.log(list.lastIndexOf(2));
    *   //Output: 3
    */
    lastIndexOf(item) {
        return this._store.lastIndexOf(item);
    }
    /**
    * Returns a list iterator over the elements in this list
    * @example
    *   var listIterator = list.listIterator(); //starts at index 0
    */
    listIterator(index = 0) {
        return new list_iterator_1.ListIterator(this._store, index);
    }
    /**
    * Removes the element at the specified position in this list.
    * @example
    *   //list contains [1,2,3]
    *   console.log(list.removeAt(1)); //[1,3]
    *   //Output: 2
    */
    removeAt(index) {
        return this._store.splice(index, 1)[0];
    }
    /**
    * Removes from this list all of the elements whose index is between fromIndex, inclusive, and toIndex, exclusive.
    * @example
    *   //list contains [1,2,3,4,5,6]
    *   console.log(list.removeRange(1,4)); //[1,5,6]
    *   //Output: [2,3,4]
    */
    removeRange(fromIndex, toIndex) {
        return this._store.splice(fromIndex, (toIndex - fromIndex));
    }
    /**
    * Replaces the element at the specified position in this list with the specified element
    * @example
    *   //list contains [1,2,3]
    *   console.log(list.set(1,2.5)); //[1,2.5,3]
    *   //Output: 2
    */
    set(index, item) {
        return this._store.splice(index, 1, item)[0];
    }
    /**
    * Sorts this list according to the compareFn.
    * compareFn is a function which should return a number value (-ve, zero, or +ve).
    * x is considered smaller than y if the compareFn(x,y) is negetive
    * @example
    *   //list contains [1,8,6,2,7,3,9,11]
    *   list.sort(function(x,y) {
    *     return x-y;
    *   }); // [1, 2, 3, 6, 7, 8, 9, 11]
    *
    */
    sort(compareFn) {
        this._store.sort(compareFn);
    }
    /**
    * Returns a view of the portion of this list between the specified fromIndex, inclusive, and toIndex, exclusive.
    * @example
    *   //list contains [1,8,6,2,7,3,9,11]
    *   list.subList(2,7); // returns a list containing [6, 2, 7, 3, 9]
    */
    subList(fromIndex, toIndex) {
        return new this.constructor(...this._store.slice(fromIndex, toIndex));
    }
    /**
    * Reverse the list.
    * @example
    *   //list contains [1,2,3,4,5]
    *   list.reverse() //now list contains [5,4,3,2,1]
    */
    reverse() {
        this._store.reverse();
    }
}
exports.AbstractList = AbstractList;
