"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const abstract_binary_tree_1 = require("../abstract/abstract-binary-tree");
class BinarySearchTree extends abstract_binary_tree_1.AbstractBinaryTree {
    constructor(compareFn, label) {
        super(label);
        this._comparator = compareFn;
    }
    /**
    * Insert a new item to the BST.
    * @example
    *   //bst:BinarySearchTree<number> : inorder -> 1,5,8,9,11
    *   bst.insert(10);  //inorder -> 1,5,8,9,10,11
    */
    insert(item) {
        if (this._root == null) {
            this._root = new abstract_binary_tree_1.BinaryTreeNode(item);
            return true;
        }
        else
            return this.insertItem(item, this._root);
    }
    /**
    * Insert multiple items to the BST.
    * @example
    *   //bst:BinarySearchTree<number> : inorder -> 1,5,8,9,11
    *   bst.insertMultiple(10,21,3,15);  //inorder -> 1,3,5,8,9,10,11,15,21
    */
    insertMultiple(...items) {
        items.forEach((item) => {
            this.insert(item);
        });
    }
    /**
    * Delete an item from the BST.
    * @example
    *   //bst:BinarySearchTree<number> : inorder -> 1,5,8,9,11
    *   bst.delete(5);  //inorder -> 1,8,9,10,11
    */
    delete(item) {
        return this.deleteItem(item, this._root);
    }
    /**
    * Search an item in the tree. Returns the item if found else returns null.
    * @example
    *   bst.search(25);
    */
    search(item) {
        return this.searchItem(item, this._root);
    }
    /**
    * Returns the compare function used to order the elements in this BST.
    * @example
    *   bst.comparator(); //returns a function
    */
    comparator() {
        return this._comparator;
    }
    /*
    * Private Methods
    */
    insertItem(item, node) {
        if (this._comparator(item, node.label) > 0) {
            if (node.right)
                return this.insertItem(item, node.right);
            else
                node.right = new abstract_binary_tree_1.BinaryTreeNode(item);
        }
        else {
            if (node.left)
                return this.insertItem(item, node.left);
            else
                node.left = new abstract_binary_tree_1.BinaryTreeNode(item);
        }
        return true;
    }
    deleteItem(item, node) {
        if (node === null)
            return false;
        else {
            if (node.label === item) {
                //If node is leaf
                if (node.left === null && node.right === null)
                    this.remove(node);
                //only right child
                else if (node.left === null) {
                    let repNode = this.inorderSuccessor(node);
                    let newLabel = repNode.label;
                    this.deleteItem(repNode.label, repNode);
                    node.label = newLabel;
                }
                //only left child or two children
                else {
                    let repNode = this.inorderPredecessor(node);
                    let newLabel = repNode.label;
                    this.deleteItem(repNode.label, repNode);
                    node.label = newLabel;
                }
                return true;
            }
            //the item greater than node label (might be on the right side).
            else if (this._comparator(item, node.label) > 0) {
                return this.deleteItem(item, node.right);
            }
            else {
                return this.deleteItem(item, node.left);
            }
        }
    }
    remove(node) {
        let curNode = this._root;
        if (curNode == node) {
            this._root = null;
        }
        else {
            while (curNode !== null) {
                if (curNode.left === node) {
                    curNode.left = null;
                }
                else if (curNode.right === node) {
                    curNode.right = null;
                }
                else if (this._comparator(node.label, curNode.label) > 0)
                    curNode = curNode.right;
                else
                    curNode = curNode.left;
            }
        }
    }
    searchItem(item, node) {
        if (node === null)
            return null;
        else {
            if (node.label === item)
                return item;
            //left subtree
            else if (this._comparator(item, node.label) < 0) {
                return this.searchItem(item, node.left);
            }
            //right subtree
            else {
                return this.searchItem(item, node.right);
            }
        }
    }
    inorderSuccessor(node) {
        return this.deepestLeft(node.right);
    }
    inorderPredecessor(node) {
        return this.deepestRight(node.left);
    }
    deepestLeft(node) {
        return node.left ? this.deepestLeft(node.left) : node;
    }
    deepestRight(node) {
        return node.right ? this.deepestRight(node.right) : node;
    }
}
exports.BinarySearchTree = BinarySearchTree;
