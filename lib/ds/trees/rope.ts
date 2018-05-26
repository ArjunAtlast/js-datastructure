import { AbstractBinaryTree, BinaryTreeNode } from "../abstract/abstract-binary-tree";

/**
* A rope is a binary tree where each leaf node contains a short string.
* Used to efficiently store and manipulate a very long string
*/
export class Rope extends AbstractBinaryTree<string> {
  protected _root:RopeNode;

  constructor()
  constructor(str:string)
  constructor(str:string, spacing:number)
  constructor(str?:string, spacing?:number) {
    super();
    if(!str) this._root = new RopeNode();
    else if(!spacing) this._root = new RopeNode(str);
    else {
      this._root = new RopeNode();
      let labels = str.match(new RegExp(`(.|[\r\n]){1,${spacing}}`,'g'))!;
      for(let i=0,j=labels.length; i < j; i++) {
        this.insert(labels[i]);
      }
      this.balance();
    }
  }

  /**
  * Create a new Rope from the RopeNode.
  */
  static fromNode(node:RopeNode):Rope {
    let rope = new Rope();
    rope.insertNode(node);
    return rope;
  }

  /**
  * Returns the total length of the string stored in this rope.
  */
  get length():number {
    if(this._root.left) {
      return this._root.weight + (this._root.right?this._root.right.length:0);
    }
    else return this._root.label.length;
  }

  /**
  * Insert string at the end of this rope.
  */
  insert(str:string):boolean
  /**
  * Insert string at the specified position of this rope.
  */
  insert(str:string, index:number):boolean
  /**
  * Insert a rope at the specified position of this rope.
  */
  insert(rope:Rope, index:number):boolean
  insert(strOrRope:string|Rope, index?:number):boolean {
    if(index === undefined) {
      let rope:Rope = new Rope(<string>strOrRope);
      this.concat(rope);
    }
    else {
      if(index >= this.length) return false;
      else {
        let right = this.split(index);
        if(typeof strOrRope === "string") this.insert(strOrRope);
        else this.concat(strOrRope);
        this.concat(right);
      }
    }
    return true;
  }

  /**
  * @deprecated This method call does not work on Rope.
  */
  delete(str:string):boolean
  /**
  * Delete the substring starting at index i with a length j. Returns the deleted part as Rope.
  */
  delete(i:number, j:number):Rope
  delete(i:number|string, j:number=0):boolean|Rope {
    if(typeof i === "string") return false;
    else {
      let right = this.split(i);
      this.concat(right.split(j));
      return right;
    }
  }
  /**
  * Insert the specified node at the end of this rope.
  */
  insertNode(node:RopeNode):void {
    if(this._root.weight === 0) {
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
  concat(rope:Rope):this
  {
    if(this._root.weight === 0) {
      this._root = rope.getRoot();
    }
    else {
      let parent = new RopeNode(this._root, rope.getRoot());
      this._root = parent;
    }
    return this;
  }

  /**
  * Return the character at position specified by index.
  */
  get(index:number):string|undefined
  /**
  * Return the character at position specified by index, beginning from the specified node.
  */
  get(index:number, node:RopeNode):string|undefined
  get(index:number, node:RopeNode = this._root):string|undefined {
    if(node.weight <= index) {
      if(node.right == null) return undefined;
      else return this.get(index - node.weight, node.right);
    }
    else if(node.left !== null) {
      return this.get(index, node.left);
    }
    else {
      return node.label[index];
    }
  }

  /**
  * Split this rope at the given position. Returns the right child after splitting.
  */
  split(index:number):Rope
  split(index:number, node:RopeNode):Rope
  split(index:number, node:RopeNode = this._root):Rope {
    if(node.weight <= index) {
      if(node.right == null) return new Rope();
      else return this.split(index - node.weight, node.right);
    }
    else if(node.left !== null) {
      let rightRope = node.right? Rope.fromNode(node.right):new Rope();
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
  getRoot():RopeNode {
    return this._root;
  }

  /**
  * Returns the substring starting at index i with a length j.
  */
  report(i:number, j:number):string
  /**
  * Returns the substring starting at index i with a length j. Beginning at the specified node.
  */
  report(i:number, j:number, node:RopeNode):string
  report(i:number, j:number, node:RopeNode = this._root):string {
    if(node.weight <= i) {
      if(!node.right) return "";
      else return this.report(i - node.weight, j, node.right);
    }
    else if(node.left) {
      if(node.weight > i+j) return this.report(i,j,node.left);
      else {
        return this.inorder(node).toArray().join("").substring(i,i+j);
      }
    }
    else {
      return node.label.substring(i,i+j);
    }
  }

  /**
  * Convert the rope into a string.
  */
  toString():string {
    return this.inorder().toArray().join("");
  }

  /**
  * Balance the rope.
  */
  balance():void {
    this._root = this.balanceNode(this._root);
  }

  protected balanceNode(node:RopeNode):RopeNode {
    if(node == null) return node;
    let balance_factor = this.height(node.left!) - this.height(node.right!);
    while(balance_factor > 1){
      node = this.rotateRight(node);
      balance_factor = this.height(node.left!) - this.height(node.right!);
    }
    while(balance_factor < -1) {
      node = this.rotateLeft(node);
      balance_factor = this.height(node.left!) - this.height(node.right!);
    }
    node.left = this.balanceNode(node.left!);
    node.right = this.balanceNode(node.right!);
    return node;
  }

  protected rotateRight(node:RopeNode):RopeNode {
    let left = node.left!;
    node.left = left.right;
    left.right = node;
    return left;
  }

  protected rotateLeft(node:RopeNode):RopeNode {
    let right = node.right!;
    node.right = right.left;
    right.left = node;
    return right;
  }
}

/**
* Represents a node of Rope data structure.
*/
export class RopeNode extends BinaryTreeNode<string> {
  label: string;
  left: RopeNode|null;
  right: RopeNode|null;

  constructor()
  constructor(label:string)
  constructor(left:RopeNode)
  constructor(left:RopeNode, right:RopeNode)
  constructor(labelOrLeft:string|RopeNode="", right:RopeNode|null=null) {
    super("");
    if(typeof labelOrLeft === "string"){
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
  get weight():number {
    if(this.left) {
      return this.left.length;
    }
    else return this.label.length;
  }

  /**
  * Returns the length of the string in this node.
  */
  get length():number {
    return this.weight + (this.right?this.right.length:0);
  }

}
