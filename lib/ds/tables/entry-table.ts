import { AbstractTable } from "../abstract/abstract-table";
import { Map } from "../../interfaces/map";
import { Set } from "../../interfaces/set";
import { AbstractSet } from "../abstract/abstract-set";

export class EntryTable<R, C, V> extends AbstractTable<R, C, V> {
  constructor() {
    super();
  }

  /**
  * Return a subset of rows in this table based on the filter function.
  * @example
  *   t.select((rowKey,row)=>(key>2)); //selects and returns all rows with associated key > 2
  */
  select(filterFn: (rowKey: R, row: Map<C, V>) => boolean): EntryTable<R, C, V> {
    let et = new EntryTable<R,C,V>();
    this._store.forEach((key, value) => {
      if(filterFn(key,value)) et.add(key, value);
    });
    return et;
  }

  /**
  * Return a subset of columns in this table based on the filter function.
  * @example
  *   t.project((columnKey, col) => ([1,3].indexOf(columnKey)!=-1)); //project only columns 1 and 3
  */
  project(filterFn: (columnKey: C, col: Map<R, V|undefined>) => boolean): EntryTable<R, C, V> {
    let et = new EntryTable<R,C,V>();
    this.attributes().forEach((columnKey) => {
      let col = this.extract(columnKey);
      if(filterFn(columnKey, col)) {
        col.forEach((rowKey, value)=>{
          if(value) et.set(rowKey, columnKey, value);
        });
      }
    });
    return et;
  }

  /**
  * Delete an entire row from this table based on filter function.
  * @example
  *   t.deleteIf((rowKey, row) => (row.get(2)=='02')); //delete all rows with value '02' in the cell correspondin to column 2.
  */
  deleteIf(filterFn: (rowKey: R, row: Map<C, V>) => boolean): void {
    this._store.forEach((key, value) => {
      if(filterFn(key,value)) this.delete(key);
    });
  }

  /**
  * Return the set of all column keys of this table.
  * @example
  *   t.attributes(); //returns <Set>{1,2,3}
  */
  attributes():Set<C> {
    let attrs:Set<C> = new AbstractSet<C>();
    this._store.forEach((key, value) => {
      attrs.addAll(value.keySet().toArray());
    });
    return attrs;
  }

  /**
  * Return the set of all row keys of this table.
  * @example
  *   t.indexes(); //returns <Set>{0}
  */
  indexes():Set<R> {
    return this._store.keySet();
  }
}
