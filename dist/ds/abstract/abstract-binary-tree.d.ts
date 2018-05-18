import { BinaryTree } from "../../interfaces/binary-tree";
import { List } from "../../interfaces/list";
/**
* A Node in a Binary Tree dataStructure
*/
export declare class BinaryTreeNode<E> {
    label: E;
    left: BinaryTreeNode<E> | null;
    right: BinaryTreeNode<E> | null;
    constructor(label: E);
    constructor(label: E, left: BinaryTreeNode<E>, right: BinaryTreeNode<E>);
}
/**
* Abstract Implementation of binary tree. (Note: This class cannot be used to initialize objects.)
*/
export declare abstract class AbstractBinaryTree<E> implements BinaryTree<E> {
    protected _root: BinaryTreeNode<E> | null;
    constructor(label?: E);
    /**
    * Insert a new item to the binary tree.
    */
    abstract insert(item: E): boolean;
    /**
    * Delete an item from the binary tree.
    */
    abstract delete(item: E): boolean;
    /**
    * Returns the list of items obtained after inorder traversal of the tree starting from the specified node (default root).
    * @example
    *   //bt:BinaryTree<number>
    *   bt.inorder();
    */
    inorder(node?: BinaryTreeNode<E>): List<E>;
    /**
    * Returns the list of items obtained after preorder traversal of the tree starting from the specified node (default root).
    * @example
    *   //bt:BinaryTree<number>
    *   bt.preorder();
    */
    preorder(node?: BinaryTreeNode<E>): List<E>;
    /**
    * Returns the list of items obtained after postorder traversal of the tree starting from the specified node (default root).
    * @example
    *   //bt:BinaryTree<number>
    *   bt.postorder();
    */
    postorder(node?: BinaryTreeNode<E>): List<E>;
}
