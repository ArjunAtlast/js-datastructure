import { AbstractList } from "../abstract/abstract-list";
import { Cloneable } from "../../interfaces/cloneable";
import { List } from "../../interfaces/list";

/**
  Resizable-array implementation of the List interface.
*/
export class ArrayList<E> extends AbstractList<E> implements Cloneable<ArrayList<E>> {

  protected _capacity: number;

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
  constructor(initialCapacity:number, ...items:E[])
  constructor(initialCapacity:number=10, ...items:E[]) {
    super(...items.slice(0,initialCapacity));
    this._capacity = Math.floor(initialCapacity);
  }

  /**
  * Appends the specified element to the end of this list
  */
  add(item:E):boolean
  /**
  * Inserts the specified element at the specified position in this list
  * @example
  *   //list contains [1,2,3]
  *   list.add(4); //[1,2,3,4]
  *   list.add(2.5,2); //[1,2,2.5,3,4]
  */
  add(item:E, index:number):boolean
  add(item:E, index?:number):boolean {
    if(this.size()<this._capacity) return index? super.add(item, index):super.add(item);
    else return false;
  }

  /**
  * Appends all of the elements in the specified array to the end of this list
  */
  addAll(items:E[]):boolean
  /**
  * Inserts all of the elements in the specified array into this list at the specified position.
  * @example
  *   //list contains [1,2,3]
  *   list.addAll([4,5]); //[1,2,3,4,5]
  *   list.addAll([2.1,2.2,2.3], 2); //[1,2,2.1,2.2,2.3,3,4]
  */
  addAll(items:E[], index:number):boolean
  addAll(items:E[], index?:number):boolean {
    if(items.length <= this._capacity-this.size()) return index? super.addAll(items,index):super.addAll(items);
    else return false;
  }

  /**
  * Increases the capacity of this ArrayList instance, if necessary, to ensure that it can hold at least the number of elements specified by the minimum capacity argument.
  * @example
  *   //arrayList has a capacity 10
  *   arrayList.ensureCapacity(15);
  *   //new capacity is 15
  */
  ensureCapacity(minCapacity:number):void {
    this._capacity = Math.max(this._capacity, Math.floor(minCapacity));
  }

  /**
  * Replaces each element of this list with the result of applying the mapping function
  * @example
  *   //arrayList contains [1,2,3,4]
  *   arrayList.map((x)=>(x*2));
  *   //now arrayList contains [2,4,6,8]
  */
  replaceAll(mappingFn:(item:E)=>E):void {
    this._store = this._store.map((item:E)=>(mappingFn(item)));
  }

  /**
  * Returns a shallow copy of this ArrayList instance.
  * @example
  *   let newArrayList = arrayList.clone();
  */
	clone(): ArrayList<E> {
		return new ArrayList<E>(this._capacity, ...this._store);
	}

  /**
  * Trims the capacity of this ArrayList instance to be the list's current size.
  * @example
  *   //arrayList contains [1,2,3,4,5] and capacity is 10
  *   arrayList.trimToSize(); //new capacity is 5
  */
  trimToSize():void {
    this._capacity = this.size();
  }
}