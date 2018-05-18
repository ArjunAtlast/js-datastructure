import { AbstractBinaryTree, BinaryTreeNode } from "../abstract/abstract-binary-tree";
export declare class BinarySearchTree<E> extends AbstractBinaryTree<E> {
    protected _comparator: (x: E, y: E) => number;
    constructor(compareFn: (x: E, y: E) => number);
    constructor(compareFn: (x: E, y: E) => number, label: E);
    /**
    * Insert a new item to the BST.
    * @example
    *   //bst:BinarySearchTree<number> : inorder -> 1,5,8,9,11
    *   bst.insert(10);  //inorder -> 1,5,8,9,10,11
    */
    insert(item: E): boolean;
    /**
    * Insert multiple items to the BST.
    * @example
    *   //bst:BinarySearchTree<number> : inorder -> 1,5,8,9,11
    *   bst.insertMultiple(10,21,3,15);  //inorder -> 1,3,5,8,9,10,11,15,21
    */
    insertMultiple(...items: E[]): void;
    /**
    * Delete an item from the BST.
    * @example
    *   //bst:BinarySearchTree<number> : inorder -> 1,5,8,9,11
    *   bst.delete(5);  //inorder -> 1,8,9,10,11
    */
    delete(item: E): boolean;
    /**
    * Search an item in the tree. Returns the item if found else returns null.
    * @example
    *   bst.search(25);
    */
    search(item: E): E | null;
    /**
    * Returns the compare function used to order the elements in this BST.
    * @example
    *   bst.comparator(); //returns a function
    */
    comparator(): (x: E, y: E) => number;
    protected insertItem(item: E, node: BinaryTreeNode<E>): boolean;
    protected deleteItem(item: E, node: BinaryTreeNode<E> | null): boolean;
    protected remove(node: BinaryTreeNode<E>): void;
    protected searchItem(item: E, node: BinaryTreeNode<E> | null): E | null;
    protected inorderSuccessor(node: BinaryTreeNode<E>): BinaryTreeNode<E>;
    protected inorderPredecessor(node: BinaryTreeNode<E>): BinaryTreeNode<E>;
    protected deepestLeft(node: BinaryTreeNode<E>): BinaryTreeNode<E>;
    protected deepestRight(node: BinaryTreeNode<E>): BinaryTreeNode<E>;
}
