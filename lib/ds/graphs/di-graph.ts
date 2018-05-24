import { AbstractGraph } from "../abstract/abstract-graph";
import { List } from "../../interfaces/list";
import { Vertex } from "../../interfaces/graph";
import { ArrayList } from "../lists/array-list";
import { Stack } from "../stack";
import { AbstractQueue } from "../abstract/abstract-queue";

/**
* A directed graph data structure.
*/
export class DiGraph<E> extends AbstractGraph<E> {

  constructor() {
    super();
  }

  /**
  * DFS Traverse the graph starting from the specified vertex and return the list of vertices.
  * @example
  *   //dgraph:DGraph<number>
  *   dgraph.dfs(); // returns a List of numbers.
  */
  dfs(startVertex:Vertex<E> = this._vertices.toArray()[0]):List<E> {
    let dfsList = new ArrayList<E>(this._vertices.size());
    if(startVertex !== null && startVertex !== undefined) {
      let visited = new ArrayList<Vertex<E>>(this._vertices.size());
      let stack = new Stack<Vertex<E>>(startVertex);
      while(!stack.isEmpty()) {
        let nextV:Vertex<E> = stack.pop()!;
        dfsList.add(nextV.label);
        this.adjacentVertices(nextV)!.forEach((vertex) => {
          if(!visited.contains(vertex) && (stack.search(vertex)==-1)) stack.push(vertex);
        });
        visited.add(nextV);
      }
    }
    return dfsList;
  }

  /**
  * BFS Traverse the graph starting from the specified vertex and return the list of vertices.
  * @example
  *   //dgraph:DGraph<number>
  *   dgraph.bfs(); // returns a List of numbers.
  */
  bfs(startVertex:Vertex<E>= this._vertices.toArray()[0]):List<E> {
    let bfsList = new ArrayList<E>(this._vertices.size());
    if(startVertex !== null && startVertex !== undefined) {
      let visited = new ArrayList<Vertex<E>>(this._vertices.size());
      let queue = new AbstractQueue<Vertex<E>>(startVertex);
      while(!queue.isEmpty()) {
        let nextV:Vertex<E> = queue.poll()!;
        bfsList.add(nextV.label);
        this.adjacentVertices(nextV)!.forEach((vertex) => {
          if(!visited.contains(vertex) && !queue.contains(vertex)) queue.add(vertex);
        });
        visited.add(nextV);
      }
    }
    return bfsList;
  }


}
