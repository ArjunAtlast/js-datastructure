"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const abstract_list_1 = require("../abstract/abstract-list");
class SwappableList extends abstract_list_1.AbstractList {
    /**
    * Swap between items of given indexes. Returns true on success else false.
    * @example
    *   ////list contains [1,2,3,4]
    *   list.swap(1,3); //returns true
    *   //now list contains [1,4,3,2]
    */
    swap(sourceIndex, destinationIndex) {
        let destination = this.get(destinationIndex);
        let source = this.get(sourceIndex);
        if (destination != undefined && source != undefined) {
            this.set(destinationIndex, source);
            this.set(sourceIndex, destination);
            return true;
        }
        return false;
    }
    /**
    * Swap between item in the given index and the item just before it.
    * @example
    *   ////list contains [1,2,3,4]
    *   list.rise(2); //returns true
    *   //now list contains [1,3,2,4]
    */
    rise(index) {
        return this.swap(index, index - 1);
    }
    /**
    * Swap between item in the given index and the item just after it.
    * @example
    *   ////list contains [1,2,3,4]
    *   list.fall(2); //returns true
    *   //now list contains [1,2,4,3]
    */
    fall(index) {
        return this.rise(index + 1);
    }
    /**
    * Rotate the list based on the direction specified (-ve : left, +ve/0 : right);
    * @example
    *   //list contains [1,2,3,4]
    *   list.rotate(-1); //returns true
    *   //now list contains [2,3,4,1]
    */
    rotate(direction) {
        if (direction < 0) {
            let item = this._store.shift();
            if (item)
                this._store.push(item);
        }
        else {
            let item = this._store.pop();
            if (item)
                this._store.unshift(item);
        }
    }
    /**
    * Returns a shallow copy of this ArrayList instance.
    * @example
    *   let newList = swappableList.clone();
    */
    clone() {
        return new this.constructor(...this._store);
    }
    /**
    * Converts the list into a JSON String
    * @example
    *   //list contains [1,2,3,4]
    *   console.log(list.toString((x)=>(x.toString())));
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
    *   list = new SwappableList<number>().fromString(json,(x)=>(parseFloat(x)));
    *   //list contains [1,2,3,4]
    *
    */
    fromString(json, deserializerFn) {
        let object = JSON.parse(json);
        let finalArr = object.map((x) => (deserializerFn(JSON.stringify(x))));
        return new SwappableList(...finalArr);
    }
}
exports.SwappableList = SwappableList;
