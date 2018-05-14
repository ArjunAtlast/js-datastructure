import { Graph, Vertex, Edge } from "../../interfaces/graph";
import { Set } from "../../interfaces/set";
import { Map } from "../../interfaces/map";
import { Iterator } from "../../classes/iterator";
import { AbstractSet } from "./abstract-set";
import { AbstractMap } from "./abstract-map";

/**
* Abstract implementation of graph interface
*/
export class AbstractGraph<E> implements Graph<E> {
  protected _vertices: Set<Vertex<E>>;
  protected _edges: Set<Edge<E>>;
  protected _adjList: Map<Vertex<E>,Set<Edge<E>>>;

  constructor(){
    this._vertices = new AbstractSet<Vertex<E>>();
    this._edges = new AbstractSet<Edge<E>>();
    this._adjList = new AbstractMap<Vertex<E>,Set<Edge<E>>>();
  }

  /**
  * Add a new vertex with the specified label to this graph.
  * @example
  *   //g:Graph<number>
  *   g.add(25);
  */
  add(label: E): boolean {
    return this.addVertex(new Vertex(label));
  }

  /**
  * Add new vertices with the labels present in the specified array.
  * @example
  *   //g:Graph<number>
  *   g.addAll([25,22,11,43]);
  */
  addAll(labels: E[]): boolean {
    return this.addVertices(labels.map(l=>new Vertex(l)));
  }

  /**
  * Add the specified vertex to the graph.
  * @example
  *   //g:Graph<number>, v:Vertex<number>
  *   g.addVertex(v);
  */
  addVertex(vertex: Vertex<E>): boolean {
    return this._vertices.add(vertex) && !!this._adjList.putIfAbsent(vertex, new AbstractSet<Edge<E>>());
  }

  /**
  * Add all vertices in the specified array to the graph.
  * @example
  *   //g:Graph<number>, a,b,c,d:Vertex<number>
  *   g.addVertices([a,b,c,d]);
  */
  addVertices(vertices: Vertex<E>[]): boolean {
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
  remove(label: E): boolean {
    let it:Iterator<Vertex<E>> = this._vertices.iterator();
    while(it.hasNext()){
      let v = it.next();
      if(v!.label === label) {
        return this.removeVertex(v!);
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
  removeVertex(vertex: Vertex<E>): boolean {
    if(this._vertices.contains(vertex)){
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
  createEdge(startLabel: E, endLabel: E): boolean {
    let start = new Vertex<E>(startLabel);
    let end = new Vertex<E>(endLabel);
    return this.addEdge(new Edge<E>(start,end));
  }

  /**
  * Add the specified edge to the graph. The start and end vertices are added automatically to the graph if not present.
  * @example
  *   //g:Graph<number>, e:Edge<number>
  *   g.addEdge(e);
  */
  addEdge(edge: Edge<E>): boolean {
    this.addVertices([edge.start,edge.end]);
    return this._edges.add(edge) && this._adjList.get(edge.start)!.add(edge);
  }

  /**
  * Remove the specified edge from the graph.
  * @example
  *   //g:Graph<number>, e:Edge<number>
  *   g.removeEdge(e);
  */
  removeEdge(edge: Edge<E>): boolean {
    let adjL = this._adjList.get(edge.start);
    if(adjL === undefined) {
      return false;
    }
    return adjL!.remove(edge) && this._edges.remove(edge);
  }

  /**
  * Returns the set of vertices present in the graph.(a copy of the set is returned).
  * @example
  *   //g:Graph<number>
  *   g.vertexSet();
  */
  vertexSet(): Set<Vertex<E>> {
  	return new AbstractSet<Vertex<E>>(...this._vertices.toArray());
  }
  /**
  * Returns the set of edges present in the graph.
  * @example
  *   //g:Graph<number>
  *   g.edgeSet();
  */
  edgeSet(): Set<Edge<E>> {
  	return new AbstractSet<Edge<E>>(...this._edges.toArray());
  }
  /**
  * Returns the set of edges starting from specified vertex.
  * @example
  *   //g:Graph<number>, v:Vertex<number>
  *   g.ajacentEdges(v);
  */
  adjacentEdges(vertex:Vertex<E>): Set<Edge<E>>|undefined {
    if(!this._vertices.contains(vertex)) return undefined;
    return this._adjList.get(vertex)!;
  }
}
