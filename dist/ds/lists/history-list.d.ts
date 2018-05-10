import { ArrayList } from "./array-list";
/**
* A list of limited size 'n' that stores only the last n items.
*/
export declare class HistoryList<E> extends ArrayList<E> {
    /**
    * Appends the specified element to the end of this list
    */
    add(item: E): boolean;
    /**
    * Appends all of the elements in the specified array to the end of this list
    */
    addAll(items: E[]): boolean;
}
