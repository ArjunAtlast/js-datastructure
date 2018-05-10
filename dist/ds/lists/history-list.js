"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const array_list_1 = require("./array-list");
/**
* A list of limited size 'n' that stores only the last n items.
*/
class HistoryList extends array_list_1.ArrayList {
    add(item, index = undefined) {
        if (this.size() >= this._capacity) {
            this.removeAt(0);
            return this.add(item);
        }
        else
            return super.add(item);
    }
    addAll(items, index = undefined) {
        if (this.size() + items.length > this._capacity) {
            let needSpace = this.size() + items.length - this._capacity;
            this._store.splice(0, needSpace);
            return this.addAll(items);
        }
        else
            return super.addAll(items);
    }
}
exports.HistoryList = HistoryList;
