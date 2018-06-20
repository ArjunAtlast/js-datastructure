import { Tuple } from "../ds/tuple";
import { AbstractSet } from "../ds/abstract/abstract-set";
import { NumberMatrix } from "../ds/matrices/number-matrix";
/**
 * A binary Relation between two sets.
 */
export declare class Relation<X, Y> {
    private _domain;
    private _range;
    private _relationFn;
    constructor(domainSet: AbstractSet<X>, rangeSet: AbstractSet<Y>, relationFn: (x: X, y: Y) => boolean);
    /**
     * a set corresponding to the relation.
     */
    readonly set: AbstractSet<Tuple<X, Y>>;
    /**
     * a matrix corresponding to the relation
     */
    readonly matrix: NumberMatrix;
}
