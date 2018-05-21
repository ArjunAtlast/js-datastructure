import { Set } from "./set";
/**
* A Vertex in graph datastructure.
*/
export declare class Vertex<E> {
    label: E;
    constructor(label: E);
}
/**
*  An Edge in graph datastructure.
*/
export declare class Edge<E> {
    start: Vertex<E>;
    end: Vertex<E>;
    constructor(start: Vertex<E>, end: Vertex<E>);
}
/**
* A graph is a pictorial representation of a set of objects where some pairs of objects are connected by links.
* The interconnected objects are represented by points termed as vertices, and the links that connect the vertices are called edges.
*/
export interface Graph<E> {
    /**
    * Add a new vertex with the specified label to this graph.
    */
    add(label: E): boolean;
    /**
    * Add new vertices with the labels present in the specified array.
    */
    addAll(labels: E[]): boolean;
    /**
    * Add the specified vertex to the graph.
    */
    addVertex(vertex: Vertex<E>): boolean;
    /**
    * Add all vertices in the specified array to the graph.
    */
    addVertices(vertices: Vertex<E>[]): boolean;
    /**
    * Remove a single vertex with the specified label from the graph.
    */
    remove(label: E): boolean;
    /**
    * Remove the specified vertex from the graph.
    */
    removeVertex(vertex: Vertex<E>): boolean;
    /**
    * Create vertices from the given labels and an edge connecting them and add it to the graph.
    */
    createEdge(startLabel: E, endLabel: E): boolean;
    /**
    * Add the specified edge to the graph. The start and end vertices are added automatically to the graph if not present.
    */
    addEdge(edge: Edge<E>): boolean;
    /**
    * Remove the specified edge from the graph.
    */
    removeEdge(edge: Edge<E>): boolean;
    /**
    * Returns the set of vertices present in the graph.
    */
    vertexSet(): Set<Vertex<E>>;
    /**
    * Returns the set of edges present in the graph.
    */
    edgeSet(): Set<Edge<E>>;
    /**
    * Returns the set of edges starting from specified vertex.
    */
    adjacentEdges(vertex: Vertex<E>): Set<Edge<E>> | undefined;
    /**
    * Returns the set of vertices adjacent to the specified vertex.
    */
    adjacentVertices(vertex: Vertex<E>): Set<Vertex<E>> | undefined;
}
