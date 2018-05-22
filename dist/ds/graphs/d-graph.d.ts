import { AbstractGraph } from "../abstract/abstract-graph";
import { List } from "../../interfaces/list";
import { Vertex } from "../../interfaces/graph";
/**
* A directed graph data structure.
*/
export declare class DGraph<E> extends AbstractGraph<E> {
    constructor();
    /**
    * DFS Traverse the graph starting from the specified vertex and return the list of vertices.
    * @example
    *   //dgraph:DGraph<number>
    *   dgraph.dfs(); // returns a List of numbers.
    */
    dfs(startVertex?: Vertex<E>): List<E>;
    /**
    * BFS Traverse the graph starting from the specified vertex and return the list of vertices.
    * @example
    *   //dgraph:DGraph<number>
    *   dgraph.bfs(); // returns a List of numbers.
    */
    bfs(startVertex?: Vertex<E>): List<E>;
}
