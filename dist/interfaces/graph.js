"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
* A Vertex in graph datastructure.
*/
class Vertex {
    constructor(label) { this.label = label; }
}
exports.Vertex = Vertex;
/**
*  An Edge in graph datastructure.
*/
class Edge {
    constructor(start, end) {
        this.start = start;
        this.end = end;
    }
}
exports.Edge = Edge;
