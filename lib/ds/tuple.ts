import { AbstractImmutableCollection } from "./abstract/abstract-immutable-collection";

/**
 * An Immutable collection of two elements.
 * Used as a Coordinate Pair
 */
export class Tuple<X, Y> extends AbstractImmutableCollection<X|Y> {

    constructor(x:X, y:Y) {
        super(x,y);
    }

    /**
     * Returns the first element of the tuple
     */
    get x(): X {
        return <X>this._store[0];
    }

    /**
     * Returns the second element of the tuple
     */
    get y(): Y {
        return <Y>this._store[1];
    }

}