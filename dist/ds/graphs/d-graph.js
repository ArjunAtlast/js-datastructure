"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const abstract_graph_1 = require("../abstract/abstract-graph");
const array_list_1 = require("../lists/array-list");
const stack_1 = require("../stack");
const abstract_queue_1 = require("../abstract/abstract-queue");
/**
* A directed graph data structure.
*/
class DGraph extends abstract_graph_1.AbstractGraph {
    constructor() {
        super();
    }
    /**
    * DFS Traverse the graph starting from the specified vertex and return the list of vertices.
    * @example
    *   //dgraph:DGraph<number>
    *   dgraph.dfs(); // returns a List of numbers.
    */
    dfs(startVertex = this._vertices.toArray()[0]) {
        let dfsList = new array_list_1.ArrayList(this._vertices.size());
        if (startVertex !== null && startVertex !== undefined) {
            let visited = new array_list_1.ArrayList(this._vertices.size());
            let stack = new stack_1.Stack(startVertex);
            while (!stack.isEmpty()) {
                let nextV = stack.pop();
                dfsList.add(nextV.label);
                this.adjacentVertices(nextV).forEach((vertex) => {
                    if (!visited.contains(vertex) && (stack.search(vertex) == -1))
                        stack.push(vertex);
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
    bfs(startVertex = this._vertices.toArray()[0]) {
        let bfsList = new array_list_1.ArrayList(this._vertices.size());
        if (startVertex !== null && startVertex !== undefined) {
            let visited = new array_list_1.ArrayList(this._vertices.size());
            let queue = new abstract_queue_1.AbstractQueue(startVertex);
            while (!queue.isEmpty()) {
                let nextV = queue.poll();
                bfsList.add(nextV.label);
                this.adjacentVertices(nextV).forEach((vertex) => {
                    if (!visited.contains(vertex) && !queue.contains(vertex))
                        queue.add(vertex);
                });
                visited.add(nextV);
            }
        }
        return bfsList;
    }
}
exports.DGraph = DGraph;
