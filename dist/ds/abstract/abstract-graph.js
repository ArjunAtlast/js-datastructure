"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graph_1 = require("../../interfaces/graph");
const abstract_set_1 = require("./abstract-set");
const abstract_map_1 = require("./abstract-map");
/**
* Abstract implementation of graph interface
*/
class AbstractGraph {
    constructor() {
        this._vertices = new abstract_set_1.AbstractSet();
        this._edges = new abstract_set_1.AbstractSet();
        this._adjList = new abstract_map_1.AbstractMap();
    }
    /**
    * Add a new vertex with the specified label to this graph.
    * @example
    *   //g:Graph<number>
    *   g.add(25);
    */
    add(label) {
        return this.addVertex(new graph_1.Vertex(label));
    }
    /**
    * Add new vertices with the labels present in the specified array.
    * @example
    *   //g:Graph<number>
    *   g.addAll([25,22,11,43]);
    */
    addAll(labels) {
        return this.addVertices(labels.map(l => new graph_1.Vertex(l)));
    }
    /**
    * Add the specified vertex to the graph.
    * @example
    *   //g:Graph<number>, v:Vertex<number>
    *   g.addVertex(v);
    */
    addVertex(vertex) {
        return this._vertices.add(vertex) && !!this._adjList.putIfAbsent(vertex, new abstract_set_1.AbstractSet());
    }
    /**
    * Add all vertices in the specified array to the graph.
    * @example
    *   //g:Graph<number>, a,b,c,d:Vertex<number>
    *   g.addVertices([a,b,c,d]);
    */
    addVertices(vertices) {
        let flag = false;
        vertices.forEach(v => {
            flag = this.addVertex(v) || flag;
        });
        return flag;
    }
    /**
    * Remove a single vertex with the specified label from the graph.
    * @example
    *   //g:Graph<number>
    *   g.remove(25);
    */
    remove(label) {
        let it = this._vertices.iterator();
        while (it.hasNext()) {
            let v = it.next();
            if (v.label === label) {
                return this.removeVertex(v);
            }
        }
        return false;
    }
    /**
    * Remove the specified vertex from the graph.
    * @example
    *   //g:Graph<number>, v:Vertex<number>
    *   g.removeVertex(v);
    */
    removeVertex(vertex) {
        if (this._vertices.contains(vertex)) {
            this.edgeSet().forEach(edge => {
                (edge.start == vertex || edge.end == vertex) && this.removeEdge(edge);
            });
            return this._vertices.remove(vertex);
        }
        return false;
    }
    /**
    * Create vertices from the given labels and an edge connecting them and add it to the graph.
    * @example
    *   //g:Graph<number>
    *   g.createEdge(25,26);
    */
    createEdge(startLabel, endLabel) {
        let start = new graph_1.Vertex(startLabel);
        let end = new graph_1.Vertex(endLabel);
        return this.addEdge(new graph_1.Edge(start, end));
    }
    /**
    * Add the specified edge to the graph. The start and end vertices are added automatically to the graph if not present.
    * @example
    *   //g:Graph<number>, e:Edge<number>
    *   g.addEdge(e);
    */
    addEdge(edge) {
        this.addVertices([edge.start, edge.end]);
        return this._edges.add(edge) && this._adjList.get(edge.start).add(edge);
    }
    /**
    * Remove the specified edge from the graph.
    * @example
    *   //g:Graph<number>, e:Edge<number>
    *   g.removeEdge(e);
    */
    removeEdge(edge) {
        let adjL = this._adjList.get(edge.start);
        if (adjL === undefined) {
            return false;
        }
        return adjL.remove(edge) && this._edges.remove(edge);
    }
    /**
    * Returns the set of vertices present in the graph.(a copy of the set is returned).
    * @example
    *   //g:Graph<number>
    *   g.vertexSet();
    */
    vertexSet() {
        return new abstract_set_1.AbstractSet(...this._vertices.toArray());
    }
    /**
    * Returns the set of edges present in the graph.
    * @example
    *   //g:Graph<number>
    *   g.edgeSet();
    */
    edgeSet() {
        return new abstract_set_1.AbstractSet(...this._edges.toArray());
    }
    /**
    * Returns the set of edges starting from specified vertex.
    * @example
    *   //g:Graph<number>, v:Vertex<number>
    *   g.adjacentEdges(v);
    */
    adjacentEdges(vertex) {
        if (!this._vertices.contains(vertex))
            return undefined;
        return this._adjList.get(vertex);
    }
    /**
    * Returns the set of vertices adjacent to the specified vertex.
    * @example
    *   //g:Graph<number>, v:Vertex<number>
    *   g.adjacentVertices(v);
    */
    adjacentVertices(vertex) {
        if (!this._vertices.contains(vertex))
            return undefined;
        return new abstract_set_1.AbstractSet(...this._adjList.get(vertex).toArray().map(x => x.end));
    }
}
exports.AbstractGraph = AbstractGraph;
