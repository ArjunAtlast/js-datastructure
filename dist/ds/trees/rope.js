"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const abstract_binary_tree_1 = require("../abstract/abstract-binary-tree");
/**
* A rope is a binary tree where each leaf node contains a short string.
* Used to efficiently store and manipulate a very long string
*/
class Rope extends abstract_binary_tree_1.AbstractBinaryTree {
    constructor(str, spacing) {
        super();
        if (!str)
            this._root = new RopeNode();
        else if (!spacing)
            this._root = new RopeNode(str);
        else {
            this._root = new RopeNode();
            let labels = str.match(new RegExp(`(.|[\r\n]){1,${spacing}}`, 'g'));
            for (let i = 0, j = labels.length; i < j; i++) {
                this.insert(labels[i]);
            }
            this.balance();
        }
    }
    /**
    * Create a new Rope from the RopeNode.
    */
    static fromNode(node) {
        let rope = new Rope();
        rope.insertNode(node);
        return rope;
    }
    /**
    * Returns the total length of the string stored in this rope.
    */
    get length() {
        if (this._root.left) {
            return this._root.weight + (this._root.right ? this._root.right.length : 0);
        }
        else
            return this._root.label.length;
    }
    insert(strOrRope, index) {
        if (index === undefined) {
            let rope = new Rope(strOrRope);
            this.concat(rope);
        }
        else {
            if (index >= this.length)
                return false;
            else {
                let right = this.split(index);
                if (typeof strOrRope === "string")
                    this.insert(strOrRope);
                else
                    this.concat(strOrRope);
                this.concat(right);
            }
        }
        return true;
    }
    delete(i, j = 0) {
        if (typeof i === "string")
            return false;
        else {
            let right = this.split(i);
            this.concat(right.split(j));
            return right;
        }
    }
    /**
    * Insert the specified node at the end of this rope.
    */
    insertNode(node) {
        if (this._root.weight === 0) {
            this._root = node;
        }
        else {
            let parent = new RopeNode(this._root, node);
            this._root = parent;
        }
    }
    /**
    * Concatenate the specified rope with this rope.
    */
    concat(rope) {
        if (this._root.weight === 0) {
            this._root = rope.getRoot();
        }
        else {
            let parent = new RopeNode(this._root, rope.getRoot());
            this._root = parent;
        }
        return this;
    }
    get(index, node = this._root) {
        if (node.weight <= index) {
            if (node.right == null)
                return undefined;
            else
                return this.get(index - node.weight, node.right);
        }
        else if (node.left !== null) {
            return this.get(index, node.left);
        }
        else {
            return node.label[index];
        }
    }
    split(index, node = this._root) {
        if (node.weight <= index) {
            if (node.right == null)
                return new Rope();
            else
                return this.split(index - node.weight, node.right);
        }
        else if (node.left !== null) {
            let rightRope = node.right ? Rope.fromNode(node.right) : new Rope();
            let splitRope = this.split(index, node.left);
            node.right = null;
            splitRope.concat(rightRope);
            return splitRope;
        }
        else {
            let left = new RopeNode(node.label.substring(0, index));
            let right = new Rope(node.label.substring(index));
            node.left = left;
            node.label = "";
            return right;
        }
    }
    /**
    * Return the root node of this rope.
    */
    getRoot() {
        return this._root;
    }
    report(i, j, node = this._root) {
        if (node.weight <= i) {
            if (!node.right)
                return "";
            else
                return this.report(i - node.weight, j, node.right);
        }
        else if (node.left) {
            if (node.weight > i + j)
                return this.report(i, j, node.left);
            else {
                return this.inorder(node).toArray().join("").substring(i, i + j);
            }
        }
        else {
            return node.label.substring(i, i + j);
        }
    }
    /**
    * Convert the rope into a string.
    */
    toString() {
        return this.inorder().toArray().join("");
    }
    /**
    * Balance the rope.
    */
    balance() {
        this._root = this.balanceNode(this._root);
    }
    balanceNode(node) {
        if (node == null)
            return node;
        let balance_factor = this.height(node.left) - this.height(node.right);
        while (balance_factor > 1) {
            node = this.rotateRight(node);
            balance_factor = this.height(node.left) - this.height(node.right);
        }
        while (balance_factor < -1) {
            node = this.rotateLeft(node);
            balance_factor = this.height(node.left) - this.height(node.right);
        }
        node.left = this.balanceNode(node.left);
        node.right = this.balanceNode(node.right);
        return node;
    }
    rotateRight(node) {
        let left = node.left;
        node.left = left.right;
        left.right = node;
        return left;
    }
    rotateLeft(node) {
        let right = node.right;
        node.right = right.left;
        right.left = node;
        return right;
    }
}
exports.Rope = Rope;
/**
* Represents a node of Rope data structure.
*/
class RopeNode extends abstract_binary_tree_1.BinaryTreeNode {
    constructor(labelOrLeft = "", right = null) {
        super("");
        if (typeof labelOrLeft === "string") {
            this.label = labelOrLeft;
            this.left = null;
            this.right = null;
        }
        else {
            this.label = "";
            this.left = labelOrLeft;
            this.right = right;
        }
    }
    /**
    * Returns the weight associated with this node.
    */
    get weight() {
        if (this.left) {
            return this.left.length;
        }
        else
            return this.label.length;
    }
    /**
    * Returns the length of the string in this node.
    */
    get length() {
        return this.weight + (this.right ? this.right.length : 0);
    }
}
exports.RopeNode = RopeNode;
