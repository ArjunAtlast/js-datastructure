import { Collection } from "../interfaces/collection";
import { Iterator } from "../classes/iterator";

export abstract class AbstractCollection<T> implements Collection<T>{
  protected _store:T[] = [];

  constructor(...items:T[]) {
    this._store = [...items];
  }

  /**
    Add an item to collection
  */
  add(item:T):boolean {
      return !!this._store.push(item);
  }

  /**
    Add all items of an array to collection
  */
  addAll(items:T[]):boolean {
    let flag = true;
    items.forEach((item:T) => {
      flag = this.add(item) || flag;
    });
    return flag;
  }

  /**
    Removes all of the elements from this collection
  */
  clear():void {
    this._store = [];
  }

  /**
    Returns true if this collection contains the specified element.
  */
  contains(item:T):boolean {
    return this._store.some((ele:T) => {
      return ele ===  item;
    });
  }

  /**
    Returns true if this collection contains all of the elements in the specified array.
  */
  containsAll(items:T[]):boolean {
    for(let item of items) {
      if(!this.contains(item)) return false;
    }
    return !!items.length;
  }

  /**
    Compares the specified object with this collection for equality.
  */
  equals(collection:Collection<T>):boolean {

    //Comparing types of both collection
    if(collection.constructor !== this.constructor) return false;

    //Compare size
    if(collection.size() !== this.size()) return false;

    //Compare each item;
    return collection.toArray().every((item,index) => {
      return (this._store[index] === item);
    });
  }

  /**
    Returns true if this collection contains no elements.
  */
  isEmpty():boolean {
    return !this._store.length;
  }

  /**
    Removes a single instance of the specified element from this collection, if it is present
  */
  remove(item:T):boolean {
    let i = this._store.indexOf(item);
    return (i!=-1) && !!this._store.splice(i,1);
  }

  /**
    Removes all of this collection's elements that are also contained in the specified array.
  */
  removeAll(items:T[]):boolean {
    let flag = false;
    items.forEach((item) => {
      flag = (this.contains(item) && this.remove(item)) || flag;
    });
    return flag;
  }

  /**
    Removes all of the elements of this collection that satisfy the given filter function.
  */
  removeIf(filterFn: (item:T, index:number, collection:Collection<T>)=>boolean):boolean {
    let flag = false;
    this._store = this._store.filter((item, index) => {
      let fl = filterFn(item, index, this);
      flag = flag || fl;
      return !fl;
    });
    return flag;
  }

  /**
    Retains only the elements in this collection that are contained in the specified array.
  */
  retainAll(items:T[]):boolean {
    return this.removeIf((item) => (items.indexOf(item)==-1));
  }

  /**
    Returns the number of elements in this collection.
  */
  size():number {
    return this._store.length;
  }

  /**
    Returns an array containing all of the elements in this collection
  */
  toArray():T[] {
    return [...this._store];
  }

  /**
    Performs an action for each item in this collection.
  */
  forEach(action:(item:T, index:number, collection:Collection<T>) => void):void {
    this._store.forEach((item:T,index:number)=> {
      action(item,index,this);
    });
  }

  /**
    Return iterator for this collection.
  */
  iterator():Iterator<T> {
    return new Iterator<T>(this._store);
  }
}
