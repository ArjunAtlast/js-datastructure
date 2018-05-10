"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var array_list_1 = require("./array-list");
/**
* A list of limited size 'n' that stores only the last n items.
*/
var HistoryList = /** @class */ (function (_super) {
    __extends(HistoryList, _super);
    function HistoryList() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
    * Inserts the specified element to this list
    * @example
    *   //list contains [1,2,3,4,5,6] -capacity 6
    *   list.add(7); //[2,3,4,5,6,7]
    */
    HistoryList.prototype.add = function (item, index) {
        if (index === void 0) { index = undefined; }
        if (this.size() >= this._capacity) {
            this.removeAt(0);
            return this.add(item);
        }
        else
            return _super.prototype.add.call(this, item);
    };
    /**
    * Inserts all of the elements in the specified array into this list.
    * @example
    *   //list contains [1,2,3,4,5] - capacity 6
    *   list.addAll([6,7]); //[2,3,4,5,6,7]
    */
    HistoryList.prototype.addAll = function (items, index) {
        if (index === void 0) { index = undefined; }
        if (this.size() + items.length > this._capacity) {
            var needSpace = this.size() + items.length - this._capacity;
            this._store.splice(0, needSpace);
            return this.addAll(items);
        }
        else
            return _super.prototype.addAll.call(this, items);
    };
    return HistoryList;
}(array_list_1.ArrayList));
exports.HistoryList = HistoryList;
