import { AbstractMap } from "../abstract/abstract-map";
import { AbstractSet } from "../abstract/abstract-set";
import { Serializable } from "../../interfaces/serializable";
import { Cloneable } from "../../interfaces/cloneable";
import { MapEntry } from "../../interfaces/map";
import { Set } from "../../interfaces/set";

/**
  A Map whose keys are always of string type.
*/
export class Dictionary<E> extends AbstractMap<string, E> implements Cloneable<Dictionary<E>>, Serializable {

  /**
  * Returns the number occurances of an item in the dictionary
  * @example
  *   //dict contains [{'a':1},{'b':2},{'c':3},{'d':2},{'f':1},{'e':2},{'g':4}]
  *   dict.count(2) // returns 3
  *   dict.count(7) // return 0
  */
  count(item:E):number {
    let count = 0;
    if(this.containsValue(item)) {
      this.forEach((key, value, map) => {
        if(value === item) count++;
      });
    }
    return count;
  }

  /**
  * Returns a set of keys associated with a given item
  * @example
  *   //dict contains [{'a':1},{'b':2},{'c':3},{'d':2},{'f':1},{'e':2},{'g':4}]
  *   dict.getKeys(2) //return a set containing ['b','d','e']
  */
  getKeys(item:E):Set<string> {
    let keys: Set<string> = new AbstractSet<string>();
    if(this.containsValue(item)) {
      this.forEach((key, value, map) => {
        if(value === item) keys.add(key);
      });
    }
    return keys;
  }

  /**
  * Returns a shallow copy of this Dictionary instance.
  * @example
  *   let newDict = dict.clone();
  */
  clone(): this {
    return new (<any>this.constructor)(...this.entrySet().toArray());
  }

  /**
  * Converts the dictionary into a JSON String
  * @example
  *   //dictionary contains [{'a':1},{'b':2},{'c':3}]
  *   console.log(arrayList.toString((x)=>(x.toString())));
  *   //Output
  *   //'{"a":1,"b":2,"c":3}'
  */
  toString(serializerFn: (item: E) => string): string {
    let ret:string[] = [];
    this.forEach((key, value, map)=>{
      ret.push(`"${key}":${serializerFn(value)}`);
    });
    return `{${ret.join(",")}}`;
  }

  /**
  * Return the Object from the JSON string
  * @example
  *   //json = '{"a":1,"b":2,"c":3}'
  *   dict = new Dictionary<number>().fromString(json,(x)=>(parseFloat(x)));
  *   //dict contains [{'a':1},{'b':2},{'c':3}]
  *
  */
  fromString(json: string, deserializerFn: (itemJSON: string) => E):this {
    let jsonObject = JSON.parse(json);
    let dict = new (<any>this.constructor)();
    for(let k in jsonObject) {
      dict.put(k, deserializerFn(JSON.stringify(jsonObject[k])));
    }
    return dict;
  }
}
