import { AbstractQueue } from "../abstract/abstract-queue";
import { Serializable } from "../../interfaces/serializable";

/**
  An unbounded priority queue. The elements of the priority queue are ordered according to the compare function provided at queue construction time.
*/
export class PriorityQueue<E> extends AbstractQueue<E> implements Serializable {
    protected _comparator:(x:E,y:E)=>number;

    constructor(compareFn:(x:E,y:E)=>number, ...items:E[]){
      super(...items);
      this._comparator = compareFn;
      this._store.sort(compareFn);
    }

    /**
    * Inserts the specified item into this priority queue.
    * @example
    *   //queue containes [1,8,12] (compareFn designed for ascending order)
    *   queue.add(6); //[1,6,8,12]
    */
    add(item: E):boolean {
      if(super.add(item)) {
        this._store.sort(this._comparator);
        return true;
      }
      else return false;
    }

    /**
    * Inserts all items of an array into this priority queue.
    * @example
    *   //queue containes [1,8,12] (compareFn designed for ascending order)
    *   queue.addAll([6,10,15]); //[1,6,8,10,12,15]
    */
    addAll(items: E[]):boolean {
      if(super.addAll(items)) {
        this._store.sort(this._comparator);
        return true;
      }
      else return false;
    }

    /**
    * Returns the compare function used to order the elements in this queue.
    * @example
    *   queue.comparator(); //returns a function
    */
    comparator():(x:E,y:E)=>number {
      return this._comparator;
    }

    /**
    * Converts the queue into a JSON String
    * @example
    *   //queue contains [1,2,3,4]
    *   console.log(queue.toString((x)=>(x.toString())));
    *   //Output
    *   //[1,2,3,4]
    */
    toString(serializerFn:(item:E)=>string): string {
      return "["+this._store.map((item:E) => {
        return serializerFn(item);
      }).join(",")+"]";
    }

    /**
    * Return the Object from the JSON string
    * @example
    *   //json = "[1,2,3,4]"
    *   queue = new PriorityQueue<number>((x,y)=>(x-y)).fromString(json,(x)=>(parseFloat(x)));
    *   //queue contains [1,2,3,4]
    *
    */
    fromString(json:string, deserializerFn:(itemJSON:string)=>E):PriorityQueue<E> {
      let object:any[] = JSON.parse(json);
      let finalArr:E[] = object.map((x)=>(deserializerFn(JSON.stringify(x))));
      return new PriorityQueue<E>(this.comparator(), ...finalArr);
    }

}
