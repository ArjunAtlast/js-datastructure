"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const abstract_collection_1 = require("./abstract-collection");
/**
* Abstract implementation of Set interface.
*/
class AbstractSet extends abstract_collection_1.AbstractCollection {
    constructor(...items) {
        let uniqueItems = items.filter((item, index, self) => (self.indexOf(item) === index));
        super(...uniqueItems);
    }
    /**
    * Adds the specified element to this set if it is not already present
    * @example
    *   //set contains [1,2,3,4,5]
    *   set.add(6); //returns true and now set contains [1,2,3,4,5,6]
    *   set.add(5); //returns false since 5 is already in the set.
    */
    add(item) {
        if (!this.contains(item))
            return super.add(item);
        else
            return false;
    }
    /**
    * Adds all of the elements in the specified collection to this set if they're not already present
    * @example
    *   //set contains [1,2,3,4,5]
    *   set.add([4,5,6]); //returns true and now set contains [1,2,3,4,5,6]
    *   set.add([5,6]); //returns false since 5 and 6 are already in the set.
    */
    addAll(items) {
        let newItems = items.filter((item) => (!this.contains(item)));
        if (newItems.length > 0)
            return super.addAll(items);
        else
            return false;
    }
    /**
    * Returns a new set created by union of this set and the set specified
    * @example
    *   //set1 : [1,2,3,4] and set2 : [4,5,6,7]
    *   set1.union(set2); //returns a new set : [1,2,3,4,5,6,7]
    */
    union(set) {
        let unionArray = this.toArray().concat(set.toArray());
        return new AbstractSet(...unionArray);
    }
    /**
    * Returns a new set created by intersection of this set and the set specified
    * @example
    *   //set1 : [1,2,3,4,5] and set2 : [4,5,6,7]
    *   set1.intersection(set2); //returns a new set : [4,5]
    */
    intersection(set) {
        let intersectionArray = set.toArray().filter((item) => (this.contains(item)));
        return new this.constructor(...intersectionArray);
    }
    /**
    * Returns a new set created by subtracting the specified set from this set.
    * @example
    *   //set1 : [1,2,3,4,5] and set2 : [4,5,6,7]
    *   set1.difference(set2); //returns a new set : [1,2,3]
    */
    difference(set) {
        let diffArray = this.toArray().filter((item) => (!set.contains(item)));
        return new this.constructor(...diffArray);
    }
    /**
    * Returns a new set created by exclusion of this set and the set specified.
    * @example
    *   //set1 : [1,2,3,4,5] and set2 : [4,5,6,7]
    *   set1.difference(set2); //returns a new set : [1,2,3,6,7]
    */
    exclusion(set) {
        let exclusionArray = this.union(set).difference(this.intersection(set)).toArray();
        return new this.constructor(...exclusionArray);
    }
}
exports.AbstractSet = AbstractSet;
