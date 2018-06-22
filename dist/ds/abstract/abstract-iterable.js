"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AbstractIterable {
    [Symbol.iterator]() {
        return this.iterator();
    }
}
exports.AbstractIterable = AbstractIterable;
