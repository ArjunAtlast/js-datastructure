"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LLNode = /** @class */ (function () {
    function LLNode(val, next) {
        if (next === void 0) { next = null; }
        this.val = val;
        this.next = next;
    }
    return LLNode;
}());
var LinkedList = /** @class */ (function () {
    function LinkedList() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (args.length == 0) {
            this._head = this._tail = null;
        }
        else {
            this._head = new LLNode(args[0]);
            var curr = this._head;
            for (var i = 1; i < args.length; i++) {
                curr.next = new LLNode(args[i]);
                curr = curr.next;
            }
            this._tail = curr;
        }
    }
    /**
      Insert an item at the given position.
      pos = 0 : insert at beginning.
      pos =-1 : insert at end.
    */
    LinkedList.prototype.insert = function (item, pos) {
        if (pos === void 0) { pos = -1; }
        if (pos == -1) {
            if (this._tail != null) {
                this._tail.next = new LLNode(item);
                this._tail = this._tail.next;
            }
            else {
                this._head = this._tail = new LLNode(item);
            }
        }
        else if (pos == 0) {
            this._head = new LLNode(item, this._head);
            if (this._tail == null)
                this._tail = this._head;
        }
        else {
            var curr = this._head;
            for (var i = 1; i < pos; i++) {
                if (curr == null)
                    throw new Error("Invalid Position " + pos);
                else
                    curr = curr.next;
            }
            if (curr != null)
                curr.next = new LLNode(item, curr.next);
        }
    };
    /**
      Delete an item from the given position.
      pos = 0 : insert at beginning.
      pos =-1 : insert at end.
    */
    LinkedList.prototype.delete = function (pos) {
        if (pos === void 0) { pos = -1; }
        //No elements in list
        if (this._head == null || this._tail == null)
            return undefined;
        /*
          If only single element return head and make it null
        */
        else if (this._head.next == null && (pos == -1 || pos == 0)) {
            var temp = this._head;
            this._head = this._tail = null;
            return temp.val;
        }
        /*
          Delete from end
        */
        else if (pos == -1) {
            var curr = this._head;
            while (curr.next != null && curr.next.next != null) {
                curr = curr.next;
            }
            if (curr.next != null) {
                var temp = curr.next;
                this._tail = curr;
                this._tail.next = null;
                return temp.val;
            }
        }
        /*
          Delete from Beginning
        */
        else if (pos == 0) {
            var temp = this._head;
            this._head = this._head.next;
            return temp.val;
        }
        /*
          Delete from Middle
        */
        else {
            var curr = this._head;
            for (var i = 0; i < pos; i++) {
                if (curr.next != null)
                    curr = curr.next;
            }
            if (curr.next != null) { //the position is not empty
                var temp = curr.next;
                curr.next = curr.next.next;
                return temp.val;
            }
        }
        return undefined; //only if deletion failed
    };
    LinkedList.prototype.find = function (pos) {
        if (pos === void 0) { pos = -1; }
        if (pos == -1)
            return this.last;
        else {
            var curr = this._head;
            for (var i = 0; i < pos; i++) {
                if (curr != null)
                    curr = curr.next;
            }
            if (curr != null)
                return curr.val;
        }
        return undefined;
    };
    Object.defineProperty(LinkedList.prototype, "first", {
        /**
          Value of head
        */
        get: function () {
            return this._head ? this._head.val : undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LinkedList.prototype, "last", {
        /**
          Value of tail
        */
        get: function () {
            return this._tail ? this._tail.val : undefined;
        },
        enumerable: true,
        configurable: true
    });
    return LinkedList;
}());
exports.LinkedList = LinkedList;
