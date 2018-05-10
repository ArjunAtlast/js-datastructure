import { ArrayList } from "./array-list";

/**
* A list of limited size 'n' that stores only the last n items.
*/
export class HistoryList<E> extends ArrayList<E> {
  /**
  * Appends the specified element to the end of this list
  */
  add(item:E):boolean
  /**
  * Inserts the specified element to this list
  * @example
  *   //list contains [1,2,3,4,5,6] -capacity 6
  *   list.add(7); //[2,3,4,5,6,7]
  */
  add(item:E, index:number=undefined):boolean {
    if(this.size() >= this._capacity) {
      this.removeAt(0);
      return this.add(item);
    }
    else return super.add(item)
  }

  /**
  * Appends all of the elements in the specified array to the end of this list
  */
  addAll(items:E[]):boolean
  /**
  * Inserts all of the elements in the specified array into this list.
  * @example
  *   //list contains [1,2,3,4,5] - capacity 6
  *   list.addAll([6,7]); //[2,3,4,5,6,7]
  */
  addAll(items:E[], index:number = undefined):boolean {
    if(this.size()+items.length > this._capacity) {
      let needSpace = this.size()+items.length - this._capacity;
      this._store.splice(0,needSpace);
      return this.addAll(items);
    }
    else return super.addAll(items);
  }
}
