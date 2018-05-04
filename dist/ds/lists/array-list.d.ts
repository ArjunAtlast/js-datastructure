import { AbstractList } from "../abstract/abstract-list";
import { Cloneable } from "../../interfaces/cloneable";
import { Serializable } from "../../interfaces/serializable";
/**
  Resizable-array implementation of the List interface.
*/
export declare class ArrayList<E> extends AbstractList<E> implements Cloneable<ArrayList<E>>, Serializable {
    protected _capacity: number;
    /**
    * Constructs an empty list with an initial capacity of ten.
    */
    constructor();
    /**
    * Constructs an empty list with the specified initial capacity.
    */
    constructor(initialCapacity: number);
    /**
    * Constructs a list containing the items.
    */
    constructor(initialCapacity: number, ...items: E[]);
    /**
    * Appends the specified element to the end of this list
    */
    add(item: E): boolean;
    /**
    * Inserts the specified element at the specified position in this list
    * @example
    *   //list contains [1,2,3]
    *   list.add(4); //[1,2,3,4]
    *   list.add(2.5,2); //[1,2,2.5,3,4]
    */
    add(item: E, index: number): boolean;
    /**
    * Appends all of the elements in the specified array to the end of this list
    */
    addAll(items: E[]): boolean;
    /**
    * Inserts all of the elements in the specified array into this list at the specified position.
    * @example
    *   //list contains [1,2,3]
    *   list.addAll([4,5]); //[1,2,3,4,5]
    *   list.addAll([2.1,2.2,2.3], 2); //[1,2,2.1,2.2,2.3,3,4]
    */
    addAll(items: E[], index: number): boolean;
    /**
    * Increases the capacity of this ArrayList instance, if necessary, to ensure that it can hold at least the number of elements specified by the minimum capacity argument.
    * @example
    *   //arrayList has a capacity 10
    *   arrayList.ensureCapacity(15);
    *   //new capacity is 15
    */
    ensureCapacity(minCapacity: number): void;
    /**
    * Replaces each element of this list with the result of applying the mapping function
    * @example
    *   //arrayList contains [1,2,3,4]
    *   arrayList.map((x)=>(x*2));
    *   //now arrayList contains [2,4,6,8]
    */
    replaceAll(mappingFn: (item: E) => E): void;
    /**
    * Returns a shallow copy of this ArrayList instance.
    * @example
    *   let newArrayList = arrayList.clone();
    */
    clone(): ArrayList<E>;
    /**
    * Trims the capacity of this ArrayList instance to be the list's current size.
    * @example
    *   //arrayList contains [1,2,3,4,5] and capacity is 10
    *   arrayList.trimToSize(); //new capacity is 5
    */
    trimToSize(): void;
    /**
    * Converts the arrayList into a JSON String
    * @example
    *   //arrayList contains [1,2,3,4]
    *   console.log(arrayList.toString());
    *   //Output
    *   //"[1,2,3,4]"
    */
    toString(serializerFn: (item: E) => string): string;
    /**
    * Return the Object from the JSON string
    * @example
    *   //json = "[1,2,3,4]"
    *   arrayList = new ArrayList<number>().fromString(json,(x)=>(parseFloat(x)));
    *   //arrayList contains [1,2,3,4]
    *
    */
    fromString(json: string, deserializerFn: (itemJ: string) => E): ArrayList<E>;
}
