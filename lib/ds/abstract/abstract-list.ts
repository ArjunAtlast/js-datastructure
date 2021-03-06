import {AbstractCollection} from "./abstract-collection";
import { List } from "../../interfaces/list";

/**
 An abstract implementation of List interface
*/
export class AbstractList<E> extends AbstractCollection<E> implements List<E>{

  constructor(...args:E[]) {
    super(...args);
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
    if(index !== undefined) {
      return !!this._store.splice(index,0,item);
    }
    else {
      return super.add(item);
    }
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
    if(index != undefined) {
      return !!this._store.splice(index,0,...items);
    }
    else{
      return super.addAll(items);
    }
  }

  /**
  * Read an item from the list
  * @example
  *   //list contains [1,2,3]
  *   console.log(list.get(2));
  *   //Output: 3
  */
  get(index:number):E|undefined {
    return this._store[index];
  }

  /**
  * Returns the index of the first occurrence of the specified element in this list, or -1 if this list does not contain the element
  * @example
  *   //list contains [1,2,3,2,4]
  *   console.log(list.indexOf(2));
  *   //Output: 1
  */
  indexOf(item:E):number {
    return this._store.indexOf(item);
  }

  /**
  * Returns the index of last occurrence of the element.
  *   //list contains [1,2,3,2,4]
  *   console.log(list.lastIndexOf(2));
  *   //Output: 3
  */
  lastIndexOf(item: E):number {
    return this._store.lastIndexOf(item);
  }

  /**
   * Returns the median of this list. If the list is empty returns undefined.
   * In case of two medians the later one is preferred.
   * @example
   *  //list contains [1, 2, 3, 4]
   * list.median(); //returns 3
   */
  median(): E | undefined {
    return this.get(Math.floor(this.size()/2));
  }

  /**
  * Removes the element at the specified position in this list.
  * @example
  *   //list contains [1,2,3]
  *   console.log(list.removeAt(1)); //[1,3]
  *   //Output: 2
  */
  removeAt(index:number):E|undefined {
    return this._store.splice(index,1)[0];
  }

  /**
  * Removes from this list all of the elements whose index is between fromIndex, inclusive, and toIndex, exclusive.
  * @example
  *   //list contains [1,2,3,4,5,6]
  *   console.log(list.removeRange(1,4)); //[1,5,6]
  *   //Output: [2,3,4]
  */
  removeRange(fromIndex:number, toIndex:number):E[] {
    return this._store.splice(fromIndex, (toIndex - fromIndex));
  }

  /**
  * Replaces the element at the specified position in this list with the specified element
  * @example
  *   //list contains [1,2,3]
  *   console.log(list.set(1,2.5)); //[1,2.5,3]
  *   //Output: 2
  */
  set(index:number, item:E):E|undefined {
    return this._store.splice(index,1,item)[0];
  }

  /**
  * Sorts this list according to the compareFn.
  * compareFn is a function which should return a number value (-ve, zero, or +ve).
  * x is considered smaller than y if the compareFn(x,y) is negetive
  * @example
  *   //list contains [1,8,6,2,7,3,9,11]
  *   list.sort(function(x,y) {
  *     return x-y;
  *   }); // [1, 2, 3, 6, 7, 8, 9, 11]
  *
  */
  sort(compareFn:(x:E,y:E)=>number):this {
    this._store.sort(compareFn);
    return this;
  }

  /**
  * Returns a view of the portion of this list between the specified fromIndex, inclusive, and toIndex, exclusive.
  * @example
  *   //list contains [1,8,6,2,7,3,9,11]
  *   list.subList(2,7); // returns a list containing [6, 2, 7, 3, 9]
  */
  subList(fromIndex:number, toIndex:number):this{
    return new (<any>this.constructor)(...this._store.slice(fromIndex, toIndex));
  }

  /**
  * Reverse the list.
  * @example
  *   //list contains [1,2,3,4,5]
  *   list.reverse() //now list contains [5,4,3,2,1]
  */
  reverse():this {
    this._store.reverse();
    return this;
  }
}
