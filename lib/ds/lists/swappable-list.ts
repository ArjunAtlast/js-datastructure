import { AbstractList } from "../abstract/abstract-list";
import { Cloneable } from "../../interfaces/cloneable";
import { Serializable } from "../../interfaces/serializable";

export class SwappableList<E> extends AbstractList<E> implements Cloneable<SwappableList<E>>, Serializable {

  /**
  * Swap between items of given indexes. Returns true on success else false.
  * @example
  *   ////list contains [1,2,3,4]
  *   list.swap(1,3); //returns true
  *   //now list contains [1,4,3,2]
  */
  swap(sourceIndex:number, destinationIndex:number):boolean {
    let destination = this.get(destinationIndex);
    let source = this.get(sourceIndex);
    if(destination!=undefined && source != undefined) {
      this.set(destinationIndex, source);
      this.set(sourceIndex,destination);
      return true;
    }
    return false;
  }

  /**
  * Swap between item in the given index and the item just before it.
  * @example
  *   ////list contains [1,2,3,4]
  *   list.rise(2); //returns true
  *   //now list contains [1,3,2,4]
  */
  rise(index:number):boolean {
      return this.swap(index, index-1)
  }

  /**
  * Swap between item in the given index and the item just after it.
  * @example
  *   ////list contains [1,2,3,4]
  *   list.fall(2); //returns true
  *   //now list contains [1,2,4,3]
  */
  fall(index:number):boolean {
    return this.rise(index+1);
  }

  /**
  * Rotate the list based on the direction specified (-ve : left, +ve/0 : right);
  * @example
  *   //list contains [1,2,3,4]
  *   list.rotate(-1); //returns true
  *   //now list contains [2,3,4,1]
  */
  rotate(direction:number):void {
    if(direction<0) {
      let item = this._store.shift();
      if(item)  this._store.push(item);
    }
    else {
      let item = this._store.pop();
      if(item)  this._store.unshift(item);
    }
  }

  /**
  * Returns a shallow copy of this ArrayList instance.
  * @example
  *   let newList = swappableList.clone();
  */
  clone(): this {
    return new (<any>this.constructor)(...this._store);
  }

  /**
  * Converts the list into a JSON String
  * @example
  *   //list contains [1,2,3,4]
  *   console.log(list.toString((x)=>(x.toString())));
  *   //Output
  *   //"[1,2,3,4]"
  */
  toString(serializerFn:(item:E)=>string = (item:E) => (JSON.stringify(item))): string {
    return "["+this._store.map((item:E) => {
      return serializerFn(item);
    }).join(",")+"]";
  }

  /**
  * Return the Object from the JSON string
  * @example
  *   //json = "[1,2,3,4]"
  *   list = new SwappableList<number>().fromString(json,(x)=>(parseFloat(x)));
  *   //list contains [1,2,3,4]
  *
  */
  fromString(json:string, deserializerFn:(itemJ:string)=>E):SwappableList<E> {
    let object:any[] = JSON.parse(json);
    let finalArr:E[] = object.map((x)=>(deserializerFn(JSON.stringify(x))));
    return new SwappableList<E>(...finalArr);
  }
}
