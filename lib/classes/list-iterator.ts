import { Iterator } from "./iterator";

export class ListIterator<E> extends Iterator<E> {

  protected lastIndex:number=-1;

  /**
    Inserts the specified element into the list.
  */
  add(item:E):void {
    this._target.splice(this._index,0,item);
    this.lastIndex = -1;
  }

  /**
    Removes from the underlying Iterable the last element returned by this iterator.
  */
  remove():void {
    super.remove();
    this.lastIndex = -1;
  }

  /**
    Returns the next element in the iteration.
  */
  next():E|undefined {
    if(this.hasNext()){
      this.lastIndex = this._index;
      return this._target[this._index++];
    }
    return undefined;
  }

  /**
    Returns true if this list iterator has more elements when traversing the list in the reverse direction.
  */
  hasPrevious():boolean {
    return !(this._index == 0);
  }

  /**
    Returns the previous element in the list and moves the cursor position backwards.
  */
  previous():E|undefined {
    if(this.hasPrevious()){
      this.lastIndex = this._index-1;
      return this._target[--this._index];
    }
    return undefined;
  }

  /**
    Returns the index of the element that would be returned by a subsequent call to next().
  */
  nextIndex():number {
    return this.hasNext()?(this._index):-1;
  }

  /**
    Returns the index of the element that would be returned by a subsequent call to previous().
  */
  previousIndex():number {
    return this.hasPrevious()?(this._index-1):-1;
  }

  /**
    Replaces the last element returned by next() or previous() with the specified element.
  */
  set(item:E):void {
    if(this.lastIndex != -1) {
      this._target[this.lastIndex] = item;
    }
  }

}
