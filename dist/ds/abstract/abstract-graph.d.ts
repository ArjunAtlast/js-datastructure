import { Graph, Vertex, Edge } from "../../interfaces/graph";
import { Set } from "../../interfaces/set";
import { Map } from "../../interfaces/map";
/**
* Abstract implementation of graph interface
*/
export declare class AbstractGraph<E> implements Graph<E> {
    protected _vertices: Set<Vertex<E>>;
    protected _edges: Set<Edge<E>>;
    protected _adjList: Map<Vertex<E>, Set<Edge<E>>>;
    constructor();
    /**
    * Add a new vertex with the specified label to this graph.
    * @example
    *   //g:Graph<number>
    *   g.add(25);
    */
    add(label: E): boolean;
    /**
    * Add new vertices with the labels present in the specified array.
    * @example
    *   //g:Graph<number>
    *   g.addAll([25,22,11,43]);
    */
    addAll(labels: E[]): boolean;
    /**
    * Add the specified vertex to the graph.
    * @example
    *   //g:Graph<number>, v:Vertex<number>
    *   g.addVertex(v);
    */
    addVertex(vertex: Vertex<E>): boolean;
    /**
    * Add all vertices in the specified array to the graph.
    * @example
    *   //g:Graph<number>, a,b,c,d:Vertex<number>
    *   g.addVertices([a,b,c,d]);
    */
    addVertices(vertices: Vertex<E>[]): boolean;
    /**
    * Remove a single vertex with the specified label from the graph.
    * @example
    *   //g:Graph<number>
    *   g.remove(25);
    */
    remove(label: E): boolean;
    /**
    * Remove the specified vertex from the graph.
    * @example
    *   //g:Graph<number>, v:Vertex<number>
    *   g.removeVertex(v);
    */
    removeVertex(vertex: Vertex<E>): boolean;
    /**
    * Create vertices from the given labels and an edge connecting them and add it to the graph.
    * @example
    *   //g:Graph<number>
    *   g.createEdge(25,26);
    */
    createEdge(startLabel: E, endLabel: E): boolean;
    /**
    * Add the specified edge to the graph. The start and end vertices are added automatically to the graph if not present.
    * @example
    *   //g:Graph<number>, e:Edge<number>
    *   g.addEdge(e);
    */
    addEdge(edge: Edge<E>): boolean;
    /**
    * Remove the specified edge from the graph.
    * @example
    *   //g:Graph<number>, e:Edge<number>
    *   g.removeEdge(e);
    */
    removeEdge(edge: Edge<E>): boolean;
    /**
    * Returns the set of vertices present in the graph.(a copy of the set is returned).
    * @example
    *   //g:Graph<number>
    *   g.vertexSet();
    */
    vertexSet(): Set<Vertex<E>>;
    /**
    * Returns the set of edges present in the graph.
    * @example
    *   //g:Graph<number>
    *   g.edgeSet();
    */
    edgeSet(): Set<Edge<E>>;
    /**
    * Returns the set of edges starting from specified vertex.
    * @example
    *   //g:Graph<number>, v:Vertex<number>
    *   g.adjacentEdges(v);
    */
    adjacentEdges(vertex: Vertex<E>): Set<Edge<E>> | undefined;
    /**
    * Returns the set of vertices adjacent to the specified vertex.
    * @example
    *   //g:Graph<number>, v:Vertex<number>
    *   g.adjacentVertices(v);
    */
    adjacentVertices(vertex: Vertex<E>): Set<Vertex<E>> | undefined;
}
