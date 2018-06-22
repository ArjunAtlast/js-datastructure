import { AbstractBinaryTree, BinaryTreeNode } from "../abstract/abstract-binary-tree";

export class BinarySearchTree<E> extends AbstractBinaryTree<E> {

  protected _comparator:(x:E, y:E) => number;

  constructor(compareFn:(x:E, y:E)=>number)
  constructor(compareFn:(x:E, y:E)=>number, label:E)
  constructor(compareFn:(x:E, y:E)=>number, label?:E) {
    super(label);
    this._comparator = compareFn;
  }

  /**
  * Insert a new item to the BST.
  * @example
  *   //bst:BinarySearchTree<number> : inorder -> 1,5,8,9,11
  *   bst.insert(10);  //inorder -> 1,5,8,9,10,11
  */
  insert(item: E): boolean  {
    if(this._root == null) {
      this._root = new BinaryTreeNode<E>(item);
      return true;
    }
    else return this.insertItem(item, this._root);
  }

  /**
  * Insert multiple items to the BST.
  * @example
  *   //bst:BinarySearchTree<number> : inorder -> 1,5,8,9,11
  *   bst.insertMultiple(10,21,3,15);  //inorder -> 1,3,5,8,9,10,11,15,21
  */
  insertMultiple(...items:E[]):void {
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
  delete(item: E): boolean {
    return this.deleteItem(item, this._root);
  }

  /**
  * Search an item in the tree. Returns the item if found else returns null.
  * @example
  *   bst.search(25);
  */
  search(item: E): E {
    return this.searchItem(item, this._root);
  }

  /**
  * Returns the compare function used to order the elements in this BST.
  * @example
  *   bst.comparator(); //returns a function
  */
  comparator():(x:E,y:E)=>number {
    return this._comparator;
  }

  /*
  * Private Methods
  */
  protected insertItem(item:E, node:BinaryTreeNode<E>):boolean {
    if(this._comparator(item,node.label) > 0) {
      if(node.right) return this.insertItem(item, node.right);
      else node.right = new BinaryTreeNode<E>(item);
    }
    else {
      if(node.left) return this.insertItem(item, node.left);
      else node.left = new BinaryTreeNode<E>(item);
    }
    return true;
  }

  protected deleteItem(item:E, node:BinaryTreeNode<E>):boolean {
    if(node === null) return false;
    else {
      if(node.label === item) {
        //If node is leaf
        if(node.left === null && node.right === null) this.remove(node);
        //only right child
        else if(node.left === null) {
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
      else if(this._comparator(item, node.label) > 0) {
        return this.deleteItem(item, node.right);
      }
      else {
        return this.deleteItem(item, node.left);
      }
    }
  }

  protected remove(node:BinaryTreeNode<E>):void {
    let curNode = this._root;
    if(curNode == node) {
      this._root = null;
    }
    else {
      while(curNode !== null) {
        if(curNode.left === node) {
          curNode.left = null;
        }
        else if(curNode.right === node) {
          curNode.right = null;
        }
        else if(this._comparator(node.label, curNode.label) > 0) curNode = curNode.right;
        else curNode = curNode.left;
      }
    }
  }

  protected searchItem(item:E, node:BinaryTreeNode<E>):E {
    if(node === null) return null;
    else {
      if(node.label === item) return item;
      //left subtree
      else if(this._comparator(item, node.label) < 0) {
        return this.searchItem(item, node.left);
      }
      //right subtree
      else {
        return this.searchItem(item, node.right);
      }
    }
  }

  protected inorderSuccessor(node:BinaryTreeNode<E>):BinaryTreeNode<E> {
    return this.deepestLeft(node.right!);
  }

  protected inorderPredecessor(node:BinaryTreeNode<E>):BinaryTreeNode<E> {
    return this.deepestRight(node.left!);
  }

  protected deepestLeft(node:BinaryTreeNode<E>):BinaryTreeNode<E> {
    return node.left? this.deepestLeft(node.left):node;
  }

  protected deepestRight(node:BinaryTreeNode<E>):BinaryTreeNode<E> {
    return node.right? this.deepestRight(node.right):node;
  }
}
