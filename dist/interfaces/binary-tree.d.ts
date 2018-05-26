import { Tree } from "./tree";
import { List } from "./list";
/**
* A data structure in which a record is linked to two successor records, usually referred to as the left branch when greater and the right when less than the previous record.
*/
export interface BinaryTree<E> extends Tree<E> {
    /**
    * Insert a new item to the tree.
    */
    insert(item: E): boolean;
    /**
    * Delete an item from the tree.
    */
    delete(item: E): boolean;
    /**
    * Returns the height of this binary tree.
    */
    height(): number;
    /**
    * Returns the list of items obtained after inorder traversal of the tree.
    */
    inorder(): List<E>;
    /**
    * Returns the list of items obtained after preorder traversal of the tree.
    */
    preorder(): List<E>;
    /**
    * Returns the list of items obtained after postorder traversal of the tree.
    */
    postorder(): List<E>;
}
