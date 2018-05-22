import { Table } from "../../interfaces/table";
import { Map } from "../../interfaces/map";
import { AbstractMap } from "./abstract-map";
import { ArrayMap } from "../maps/array-map";

export abstract class AbstractTable<R,C,V> implements Table<R,C,V> {
  protected _store:AbstractMap<R, AbstractMap<C,V>> ;

  constructor() {
    this._store = new ArrayMap<R, ArrayMap<C,V>>(Infinity);
  }
  /**
  * Add a row to this table only if row curresponding to given key is absent.
  * @example
  *   //t:Table<number,number,string>
  *   var r = new ArrayMap<number,string>(5);
  *   r.add(1,'01');
  *   r.add(2,'02');
  *   r.add(3,'03');
  *   t.add(0, r);
  *   /*
  *     +-----+-----+-----+-----+
  *     |  X  |  1  |  2  |  3  |
  *     +-----+-----+-----+-----+
  *     |  0  | 01  | 02  | 03  |
  *     +-----+-----+-----+-----+
  */
  add(rowKey:R, row:AbstractMap<C,V>):boolean {
    return !this._store.putIfAbsent(rowKey, row);
  }
  /**
  * Replaces the value at the specified position in this table with the specified value.
  * @example
  *   t.set(0,2,'2'); //returns '02'
  *   t.set(1,2,'12'); //returns undefined
  *   /*
  *     +-----+-----+-----+-----+
  *     |  X  |  1  |  2  |  3  |
  *     +-----+-----+-----+-----+
  *     |  0  | 01  |  2  | 03  |
  *     +-----+-----+-----+-----+
  */
  set(rowKey:R, columnKey:C, value:V):V|undefined {
    if(!this._store.get(rowKey)) this._store.put(rowKey, new ArrayMap<C,V>(Infinity));
    return this._store.get(rowKey)!.put(columnKey, value);
  }

  /**
  * Read an entry from this table.
  * @example
  *   t.get(0,3); //returns '03'
  */
  get(rowKey:R, columnKey:C):V|undefined {
    let row;
    return (row = this._store.get(rowKey)) && row.get(columnKey);
  }
  /**
  * Read an entire row of this table.
  * @example
  *   t.fetch(0);  //returns <Map>[{1:'01'},{2:'02'},{3:'03'}]
  *   t.fetch(1);  //returns undefined
  */
  fetch(rowKey:R):AbstractMap<C,V>|undefined {
    return this._store.get(rowKey);
  }
  /**
  * Read an entire column of this table.
  * @example
  *   t.extract(2); //returns <Map>[{0:'02'}]
  *   t.extract(5); //returns <Map>[{0: undefined}]
  */
  extract(columnKey:C):AbstractMap<R,V|undefined> {
    let col = new ArrayMap<R,V|undefined>(Infinity);
    this._store.forEach((key, value) => {
      col.put(key, value!.get(columnKey));
    });
    return col;
  }
  /**
  * Return a subset of rows in this table based on the filter function.
  */
  abstract select(filterFn:(key:R, row:Map<C,V>)=>boolean):Table<R,C,V>;
  /**
  * Return a subset of columns in this table based on the filter function.
  */
  abstract project(filterFn:(key:C, row:Map<R,V|undefined>)=>boolean):Table<R,C,V>;
  /**
  * Delete an entire row from this table.
  * @example
  *   t.delete(0); //calling this function makes the table empty.
  */
  delete(rowKey:R):Map<C,V>|undefined {
    return this._store.remove(rowKey);
  }
  /**
  * Delete an entire row from this table based on filter function.
  */
  abstract deleteIf(filterFn:(rowKey:R, row:Map<C,V>)=>boolean):void;
  /**
  * Delete an entire column from this table.
  * @example
  *   t.drop(2);
  *   /*
  *     +-----+-----+-----+
  *     |  X  |  1  |  3  |
  *     +-----+-----+-----+
  *     |  0  | 01  | 03  |
  *     +-----+-----+-----+
  */
  drop(columnKey:C):void {
    this._store.forEach((key, value) => {
      value!.remove(columnKey);
    });
  }
  /**
  * Remove an entry from this table.
  * @example
  *   t.remove(0,3); //returns '03' and removes it from the table
  */
  remove(rowKey:R, columnKey:C):V|undefined {
    let row;
    return (row = this._store.get(rowKey)) && row.remove(columnKey);
  }
}
