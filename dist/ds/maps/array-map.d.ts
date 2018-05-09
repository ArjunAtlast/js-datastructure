import { AbstractMap } from "../abstract/abstract-map";
import { Cloneable } from "../../interfaces/cloneable";
import { MapEntry } from "../../interfaces/map";
export declare class ArrayMap<K, V> extends AbstractMap<K, V> implements Cloneable<ArrayMap<K, V>> {
    protected _capacity: number;
    /**
    * Constructs an empty list with an initial capacity of ten.
    */
    constructor();
    /**
    * Constructs an empty list with the specified initial capacity.
    */
    constructor(initialCapacity: number);
    /**
    * Constructs a list containing the items.
    */
    constructor(initialCapacity: number, ...items: MapEntry<K, V>[]);
    /**
    * Associates the specified value with the specified key in this map.Returns the old value associated with the key or  undefined.
    * (Throws an Error if ArrayMap is at maximum capacity)
    * @example
    * //map : [{"one":1},{"two":2},{"three":3}]
    * map.put("one",22); //return 1
    * //now map : [{"one":22},{"two":2},{"three":3}]
    * map.put("four",4);//return undefined
    * //now map : [{"one":22},{"two":2},{"three":3},{"four":4}]
    */
    put(key: K, value: V | null): V | null | undefined;
    /**
    * Increases the capacity of this ArrayMap instance, if necessary, to ensure that it can hold at least the number of elements specified by the minimum capacity argument.
    * @example
    *   //arrayMap has a capacity 10
    *   arrayMap.ensureCapacity(15);
    *   //new capacity is 15
    */
    ensureCapacity(minCapacity: number): void;
    /**
    * Returns a shallow copy of this ArrayMap instance.
    * @example
    *   let newArrayMap = arrayMap.clone();
    */
    clone(): ArrayMap<K, V>;
    /**
    * Trims the capacity of this ArrayMap instance to be the list's current size.
    * @example
    *   //arrayMap contains [{"one":1},{"two":2},{"three":3}] and capacity is 10
    *   arrayMap.trimToSize(); //new capacity is 3
    */
    trimToSize(): void;
}
