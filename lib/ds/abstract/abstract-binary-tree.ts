import { BinaryTree } from "../../interfaces/binary-tree";
import { List } from "../../interfaces/list";
import { AbstractList } from "./abstract-list";

/**
* A Node in a Binary Tree dataStructure
*/
export class BinaryTreeNode<E> {
  label: E;
  left: BinaryTreeNode<E>|null;
  right: BinaryTreeNode<E>|null;

  constructor(label:E)
  constructor(label:E, left:BinaryTreeNode<E>, right:BinaryTreeNode<E>)
  constructor(label:E, left:BinaryTreeNode<E>|null=null, right:BinaryTreeNode<E>|null=null) {
    this.label = label;
    this.left = left;
    this.right = right;
  }
}

/**
* Abstract Implementation of binary tree. (Note: This class cannot be used to initialize objects.)
*/
export abstract class AbstractBinaryTree<E> implements BinaryTree<E> {
  protected _root:BinaryTreeNode<E>|null;

  constructor(label?:E) {
    this._root = label?new BinaryTreeNode<E>(label):null;
  }

  /**
  * Insert a new item to the binary tree.
  */
  abstract insert(item: E): boolean;

  /**
  * Delete an item from the binary tree.
  */
  abstract delete(item: E): boolean;

  /**
  * Returns the height of this binary tree.
  * @example
  *   bt.height();// returns a number.
  */
  height(node:BinaryTreeNode<E> = this._root!):number {
    if(node === null) return -1;
    else return Math.max(this.height(node.left!), this.height(node.right!))+1;
  }

  /**
  * Returns the list of items obtained after inorder traversal of the tree starting from the specified node (default root).
  * @example
  *   //bt:BinaryTree<number>
  *   bt.inorder();
  */
  inorder(node:BinaryTreeNode<E> = this._root!): List<E> {
    let curList = new AbstractList<E>();
    if(node === null) return curList;
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
  preorder(node:BinaryTreeNode<E> = this._root!): List<E> {
    let curList = new AbstractList<E>();
    if(node == null) return curList;
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
  postorder(node:BinaryTreeNode<E> = this._root!): List<E> {
    let curList = new AbstractList<E>();
    if(node == null) return curList;
    node.left && curList.addAll(this.postorder(node.left).toArray());
    node.right && curList.addAll(this.postorder(node.right).toArray());
    curList.add(node.label);
    return curList;
  }


}
