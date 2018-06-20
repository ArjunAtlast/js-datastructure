"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const abstract_immutable_collection_1 = require("./abstract/abstract-immutable-collection");
/**
 * An Immutable collection of two elements.
 * Used as a Coordinate Pair
 */
class Tuple extends abstract_immutable_collection_1.AbstractImmutableCollection {
    constructor(x, y) {
        super(x, y);
    }
    /**
     * Returns the first element of the tuple
     */
    get x() {
        return this._store[0];
    }
    /**
     * Returns the second element of the tuple
     */
    get y() {
        return this._store[1];
    }
}
exports.Tuple = Tuple;
