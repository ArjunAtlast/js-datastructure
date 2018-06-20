import { Tuple } from "../ds/tuple";
import { AbstractSet } from "../ds/abstract/abstract-set";
import { NumberMatrix } from "../ds/matrices/number-matrix";

/**
 * A binary Relation between two sets.
 */
export class Relation<X,Y> {

    private _domain: AbstractSet<X>;
    private _range: AbstractSet<Y>;
    private _relationFn: (x:X, y:Y) => boolean;

    constructor(domainSet:AbstractSet<X>, rangeSet:AbstractSet<Y>, relationFn: (x:X, y:Y) => boolean) {
        this._domain = domainSet;
        this._range = rangeSet;
        this._relationFn = relationFn;
    }

    /**
     * a set corresponding to the relation.
     */
    get set(): AbstractSet<Tuple<X,Y>> {

        let rel = new AbstractSet<Tuple<X,Y>>();

        this._domain.forEach(x => {
            this._range.forEach(y => {
                this._relationFn(x,y) && rel.add(new Tuple(x,y));
            });
        });

        return rel;
    }

    /**
     * a matrix corresponding to the relation
     */
    get matrix(): NumberMatrix {
        let dom = this._domain.toArray();
        let ran = this._range.toArray();

        return NumberMatrix.generate(
            this._domain.size(), 
            this._range.size(), 
            (r,c) => {
                return this._relationFn(dom[r], ran[c])?1:0;
            }
        );
    }

}

