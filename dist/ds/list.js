"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var List = /** @class */ (function () {
    function List() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this._store = args.slice();
    }
    /*
      Add an item to list
    */
    List.prototype.add = function (item) {
        return this._store.push(item);
    };
    /*
      Read an item from the list
    */
    List.prototype.get = function (index) {
        return this._store[index];
    };
    return List;
}());
exports.List = List;
