import { Set } from "./set";
import { List } from "./list";
/**
* Used to denote an entry in Map(readonly).
*/
export interface MapEntry<K, V> {
    readonly key: K;
    readonly value: V | null;
}
/**
* An object that maps keys to values. A map cannot contain duplicate keys; each key can map to at most one value.
*/
export interface Map<K, V> {
    /**
    * Removes all of the mappings from this map.
    */
    clear(): void;
    /**
    * Attempts to compute a mapping for the specified key and its current mapped value.
    */
    compute(key: K, remappingFn: (key: K, value: V | null | undefined, map: Map<K, V>) => V | null): V | null | undefined;
    /**
    * If the specified key is not already associated with a value (or is mapped to null), attempts to compute its value using the given mapping function and enters it into this map.
    */
    computeIfAbsent(key: K, remappingFn: (key: K, value: V | null | undefined, map: Map<K, V>) => V | null): V | null | undefined;
    /**
    * If the value for the specified key is present and non-null, attempts to compute a new mapping given the key and its current mapped value.
    */
    computeIfPresent(key: K, remappingFn: (key: K, value: V, map: Map<K, V>) => V | null): V | null | undefined;
    /**
    * Returns true if this map contains a mapping for the specified key.
    */
    containsKey(key: K): boolean;
    /**
    * Returns true if this map maps one or more keys to the specified value.
    */
    containsValue(value: V): boolean;
    /**
    * Returns a Set view of the mappings contained in this map.
    */
    entrySet(): Set<MapEntry<K, V>>;
    /**
    * Compares the specified map with this map for equality.
    */
    equals(map: Map<K, V>): boolean;
    /**
    * Performs the given action for each entry in this map until all entries have been processed or the action throws an exception.
    */
    forEach(action: (key: K, value: V | null, map: Map<K, V>) => void): void;
    /**
    * Returns the value to which the specified key is mapped. undefined if there is no mapping.
    */
    get(key: K): V | undefined | null;
    /**
    * Returns the value to which the specified key is mapped, or defaultValue if this map contains no mapping for the key or if key is mapped to null.
    */
    getOrDefault(key: K, defaultValue: V): V;
    /**
    * Returns true if this map contains no key-value mappings.
    */
    isEmpty(): boolean;
    /**
    * Returns a Set view of the keys contained in this map.
    */
    keySet(): Set<K>;
    /**
    * Associates the specified value with the specified key in this map.Returns the old value associated with the key or  undefined.
    */
    put(key: K, value: V): V | undefined | null;
    /**
    * Copies all of the mappings from the specified map to this map.
    */
    putAll(map: Map<K, V>): void;
    /**
    * If the specified key is not already associated with a value (or is mapped to null) associates it with the given value and returns undefined, else returns the current value.
    */
    putIfAbsent(key: K, value: V): V | undefined | null;
    /**
    * Removes the mapping for a key from this map if it is present
    */
    remove(key: K): V | undefined | null;
    /**
    * Removes the entry for the specified key only if it is currently mapped to the specified value.
    */
    removeIf(key: K, value: V | null): boolean;
    /**
    * Replace all entries with specified value with the new value. Returns true if map was changed.
    */
    replace(oldValue: V | null, newValue: V | null): boolean;
    /**
    * Replaces each entry's value with the result of invoking the given function on that entry until all entries have been processed or the function throws an exception.
    */
    replaceAll(remappingFn: (key: K, value: V | null, map: Map<K, V>) => V | null): void;
    /**
    * Returns the number of key-value mappings in this map.
    */
    size(): number;
    /**
    * Returns a List view of the values contained in this map.
    */
    values(): List<V | null>;
}
