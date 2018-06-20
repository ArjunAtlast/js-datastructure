"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const abstract_table_1 = require("../abstract/abstract-table");
const abstract_set_1 = require("../abstract/abstract-set");
/**
  Entry Table is mapping from a set of row and column keys to a value.
*/
class EntryTable extends abstract_table_1.AbstractTable {
    constructor() {
        super();
    }
    /**
    * Return a subset of rows in this table based on the filter function.
    * @example
    *   t.select((rowKey,row)=>(key>2)); //selects and returns all rows with associated key > 2
    */
    select(filterFn) {
        let et = new this.constructor();
        this._store.forEach((key, value) => {
            if (filterFn(key, value))
                et.add(key, value);
        });
        return et;
    }
    /**
    * Return a subset of columns in this table based on the filter function.
    * @example
    *   t.project([1,3]); //project only columns 1 and 3
    */
    project(columns) {
        let et = new this.constructor();
        this._store.forEach((k, v) => {
            //find submap for each map associated with row key
            et.add(k, v.subMap((k) => (columns.contains(k))));
        });
        return et;
    }
    /**
    * Delete an entire row from this table based on filter function.
    * @example
    *   t.deleteIf((rowKey, row) => (row.get(2)=='02')); //delete all rows with value '02' in the cell correspondin to column 2.
    */
    deleteIf(filterFn) {
        this._store.forEach((key, value) => {
            if (filterFn(key, value))
                this.delete(key);
        });
    }
    /**
    * Return the set of all column keys of this table.
    * @example
    *   t.attributes(); //returns <Set>{1,2,3}
    */
    attributes() {
        let attrs = new abstract_set_1.AbstractSet();
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
    indexes() {
        return this._store.keySet();
    }
}
exports.EntryTable = EntryTable;
