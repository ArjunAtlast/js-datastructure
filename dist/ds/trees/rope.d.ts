import { AbstractBinaryTree, BinaryTreeNode } from "../abstract/abstract-binary-tree";
/**
* A rope is a binary tree where each leaf node contains a short string.
* Used to efficiently store and manipulate a very long string
*/
export declare class Rope extends AbstractBinaryTree<string> {
    protected _root: RopeNode;
    constructor();
    constructor(str: string);
    constructor(str: string, spacing: number);
    /**
    * Create a new Rope from the RopeNode.
    */
    static fromNode(node: RopeNode): Rope;
    /**
    * Returns the total length of the string stored in this rope.
    */
    readonly length: number;
    /**
    * Insert string at the end of this rope.
    */
    insert(str: string): boolean;
    /**
    * Insert string at the specified position of this rope.
    */
    insert(str: string, index: number): boolean;
    /**
    * Insert a rope at the specified position of this rope.
    */
    insert(rope: Rope, index: number): boolean;
    /**
    * @deprecated This method call does not work on Rope.
    */
    delete(str: string): boolean;
    /**
    * Delete the substring starting at index i with a length j. Returns the deleted part as Rope.
    */
    delete(i: number, j: number): Rope;
    /**
    * Insert the specified node at the end of this rope.
    */
    insertNode(node: RopeNode): void;
    /**
    * Concatenate the specified rope with this rope.
    */
    concat(rope: Rope): this;
    /**
    * Return the character at position specified by index.
    */
    get(index: number): string;
    /**
    * Return the character at position specified by index, beginning from the specified node.
    */
    get(index: number, node: RopeNode): string;
    /**
    * Split this rope at the given position. Returns the right child after splitting.
    */
    split(index: number): Rope;
    split(index: number, node: RopeNode): Rope;
    /**
    * Return the root node of this rope.
    */
    getRoot(): RopeNode;
    /**
    * Returns the substring starting at index i with a length j.
    */
    report(i: number, j: number): string;
    /**
    * Returns the substring starting at index i with a length j. Beginning at the specified node.
    */
    report(i: number, j: number, node: RopeNode): string;
    /**
    * Convert the rope into a string.
    */
    toString(): string;
    /**
    * Balance the rope.
    */
    balance(): void;
    protected balanceNode(node: RopeNode): RopeNode;
    protected rotateRight(node: RopeNode): RopeNode;
    protected rotateLeft(node: RopeNode): RopeNode;
}
/**
* Represents a node of Rope data structure.
*/
export declare class RopeNode extends BinaryTreeNode<string> {
    label: string;
    left: RopeNode | null;
    right: RopeNode | null;
    constructor();
    constructor(label: string);
    constructor(left: RopeNode);
    constructor(left: RopeNode, right: RopeNode);
    /**
    * Returns the weight associated with this node.
    */
    readonly weight: number;
    /**
    * Returns the length of the string in this node.
    */
    readonly length: number;
}
