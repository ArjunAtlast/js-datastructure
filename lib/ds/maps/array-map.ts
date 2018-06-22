import { AbstractMap } from "../abstract/abstract-map";
import { Cloneable } from "../../interfaces/cloneable";
import { MapEntry } from "../../interfaces/map";

export class ArrayMap<K,V> extends AbstractMap<K,V> implements Cloneable<ArrayMap<K,V>> {
  protected _capacity:number = 10;
  /**
  * Constructs an empty list with an initial capacity of ten.
  */
  constructor()
  /**
  * Constructs an empty list with the specified initial capacity.
  */
  constructor(initialCapacity:number)
  /**
  * Constructs a list containing the items.
  */
  constructor(initialCapacity:number, ...items:MapEntry<K,V>[])
  constructor(initialCapacity:number=10, ...items:MapEntry<K,V>[]) {
	  super(...items.slice(0,initialCapacity));
    this._capacity = initialCapacity;
  }

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
  put(key:K, value:V):V {
    if(this.size()>=this._capacity){
      throw new Error(`Couldn't put item ${key}=>${value}ArrayMap Overflow`);
    }
    return super.put(key,value);
  }

  /**
  * Increases the capacity of this ArrayMap instance, if necessary, to ensure that it can hold at least the number of elements specified by the minimum capacity argument.
  * @example
  *   //arrayMap has a capacity 10
  *   arrayMap.ensureCapacity(15);
  *   //new capacity is 15
  */
  ensureCapacity(minCapacity:number):void {
    this._capacity = Math.max(this._capacity, Math.floor(minCapacity));
  }

  /**
  * Returns a shallow copy of this ArrayMap instance.
  * @example
  *   let newArrayMap = arrayMap.clone();
  */
  clone(): this {
    return new (<any>this.constructor)(this._capacity, ...this.entrySet().toArray());
  }

  /**
  * Trims the capacity of this ArrayMap instance to be the list's current size.
  * @example
  *   //arrayMap contains [{"one":1},{"two":2},{"three":3}] and capacity is 10
  *   arrayMap.trimToSize(); //new capacity is 3
  */
  trimToSize():void {
    this._capacity = this.size();
  }

  /**
   * Returns a sub map of the current map based on the selection function
   * @example
   *  //arrayMap contains [{"one":1},{"two":2},{"three":3}]
   *  arrayMap.subMap((k,v) => (v<=2)); //returns [{"one":1},{"two":2}]
  */
  subMap(selectionFn:(key: K, value: V, map: this) => boolean) {
    let sMap = new (<any>this.constructor)(this._capacity);

    this.forEach((k,v,m) => {
      if(selectionFn(k,v,m)) sMap.put(k,v);
    });

    return sMap;
  }

}
