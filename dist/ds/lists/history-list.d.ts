import { ArrayList } from "./array-list";
/**
* A list of limited size 'n' that stores only the last n items.
*/
export declare class HistoryList<E> extends ArrayList<E> {
    /**
    * Appends the specified element to the end of this list
    * @example
    *   //list contains [1,2,3,4,5,6] -capacity 6
    *   list.add(7); //[2,3,4,5,6,7]
    */
    add(item: E): boolean;
    /**
    * Appends all of the elements in the specified array to the end of this list
    * @example
    *   //list contains [1,2,3,4,5] - capacity 6
    *   list.addAll([6,7]); //[2,3,4,5,6,7]
    */
    addAll(items: E[]): boolean;
}
