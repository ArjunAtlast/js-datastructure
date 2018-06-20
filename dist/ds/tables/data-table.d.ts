import { EntryTable } from "./entry-table";
import { ArrayMap } from "../maps/array-map";
/**
* An entry table with enumerable rowKeys (number) and string columnKeys.
*/
export declare class DataTable<V> extends EntryTable<number, string, V> {
    /**
    * Insert a new row at the end of this table.
    * @example
    *   var t = new DataTable<string>();
    *   var r = new ArrayMap<number,string>(5);
    *   r.add("a",'0a');
    *   r.add("b",'0b');
    *   r.add("c",'0c');
    *   t.insert(r);
    *   /*
    *     +-----+-----+-----+-----+
    *     |  X  |  a  |  b  |  c  |
    *     +-----+-----+-----+-----+
    *     |  0  | 0a  | 0b  | 0c  |
    *     +-----+-----+-----+-----+
    */
    insert(row: ArrayMap<string, V>): boolean;
    /**
    * Returns the number of rows in this table.
    * @example
    *   t.num_rows(); //returns 1
    */
    num_rows(): number;
    /**
    * Returns the first n rows in the table.
    * @example
    *   t.limit(5); //return first 5 rows of the table.
    */
    limit(n: number): this;
    /**
    * Returns the last n rows of this table.
    * @example
    *   t.limitLast(5); //return last 5 rows
    */
    limitLast(n: number): this;
    /**
    * Return a subset of rows beginning at the fromIndex inclusive and ending at toIndex exclusive.
    * @example
    *   t.subTable(2,6); //returns table with rows 2,3,4,5
    */
    subTable(fromIndex: number, toIndex: number): this;
}
