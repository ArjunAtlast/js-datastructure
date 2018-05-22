import { EntryTable } from "./entry-table";
import { AbstractMap } from "../abstract/abstract-map";
import { Map } from "../../interfaces/map";
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
    insert(row: AbstractMap<string, V>): boolean;
    /**
    * Returns the number of rows in this table.
    * @example
    *   t.num_rows(); //returns 1
    */
    num_rows(): number;
    /**
    * Return a subset of rows in this table based on the filter function.
    * @example
    *   t.select((rowKey,row)=>(key>2)); //selects and returns all rows with associated key > 2
    */
    select(filterFn: (rowKey: number, row: Map<string, V>) => boolean): DataTable<V>;
    /**
    * Return a subset of columns in this table based on the filter function.
    * @example
    *   t.project((columnKey, col) => (['a','c'].indexOf(columnKey)!=-1)); //project only columns 'a' and 'c'
    */
    project(filterFn: (columnKey: string, col: Map<number, V | undefined>) => boolean): DataTable<V>;
    /**
    * Returns the first n rows in the table.
    * @example
    *   t.limit(5); //return first 5 rows of the table.
    */
    limit(n: number): DataTable<V>;
    /**
    * Returns the last n rows of this table.
    * @example
    *   t.limitLast(5); //return last 5 rows
    */
    limitLast(n: number): DataTable<V>;
    /**
    * Return a subset of rows beginning at the fromIndex inclusive and ending at toIndex exclusive.
    * @example
    *   t.subTable(2,6); //returns table with rows 2,3,4,5
    */
    subTable(fromIndex: number, toIndex: number): DataTable<V>;
}
