import { ArrayList } from "./array-list";

/**
* A list of limited size 'n' that stores only the last n items.
*/
export class HistoryList<E> extends ArrayList<E> {
  /**
  * Appends the specified element to the end of this list
  * @example
  *   //list contains [1,2,3,4,5,6] -capacity 6
  *   list.add(7); //[2,3,4,5,6,7]
  */
  add(item:E):boolean
  add(item:E, index=undefined):boolean {
    if(this.size() >= this._capacity) {
      this.removeAt(0);
      return this.add(item);
    }
    else return super.add(item)
  }

  /**
  * Appends all of the elements in the specified array to the end of this list
  * @example
  *   //list contains [1,2,3,4,5] - capacity 6
  *   list.addAll([6,7]); //[2,3,4,5,6,7]
  */
  addAll(items:E[]):boolean
  addAll(items:E[], index=undefined):boolean {
    if(this.size()+items.length > this._capacity) {
      let needSpace = this.size()+items.length - this._capacity;
      this._store.splice(0,needSpace);
      return this.addAll(items);
    }
    else return super.addAll(items);
  }

  /**
  * Returns the recent (last) n items from the list
  * @example
  *   //list contains [1,2,3,4,5]
  *   list.recent(3); //[3,4,5]
  */
  recent(n:number) {
    return this._store.slice(Math.max(this.size()-n, 0), this.size());
  }

  /**
  * Clear old items in the history list retaining the last n elements.
  * @example
  *   //list contains [1,2,3,4,5]
  *   list.clearUntil(2); //return [1,2,3]
  *   //now list contain [4,5]
  */
  clearUntill(n:number):E[] {
    return this._store.splice(0,this.size()-n);
  }
}
