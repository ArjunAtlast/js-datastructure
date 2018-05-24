import { AbstractMap } from "../abstract/abstract-map";
import { Serializable } from "../../interfaces/serializable";
import { Cloneable } from "../../interfaces/cloneable";
import { Set } from "../../interfaces/set";
/**
  A Map whose keys are always of string type.
*/
export declare class Dictionary<E> extends AbstractMap<string, E> implements Cloneable<Dictionary<E>>, Serializable {
    /**
    * Returns the number occurances of an item in the dictionary
    * @example
    *   //dict contains [{'a':1},{'b':2},{'c':3},{'d':2},{'f':1},{'e':2},{'g':4}]
    *   dict.count(2) // returns 3
    *   dict.count(7) // return 0
    */
    count(item: E): number;
    /**
    * Returns a set of keys associated with a given item
    * @example
    *   //dict contains [{'a':1},{'b':2},{'c':3},{'d':2},{'f':1},{'e':2},{'g':4}]
    *   dict.getKeys(2) //return a set containing ['b','d','e']
    */
    getKeys(item: E): Set<string>;
    /**
    * Returns a shallow copy of this Dictionary instance.
    * @example
    *   let newDict = dict.clone();
    */
    clone(): Dictionary<E>;
    /**
    * Converts the dictionary into a JSON String
    * @example
    *   //dictionary contains [{'a':1},{'b':2},{'c':3}]
    *   console.log(arrayList.toString((x)=>(x.toString())));
    *   //Output
    *   //'{"a":1,"b":2,"c":3}'
    */
    toString(serializerFn: (item: E | null) => string): string;
    /**
    * Return the Object from the JSON string
    * @example
    *   //json = '{"a":1,"b":2,"c":3}'
    *   dict = new Dictionary<number>().fromString(json,(x)=>(parseFloat(x)));
    *   //dict contains [{'a':1},{'b':2},{'c':3}]
    *
    */
    fromString(json: string, deserializerFn: (itemJSON: string) => E): this;
}
