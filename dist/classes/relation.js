"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tuple_1 = require("../ds/tuple");
const abstract_set_1 = require("../ds/abstract/abstract-set");
const number_matrix_1 = require("../ds/matrices/number-matrix");
/**
 * A binary Relation between two sets.
 */
class Relation {
    constructor(domainSet, rangeSet, relationFn) {
        this._domain = domainSet;
        this._range = rangeSet;
        this._relationFn = relationFn;
    }
    /**
     * a set corresponding to the relation.
     */
    get set() {
        let rel = new abstract_set_1.AbstractSet();
        this._domain.forEach(x => {
            this._range.forEach(y => {
                this._relationFn(x, y) && rel.add(new tuple_1.Tuple(x, y));
            });
        });
        return rel;
    }
    /**
     * a matrix corresponding to the relation
     */
    get matrix() {
        let dom = this._domain.toArray();
        let ran = this._range.toArray();
        return number_matrix_1.NumberMatrix.generate(this._domain.size(), this._range.size(), (r, c) => {
            return this._relationFn(dom[r], ran[c]) ? 1 : 0;
        });
    }
}
exports.Relation = Relation;
