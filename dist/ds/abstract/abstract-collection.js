"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const iterator_1 = require("../../classes/iterator");
const abstract_iterable_1 = require("./abstract-iterable");
/**
 An abstract implementation of Collection interface
*/
class AbstractCollection extends abstract_iterable_1.AbstractIterable {
    constructor(...items) {
        super();
        this._store = [];
        this._store = [...items];
    }
    /**
    * Add an item to this collection
    * @example
    *   //collection contains [1,2,3,4]
    *   collection.add(5);
    *   //now collection contains [1,2,3,4,5]
    */
    add(item) {
        return !!this._store.push(item);
    }
    /**
    * Add all items of an array to this collection
    * @example
    *   //collection contains [1,2,3,4,5]
    *   collection.addAll([6,7]);
    *   //now collection contains [1,2,3,4,5,6,7]
    */
    addAll(items) {
        let flag = true;
        items.forEach((item) => {
            flag = this.add(item) || flag;
        });
        return flag;
    }
    /**
    * Removes all the elements
    * @example
    *   //collection contains [1,2,3]
    *   collection.clear();
    *   //now collection contains []
    */
    clear() {
        this._store = [];
    }
    /**
    * Returns true if this collection contains the specified element.
    * @example
    *   //collection contains [1,2,3]
    *   console.log(collection.contains(3));
    *   //Output: true
    */
    contains(item) {
        return this._store.some((ele) => {
            return ele === item;
        });
    }
    /**
    * Returns true if this collection contains all of the elements in the specified array.
    * @example
    *   //collection contains [1,2,3]
    *   console.log(collection.contains([1,2,4]));
    *   //Output: false
    */
    containsAll(items) {
        for (let item of items) {
            if (!this.contains(item))
                return false;
        }
        return !!items.length;
    }
    /**
    * Compares the specified object with this collection for equality.
    * @example
    *   //collection1 contains [1,2,3] and collection2 contains [1,2,3]
    *   console.log(collection1.equals(collection2));
    *   //Output: true
    */
    equals(collection) {
        //Comparing types of both collection
        if (collection.constructor !== this.constructor)
            return false;
        //Compare size
        if (collection.size() !== this.size())
            return false;
        //Compare each item;
        return collection.toArray().every((item, index) => {
            return (this._store[index] === item);
        });
    }
    /**
    * Returns true if this collection contains no elements.
    * @example
    *   //collection contains [1,2,3]
    *   console.log(collection.isEmpty());
    *   //Output: false
    */
    isEmpty() {
        return !this._store.length;
    }
    /**
    * Removes a single instance of the specified element from this collection, if it is present
    * @example
    *   //collection contains [1,2,3]
    *   collection.remove(3);
    *   //now collection contains [1,2]
    */
    remove(item) {
        let i = this._store.indexOf(item);
        return (i != -1) && !!this._store.splice(i, 1);
    }
    /**
    * Removes all of this collection's elements that are also contained in the specified array.
    * @example
    *   //collection contains [1,2,3,4]
    *   collection.removeAll([1,3,5,7]);
    *   //now collection contains [2,4]
    */
    removeAll(items) {
        let flag = false;
        items.forEach((item) => {
            flag = (this.contains(item) && this.remove(item)) || flag;
        });
        return flag;
    }
    /**
    * Removes all of the elements of this collection that satisfy the given filter function.
    * @example
    * //collection contains [1,2,3,4,5,6,7,8,9]
    * collection.removeIf(function(x) {
    *   return (x%2==0);
    * }); //removing even numbers
    * //now collection contains [1,3,5,7,9]
    */
    removeIf(filterFn) {
        let flag = false;
        this._store = this._store.filter((item, index) => {
            let fl = filterFn(item, index, this);
            flag = flag || fl;
            return !fl;
        });
        return flag;
    }
    /**
    * Retains only the elements in this collection that are contained in the specified array.
    * @example
    *   //collection contains [1,2,3,4]
    *   collection.retainAll([1,3,5,7]);
    *   //now collection contains [1,3]
    */
    retainAll(items) {
        return this.removeIf((item) => (items.indexOf(item) == -1));
    }
    /**
    * Returns the number of elements in this collection.
    * @example
    *   //collection contains [1,2,3,4]
    *   console.log(collection.size());
    *   //Output: 4
    */
    size() {
        return this._store.length;
    }
    /**
    * Returns an array containing all of the elements in this collection
    * @example
    *   //collection contains [1,2,3,4]
    *   console.log(collection.toArray());
    *   //Output: [1,2,3,4]
    */
    toArray() {
        return [...this._store];
    }
    /**
    * Performs an action for each item in this collection.
    * @example
    *   //collection contains [1,2,3,4]
    *   collection.forEach(function(item) {
    *     console.log(item * 4);
    *   });
    *   //Output: 4 8 12 16
    */
    forEach(action) {
        this._store.forEach((item, index) => {
            action(item, index, this);
        });
    }
    /**
    * Returns an iterator for the collection
    * @example
    *   var iterator = collection.iterator(); //returns an Iterator for the collection
    */
    iterator() {
        return new iterator_1.Iterator(this._store);
    }
}
exports.AbstractCollection = AbstractCollection;
