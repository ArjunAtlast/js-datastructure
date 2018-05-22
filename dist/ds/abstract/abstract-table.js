"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const array_map_1 = require("../maps/array-map");
class AbstractTable {
    constructor() {
        this._store = new array_map_1.ArrayMap(Infinity);
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
    add(rowKey, row) {
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
    set(rowKey, columnKey, value) {
        if (!this._store.get(rowKey))
            this._store.put(rowKey, new array_map_1.ArrayMap(Infinity));
        return this._store.get(rowKey).put(columnKey, value);
    }
    /**
    * Read an entry from this table.
    * @example
    *   t.get(0,3); //returns '03'
    */
    get(rowKey, columnKey) {
        let row;
        return (row = this._store.get(rowKey)) && row.get(columnKey);
    }
    /**
    * Read an entire row of this table.
    * @example
    *   t.fetch(0);  //returns <Map>[{1:'01'},{2:'02'},{3:'03'}]
    *   t.fetch(1);  //returns undefined
    */
    fetch(rowKey) {
        return this._store.get(rowKey);
    }
    /**
    * Read an entire column of this table.
    * @example
    *   t.extract(2); //returns <Map>[{0:'02'}]
    *   t.extract(5); //returns <Map>[{0: undefined}]
    */
    extract(columnKey) {
        let col = new array_map_1.ArrayMap(Infinity);
        this._store.forEach((key, value) => {
            col.put(key, value.get(columnKey));
        });
        return col;
    }
    /**
    * Delete an entire row from this table.
    * @example
    *   t.delete(0); //calling this function makes the table empty.
    */
    delete(rowKey) {
        return this._store.remove(rowKey);
    }
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
    drop(columnKey) {
        this._store.forEach((key, value) => {
            value.remove(columnKey);
        });
    }
    /**
    * Remove an entry from this table.
    * @example
    *   t.remove(0,3); //returns '03' and removes it from the table
    */
    remove(rowKey, columnKey) {
        let row;
        return (row = this._store.get(rowKey)) && row.remove(columnKey);
    }
}
exports.AbstractTable = AbstractTable;
