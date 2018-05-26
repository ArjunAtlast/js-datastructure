/**
* A tree is a data structure made up of nodes or vertices and edges without having any cycle.
*/
export interface Tree<E> {
    /**
    * Insert a new item to the tree.
    */
    insert(item: E): boolean;
    /**
    * Delete an item from the tree.
    */
    delete(item: E): boolean;
    /**
    * Returns the height of the tree.
    */
    height(): number;
}
