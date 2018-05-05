import { AbstractList } from "../abstract/abstract-list";
import { Cloneable } from "../../interfaces/cloneable";
import { Serializable } from "../../interfaces/serializable";
export declare class SwappableList<E> extends AbstractList<E> implements Cloneable<SwappableList<E>>, Serializable {
    /**
    * Swap between items of given indexes. Returns true on success else false.
    * @example
    *   ////list contains [1,2,3,4]
    *   list.swap(1,3); //returns true
    *   //now list contains [1,4,3,2]
    */
    swap(sourceIndex: number, destinationIndex: number): boolean;
    /**
    * Swap between item in the given index and the item just before it.
    * @example
    *   ////list contains [1,2,3,4]
    *   list.rise(2); //returns true
    *   //now list contains [1,3,2,4]
    */
    rise(index: number): boolean;
    /**
    * Swap between item in the given index and the item just after it.
    * @example
    *   ////list contains [1,2,3,4]
    *   list.fall(2); //returns true
    *   //now list contains [1,2,4,3]
    */
    fall(index: number): boolean;
    /**
    * Rotate the list based on the direction specified (-ve : left, +ve/0 : right);
    * @example
    *   //list contains [1,2,3,4]
    *   list.rotate(-1); //returns true
    *   //now list contains [2,3,4,1]
    */
    rotate(direction: number): void;
    /**
    * Returns a shallow copy of this ArrayList instance.
    * @example
    *   let newList = swappableList.clone();
    */
    clone(): SwappableList<E>;
    /**
    * Converts the list into a JSON String
    * @example
    *   //list contains [1,2,3,4]
    *   console.log(list.toString((x)=>(x.toString())));
    *   //Output
    *   //"[1,2,3,4]"
    */
    toString(serializerFn: (item: E) => string): string;
    /**
    * Return the Object from the JSON string
    * @example
    *   //json = "[1,2,3,4]"
    *   list = new SwappableList<number>().fromString(json,(x)=>(parseFloat(x)));
    *   //list contains [1,2,3,4]
    *
    */
    fromString(json: string, deserializerFn: (itemJ: string) => E): SwappableList<E>;
}
