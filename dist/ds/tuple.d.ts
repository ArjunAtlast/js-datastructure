import { AbstractImmutableCollection } from "./abstract/abstract-immutable-collection";
/**
 * An Immutable collection of two elements.
 * Used as a Coordinate Pair
 */
export declare class Tuple<X, Y> extends AbstractImmutableCollection<X | Y> {
    constructor(x: X, y: Y);
    /**
     * Returns the first element of the tuple
     */
    readonly x: X;
    /**
     * Returns the second element of the tuple
     */
    readonly y: Y;
}
