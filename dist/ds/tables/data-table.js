"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const entry_table_1 = require("./entry-table");
/**
* An entry table with enumerable rowKeys (number) and string columnKeys.
*/
class DataTable extends entry_table_1.EntryTable {
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
    insert(row) {
        return !this._store.putIfAbsent(this.num_rows(), row);
    }
    /**
    * Returns the number of rows in this table.
    * @example
    *   t.num_rows(); //returns 1
    */
    num_rows() {
        return this._store.size();
    }
    /**
    * Returns the first n rows in the table.
    * @example
    *   t.limit(5); //return first 5 rows of the table.
    */
    limit(n) {
        let dt = new this.constructor();
        this._store.forEach((key, value) => {
            if (key < n)
                dt.insert(value);
        });
        return dt;
    }
    /**
    * Returns the last n rows of this table.
    * @example
    *   t.limitLast(5); //return last 5 rows
    */
    limitLast(n) {
        let dt = new this.constructor();
        this._store.forEach((key, value) => {
            if (key >= this.num_rows() - n)
                dt.insert(value);
        });
        return dt;
    }
    /**
    * Return a subset of rows beginning at the fromIndex inclusive and ending at toIndex exclusive.
    * @example
    *   t.subTable(2,6); //returns table with rows 2,3,4,5
    */
    subTable(fromIndex, toIndex) {
        return this.select((rowKey) => ((rowKey >= fromIndex && rowKey < toIndex)));
    }
}
exports.DataTable = DataTable;
