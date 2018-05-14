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
    /**
    * Returns the recent (last) n items from the list
    * @example
    *   //list contains [1,2,3,4,5]
    *   list.recent(3); //[3,4,5]
    */
    recent(n) {
        return this._store.slice(Math.max(this.size() - n, 0), this.size());
    }
    /**
    * Clear old items in the history list retaining the last n elements.
    * @example
    *   //list contains [1,2,3,4,5]
    *   list.clearUntil(2); //return [1,2,3]
    *   //now list contain [4,5]
    */
    clearUntill(n) {
        return this._store.splice(0, this.size() - n);
    }
}
exports.HistoryList = HistoryList;
