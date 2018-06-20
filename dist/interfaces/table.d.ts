import { Map } from "./map";
import { Set } from "./set";
export interface Table<R, C, V> {
    /**
    * Add a row to this table.
    */
    add(rowKey: R, row: Map<C, V>): boolean;
    /**
    * Replaces the value at the specified position in this table with the specified value.
    */
    set(rowKey: R, columnKey: C, value: V): V | undefined;
    /**
    * Read an entry from this table.
    */
    get(rowKey: R, columnKey: C): V | undefined;
    /**
    * Read an entire row of this table.
    */
    fetch(rowKey: R): Map<C, V> | undefined;
    /**
    * Read an entire column of this table.
    */
    extract(columnKey: C): Map<R, V | undefined>;
    /**
    * Return a subset of rows in this table based on the filter function.
    */
    select(filterFn: (key: R, row: Map<C, V>) => boolean): Table<R, C, V>;
    /**
    * Return a subset of columns in this table based on the filter function.
    */
    project(columns: Set<C>): Table<R, C, V>;
    /**
    * Delete an entire row from this table.
    */
    delete(rowKey: R): Map<C, V> | undefined;
    /**
    * Delete an entire row from this table based on filter function.
    */
    deleteIf(filterFn: (key: R, row: Map<C, V>) => boolean): void;
    /**
    * Delete an entire column from this table.
    */
    drop(columnKey: C): void;
    /**
    * Remove an entry from this table.
    */
    remove(rowKey: R, columnKey: C): V | undefined;
}
