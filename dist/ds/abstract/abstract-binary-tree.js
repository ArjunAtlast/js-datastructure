"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const abstract_list_1 = require("./abstract-list");
/**
* A Node in a Binary Tree dataStructure
*/
class BinaryTreeNode {
    constructor(label, left = null, right = null) {
        this.label = label;
        this.left = left;
        this.right = right;
    }
}
exports.BinaryTreeNode = BinaryTreeNode;
/**
* Abstract Implementation of binary tree. (Note: This class cannot be used to initialize objects.)
*/
class AbstractBinaryTree {
    constructor(label) {
        this._root = label ? new BinaryTreeNode(label) : null;
    }
    /**
    * Returns the height of this binary tree.
    * @example
    *   bt.height();// returns a number.
    */
    height(node = this._root) {
        if (node === null)
            return -1;
        else
            return Math.max(this.height(node.left), this.height(node.right)) + 1;
    }
    /**
    * Returns the list of items obtained after inorder traversal of the tree starting from the specified node (default root).
    * @example
    *   //bt:BinaryTree<number>
    *   bt.inorder();
    */
    inorder(node = this._root) {
        let curList = new abstract_list_1.AbstractList();
        if (node === null)
            return curList;
        node.left && curList.addAll(this.inorder(node.left).toArray());
        curList.add(node.label);
        node.right && curList.addAll(this.inorder(node.right).toArray());
        return curList;
    }
    /**
    * Returns the list of items obtained after preorder traversal of the tree starting from the specified node (default root).
    * @example
    *   //bt:BinaryTree<number>
    *   bt.preorder();
    */
    preorder(node = this._root) {
        let curList = new abstract_list_1.AbstractList();
        if (node == null)
            return curList;
        curList.add(node.label);
        node.left && curList.addAll(this.preorder(node.left).toArray());
        node.right && curList.addAll(this.preorder(node.right).toArray());
        return curList;
    }
    /**
    * Returns the list of items obtained after postorder traversal of the tree starting from the specified node (default root).
    * @example
    *   //bt:BinaryTree<number>
    *   bt.postorder();
    */
    postorder(node = this._root) {
        let curList = new abstract_list_1.AbstractList();
        if (node == null)
            return curList;
        node.left && curList.addAll(this.postorder(node.left).toArray());
        node.right && curList.addAll(this.postorder(node.right).toArray());
        curList.add(node.label);
        return curList;
    }
}
exports.AbstractBinaryTree = AbstractBinaryTree;
