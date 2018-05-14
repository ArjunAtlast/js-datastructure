'use strict';
var expect = require('chai').expect;
var index = require('../dist/index.js');

describe("Checking Components..", () => {

  //Stack
  describe("Stack", () => {
    var s = new index.Stack(1,2,3);
    it("constructor", () => {
      expect(index.Stack).to.not.equal(undefined);
      expect(s).to.be.an.instanceOf(index.Stack);
      expect(s.height).to.equal(3);
    });
    it("pop", () => {
      expect(s.pop()).to.equal(3);
    });
    it("push", () => {
      s.push(5);
      expect(s.pop()).to.equal(5);
    });
    it("peek", () => {
      expect(s.peek()).to.equal(2);
    });
    it("search", () => {
      expect(s.search(2)).to.equal(1);
    })
  });

  //Iterator
  describe("Iterator", () => {
    var q = new index.AbstractQueue(1,2,3);
    var itr = q.iterator();
    it("constructor", () => {
      expect(index.Iterator).to.not.equal(undefined);
      expect(itr).to.be.an.instanceOf(index.Iterator);
    });
    it("next", () => {
      expect(itr.next()).to.equal(1);
    });
    it("remove", () => {
      itr.remove();
      expect(q.element()).to.equal(2);
    });
    it("forEachRemaining", () => {
      let a = [2,3];
      itr.forEachRemaining((item,index) => {
        expect(item).to.equal(a[index]);
      });
    });
    it("hasNext", () => {
      expect(itr.hasNext()).to.equal(true);
      expect(itr.next()).to.equal(2);
      expect(itr.hasNext()).to.equal(true);
      expect(itr.next()).to.equal(3);
      expect(itr.hasNext()).to.equal(false);
      expect(itr.next()).to.equal(undefined);
    });
  });
  //AbstractCollection
  describe("AbstractCollection", () => {
    var ac = new index.AbstractCollection(1,2,3);
    it("constructor", () => {
      expect(index.AbstractCollection).to.not.equal(undefined);
      expect(ac).to.be.an.instanceOf(index.AbstractCollection);
    });
    it("add", () => {
      ac.add(4);
      expect(ac.toArray()[3]).to.equal(4);
    });
    it("addAll", () => {
      ac.addAll([5,6]);
      expect(ac.toArray()[5]).to.equal(6);
    });
    it("contains", () => {
      expect(ac.contains(2)).to.equal(true);
      expect(ac.contains(12)).to.equal(false);
    });
    it("containsAll", () => {
      expect(ac.containsAll([1,2,3,4,5,6])).to.equal(true);
      expect(ac.containsAll([5,6,7])).to.equal(false);
      expect(ac.containsAll([])).to.equal(false);
    });
    it("equals", () => {
      let ac2 = new index.AbstractCollection(1,2,3,4,5,6);
      expect(ac.equals(ac2)).to.equal(true);
      ac2.remove(6);
      expect(ac.equals(ac2)).to.equal(false);
      ac2.add(7);
      expect(ac.equals(ac2)).to.equal(false);
      expect(ac.equals(new Object())).to.equals(false);
    });
    it("remove", () => {
      expect(ac.remove(3)).to.equal(true);
      expect(ac.toArray()[2]).to.equal(4);
      expect(ac.remove(3)).to.equal(false);
    });
    it("removeAll", () => {
      expect(ac.removeAll([1,2,3])).to.equal(true);
      expect(ac.toArray()[0]).to.equal(4);
    });
    it("removeIf", () => {
      expect(ac.removeIf((item)=> (item%2!=0))).to.equal(true);
      expect(ac.contains(5)).to.equal(false);
    });
    it("retainAll", () => {
      expect(ac.retainAll([4])).to.equal(true);
      expect(ac.retainAll([4])).to.equal(false);
      expect(ac.contains(4)).to.equal(true);
      expect(ac.contains(6)).to.equal(false);
    });
    it("clear & isEmpty", () => {
      expect(ac.isEmpty()).to.equal(false);
      ac.clear();
      expect(ac.isEmpty()).to.equal(true);
    });
    it("size", () => {
      expect(ac.size()).to.equal(0);
    });
    it("toArray", () => {
      expect(ac.toArray()).to.be.an.instanceOf(Array);
    });
    it("forEach", () => {
      ac.forEach((item,index) => {
        expect(item).to.equal(ac.toArray()[index]);
      });
    });
    it("iterator", () => {
      expect(ac.iterator()).to.be.an.instanceOf(index.Iterator);
    });
  });
  //AbstractQueue
  describe("AbstractQueue", () => {
    var q = new index.AbstractQueue(1,2,3);
    it("constructor", () => {
      expect(index.AbstractQueue).to.not.equal(undefined);
      expect(q).to.be.an.instanceOf(index.AbstractQueue);
    });
    it("element", ()=> {
      expect(q.element()).to.equal(1);
    });
    it("poll", () => {
      expect(q.poll()).to.equal(1);
      expect(q.toArray()).to.deep.equal([2,3]);
    });
  });
  //ListIterator
  describe("ListIterator", () => {
    var l = new index.AbstractList(1,2,3);
    var itr = l.listIterator();
    it("constructor", () => {
      expect(index.ListIterator).to.not.equal(undefined);
      expect(itr).to.be.an.instanceOf(index.ListIterator);
    });
    it("next", () => {
      expect(itr.next()).to.equal(1);
    });
    it("add", () => {
      itr.add(1.5);
      expect(itr.next()).to.equal(1.5);
    });
    it("remove", () => {
      itr.remove();
      expect(l.get(1)).to.equal(2);
    });
    it("previous, hasPrevious", () => {
      expect(itr.hasPrevious()).to.equal(true);
      expect(itr.previous()).to.equal(1);
      expect(itr.hasPrevious()).to.equal(false);
      expect(itr.previous()).to.equal(undefined);
    });
    it("nextIndex, previousIndex", () => {
      expect(itr.previousIndex()).to.equal(-1);
      itr.next()
      expect(itr.previousIndex()).to.equal(0);
      expect(itr.nextIndex()).to.equal(1);
      itr.next();
      expect(itr.nextIndex()).to.equal(2);
      itr.next();
      expect(itr.nextIndex()).to.equal(-1);
      expect(itr.next()).to.equal(undefined);
    });
    it("set", () => {
      itr.set(2.5);
      expect(itr.previous()).to.equal(2.5);
      itr.set(2.3);
      expect(itr.next()).to.equal(2.3);
      itr.add(2.6);
      expect(itr.next()).to.equal(2.6);
      itr.remove();
      itr.set(2.9);
      expect(itr.previous()).to.equal(2.3);
    });
  });
  //AbstractList
  describe("AbstractList", () => {
    let l = new index.AbstractList(1,2,3);
    it("constructor", () => {
      expect(index.AbstractList).to.not.equal(undefined);
      expect(l).to.be.an.instanceOf(index.AbstractList);
    });
    it("get", () => {
      expect(l.get(2)).to.equal(3);
      expect(l.get(5)).to.equal(undefined);
    });
    it("add", () => {
      expect(l.add(4)).to.equal(true);
      expect(l.get(3)).to.equal(4);
      expect(l.add(2.5,2)).to.equal(true);
      expect(l.get(2)).to.equal(2.5);
    });
    it("addAll", () => {
      expect(l.addAll([5,6])).to.equal(true);
      expect(l.get(6)).to.equal(6);
      expect(l.addAll([5,2.2,2.3],2)).to.equal(true);
      expect(l.get(3)).to.equal(2.2);
    });
    it("indexOf", () => {
      expect(l.indexOf(2.3)).to.equal(4);
      expect(l.indexOf(5)).to.equal(2);
      expect(l.indexOf(10)).to.equal(-1);
    });
    it("lastIndexOf", () => {
      expect(l.lastIndexOf(5)).to.equal(8);
      expect(l.lastIndexOf(10)).to.equal(-1);
    });
    it("removeAt", () => {
      expect(l.removeAt(4)).to.equal(2.3);
      expect(l.get(4)).to.equal(2.5);
      expect(l.removeAt(15)).to.equal(undefined);
    });
    it("set", () => {
      expect(l.set(7,5.5)).to.equal(5);
      expect(l.get(7)).to.equal(5.5);
      expect(l.set(15,10)).to.equal(undefined);
    });
    it("sort", () => {
      l.clear();
      l.addAll([23,56,41,11,7,8,27,32,16,98]);
      l.sort((x,y)=>(x-y));
      expect(l.toArray()).to.deep.equal([7, 8, 11, 16, 23, 27, 32, 41, 56, 98]);
    });
    it("subList", () => {
      expect(l.subList(15,2)).to.be.an.instanceOf(index.AbstractList);
      expect(l.subList(2,6).toArray()).to.deep.equal([11, 16, 23, 27]);
    });
    it("removeRange", () => {
      expect(l.removeRange(2,6)).to.deep.equal([11,16,23,27]);
      expect(l.toArray()).to.deep.equal([7,8,32,41,56,98]);
    });
    it("listIterator", () => {
      expect(l.listIterator()).to.be.an.instanceOf(index.ListIterator);
    });
    it("reverse", () => {
      l.reverse();
      expect(l.toArray()).to.deep.equal([98, 56, 41, 32, 8, 7]);
    });
  });
  //ArrayList
  describe("ArrayList", ()=> {
    let al = new index.ArrayList(7,1,2,3,4,5);
    it("constructor", () => {
      expect(index.ArrayList).to.not.equal(undefined);
      expect(al).to.be.an.instanceOf(index.ArrayList);
      expect(new index.ArrayList(5)).to.be.an.instanceOf(index.ArrayList);
      expect(new index.ArrayList()).to.be.an.instanceOf(index.ArrayList);
    });
    it("add", ()=> {
      expect(al.add(6)).to.equal(true);
      expect(al.add(2.5,2)).to.equal(true)
      expect(al.toArray()).to.deep.equals([1,2,2.5,3,4,5,6]);
      expect(al.add(7)).to.equal(false);
    });
    it("ensureCapacity, addAll", ()=> {
      expect(al.addAll([7,8])).to.equal(false);
      al.ensureCapacity(11);
      expect(al.addAll([7,8,9,10,11])).to.equal(false);
      expect(al.addAll([7,8,9,10],5)).to.equal(true);
      expect(al.toArray()).to.deep.equals([1,2,2.5,3,4,7,8,9,10,5,6]);
    });
    it("replaceAll", () => {
      al.replaceAll((x)=>(x*2));
      expect(al.toArray()).to.deep.equals([2,4,5,6,8,14,16,18,20,10,12]);
    });
    it("clone", ()=>{
      expect(al.clone()).to.deep.equal(al);
      expect(al.clone()).to.not.equal(al);
    });
    it("trimToSize", ()=>{
      al.ensureCapacity(25);
      al.trimToSize();
      expect(al.add(5)).to.equal(false);
    });
    it("toString", ()=> {
      expect(al.toString((x)=>(x.toString()))).to.equal("[2,4,5,6,8,14,16,18,20,10,12]");
    });
    it("fromString", ()=> {
      let arl = new index.ArrayList().fromString("[1,2,3,4,5]", (x)=>(parseFloat(x)));
      expect(arl.toArray()).to.deep.equal([1,2,3,4,5]);
    });
  });
  //PriorityQueue
  describe("PriorityQueue", ()=> {
    let pq;
    it("constructor", ()=> {
      expect(index.PriorityQueue).to.not.equal(undefined);
      pq = new index.PriorityQueue((x,y)=>(x-y),8,5,7,3);
      expect(pq).to.be.an.instanceOf(index.PriorityQueue);
      expect(pq.toArray()).to.deep.equal([3,5,7,8]);
    });
    it("add", ()=> {
      expect(pq.add(6)).to.equal(true);
      expect(pq.toArray()).to.deep.equal([3,5,6,7,8]);
    });
    it("addAll", ()=> {
      expect(pq.addAll([9,4,6.5,2])).to.equal(true);
      expect(pq.toArray()).to.deep.equal([2,3,4,5,6,6.5,7,8,9]);
    });
    it("toString", ()=> {
      expect(pq.toString((x)=>(x.toString()))).to.equal("[2,3,4,5,6,6.5,7,8,9]");
    });
    it("fromString", ()=> {
      let prq = new index.PriorityQueue().fromString("[1,2,3,4,5]", (x)=>(parseFloat(x)));
      expect(prq.toArray()).to.deep.equal([1,2,3,4,5]);
    });
  });
  //AbstractSet
  describe("AbstractSet", ()=> {
    let s;
    it("constructor", ()=> {
      expect(index.AbstractSet).to.not.equal(undefined);
      s = new index.AbstractSet(1,2,3,3,2,4,1);
      expect(s).to.be.an.instanceOf(index.AbstractSet);
      expect(s.toArray()).to.deep.equal([1,2,3,4]);
    });
    it("add", ()=>{
      expect(s.add(4)).to.equal(false);
      expect(s.add(5)).to.equal(true);
      expect(s.toArray()).to.deep.equal([1,2,3,4,5]);
    });
    it("addAll", ()=>{
      expect(s.addAll([3,4,5,6])).to.equal(true);
      expect(s.toArray()).to.deep.equal([1,2,3,4,5,6])
      expect(s.addAll([3,4])).to.equal(false);
    });
    let s2 = new index.AbstractSet(1,3,5,7,9);
    it("union", ()=>{
      expect(s.union(s2).toArray()).to.deep.equal([1,2,3,4,5,6,7,9]);
      expect(s.union(new index.AbstractSet()).toArray()).to.deep.equal([1,2,3,4,5,6]);
      expect(s.union(new index.AbstractSet(1,2,3,4,5,6,7,8,9,10)).toArray()).to.deep.equal([1,2,3,4,5,6,7,8,9,10]);
    });
    it("intersection", ()=>{
      expect(s.intersection(s2).toArray()).to.deep.equal([1,3,5]);
      expect(s.intersection(new index.AbstractSet()).toArray()).to.deep.equal([]);
      expect(s.intersection(new index.AbstractSet(1,2,3,4,5,6,7,8,9,10)).toArray()).to.deep.equal([1,2,3,4,5,6]);
    });
    it("difference", ()=>{
      expect(s.difference(s2).toArray()).to.deep.equal([2,4,6]);
      expect(s.difference(new index.AbstractSet()).toArray()).to.deep.equal([1,2,3,4,5,6]);
      expect(s.difference(new index.AbstractSet(1,2,3,4,5,6,7,8,9,10)).toArray()).to.deep.equal([]);
    });
    it("exclusion", ()=>{
      expect(s.exclusion(s2).toArray()).to.deep.equal([2,4,6,7,9]);
      expect(s.exclusion(new index.AbstractSet()).toArray()).to.deep.equal([1,2,3,4,5,6]);
      expect(s.exclusion(new index.AbstractSet(1,2,3,4,5,6,7,8,9,10)).toArray()).to.deep.equal([7,8,9,10]);
    });
  });
  //AbstractSortedSet
  describe("AbstractSortedSet", ()=> {
    let ss;
    it("constructor", ()=> {
      expect(index.AbstractSortedSet).to.not.equal(undefined);
      ss = new index.AbstractSortedSet((x,y)=>(x-y),23,5,18,45,98,11);
      expect(ss).to.be.an.instanceOf(index.AbstractSortedSet);
      expect(ss.toArray()).to.deep.equal([5,11,18,23,45,98]);
    });
    it("add", ()=>{
      expect(ss.add(15)).to.equal(true);
      expect(ss.toArray()).to.deep.equal([5,11,15,18,23,45,98]);
    });
    it("addAll", ()=>{
      expect(ss.addAll([15,12,19,22])).to.equal(true);
      expect(ss.toArray()).to.deep.equal([5,11,12,15,18,19,22,23,45,98]);
    });
    it("first,last", ()=>{
      expect(ss.first()).to.equal(5);
      expect(ss.last()).to.equal(98);
    });
    it("headSet", ()=>{
      expect(ss.headSet(15).toArray()).to.deep.equal([5,11,12]);
      expect(ss.headSet(22.5).toArray()).to.deep.equal([5,11,12,15,18,19,22]);
      expect(ss.headSet(-1).toArray()).to.deep.equal([]);
    });
    it("subSet", ()=>{
      expect(ss.subSet(5,19).toArray()).to.deep.equal([5,11,12,15,18]);
      expect(ss.subSet(12,35).toArray()).to.deep.equal([12,15,18,19,22,23]);
      expect(ss.subSet(12,1).toArray()).to.deep.equal([]);
      expect(ss.subSet(12,12).toArray()).to.deep.equal([]);
    });
    it("tailSet", ()=>{
      expect(ss.tailSet(15).toArray()).to.deep.equal([18,19,22,23,45,98]);
      expect(ss.tailSet(20).toArray()).to.deep.equal([22,23,45,98]);
      expect(ss.tailSet(100).toArray()).to.deep.equal([]);
      expect(ss.tailSet(98).toArray()).to.deep.equal([]);
    });
  });

  //AbstractMap
  describe("AbstractMap", ()=>{
    let am;
    it("constructor", ()=>{
      expect(index.AbstractMap).to.not.equal(undefined);
      am = new index.AbstractMap({key:"a", value:1},{key:"b", value:2});
      expect(am).to.be.an.instanceOf(index.AbstractMap);
      expect(am.entrySet().toArray()).to.deep.equal([{key:"a", value:1},{key:"b", value:2}]);
    });
    it("clear, isEmpty", ()=>{
      expect(am.isEmpty()).to.equal(false);
      am.clear();
      expect(am.isEmpty()).to.equal(true);
    });
    it("put, putIfAbsent", ()=>{
      expect(am.put("a",1)).to.equal(undefined);
      expect(am.put("b",null)).to.equal(undefined);
      expect(am.put("a",12)).to.equal(1);
      expect(am.entrySet().toArray()).to.deep.equal([{key:"a", value:12},{key:"b", value:null}]);
      expect(am.putIfAbsent("c",15)).to.equal(undefined);
      expect(am.putIfAbsent("a",25)).to.equal(12);
      expect(am.entrySet().toArray()).to.deep.equal([{key:"a", value:12},{key:"b", value:null},{key:"c", value:15}]);
    });
    it("get, getOrDefault", ()=>{
      expect(am.get("a")).to.equal(12);
      expect(am.get("j")).to.equal(undefined);
      expect(am.get("b")).to.equal(null);
      expect(am.getOrDefault("b",45)).to.equal(45);
      expect(am.getOrDefault("j",45)).to.equal(45);
      expect(am.getOrDefault("a",45)).to.equal(12);
    });
    it("entrySet, keySet, values", ()=>{
      expect(am.entrySet().toArray()).to.deep.equal([{key:"a", value:12},{key:"b", value:null},{key:"c", value:15}]);
      expect(am.keySet().toArray()).to.deep.equal(["a","b","c"]);
      expect(am.values().toArray()).to.deep.equal([12,null,15]);
    });
    it("containsKey, containsValue", ()=>{
      expect(am.containsKey("a")).to.equal(true);
      expect(am.containsKey("f")).to.equal(false);
      expect(am.containsValue(25)).to.equal(false);
      expect(am.containsValue(12)).to.equal(true);
      expect(am.containsValue(null)).to.equal(true);
    });
    it("compute, computeIfAbsent, computeIfPresent", ()=>{
      expect(am.compute("a",(k,v,m)=>(v*2))).to.equal(12);
      expect(am.values().toArray()).to.deep.equal([24,null,15]);
      expect(am.compute("a",(k,v,m)=>(null))).to.equal(24);
      expect(am.values().toArray()).to.deep.equal([24,null,15]);

      expect(am.computeIfPresent("c",(k,v,m)=>(v+2))).to.equal(15);
      expect(am.values().toArray()).to.deep.equal([24,null,17]);
      expect(am.computeIfPresent("b",(k,v,m)=>(v+2))).to.equal(null);
      expect(am.values().toArray()).to.deep.equal([24,null,17]);
      expect(am.computeIfPresent("c",(k,v,m)=>(null))).to.equal(17);
      expect(am.values().toArray()).to.deep.equal([24,null,17]);

      expect(am.computeIfAbsent("b",(k,v,m)=>(k.charCodeAt(0)))).to.equal(null);
      expect(am.values().toArray()).to.deep.equal([24,98,17]);
      expect(am.computeIfAbsent("a",(k,v,m)=>(k.charCodeAt(0)))).to.equal(24);
      expect(am.values().toArray()).to.deep.equal([24,98,17]);
      expect(am.computeIfAbsent("dd",(k,v,m)=>(null))).to.equal(undefined);
      expect(am.values().toArray()).to.deep.equal([24,98,17]);
    });
    it("equals", ()=>{
      let am2 = new index.AbstractMap({key:"a", value:24},{key:"b", value:98});
      expect(am.equals(am)).to.equal(true);
      expect(am.equals(am2)).to.equal(false);
      expect(am.equals([])).to.equal(false);
      am2.put("c",17);
      expect(am.equals(am2)).to.equal(true);
    });
    it("forEach", ()=>{
      am.forEach((key,value,map) => {
        expect(value).to.equal(map.get(key));
      });
    });
    it("putAll", ()=>{
      let am2 = new index.AbstractMap({key:"a",value:22},{key:"d", value:17},{key:"e", value:null}, {key:"f", value:27});
      am.putAll(am2);
      expect(am.entrySet().toArray()).to.deep.equal([{key:"a", value:22},{key:"b", value:98},{key:"c", value:17},{key:"d", value: 17}, {key:"e", value:null}, {key:"f", value:27}]);
    });
    it("remove,removeIf", ()=>{
      expect(am.remove("a")).to.equal(22);
      expect(am.remove("ff")).to.equal(undefined);
      expect(am.entrySet().toArray()).to.deep.equal([{key:"b", value:98},{key:"c", value:17},{key:"d", value: 17}, {key:"e", value:null}, {key:"f", value:27}]);
      expect(am.removeIf("b", 88)).to.equal(false);
      expect(am.removeIf("b", 98)).to.equal(true);
      expect(am.values().toArray()).to.deep.equal([17,17,null,27]);
    });
    it("replace, replaceAll, isNull, size", ()=>{
      expect(am.replace(28,15)).to.equal(false);
      expect(am.replace(17,9)).to.equal(true);
      expect(am.entrySet().toArray()).to.deep.equal([{key:"c", value:9},{key:"d", value: 9}, {key:"e", value:null}, {key:"f", value:27}]);
      expect(am.size()).to.equal(4);
      expect(am.isNull()).to.equal(false);
      am.replaceAll((k,v,m)=>(null));
      expect(am.isNull()).to.equal(true);
    });
  });
  //SwappableList
  describe("SwappableList", ()=>{
    let sl;
    it("constructor", ()=>{
      expect(index.SwappableList).to.not.equal(undefined);
      sl = new index.SwappableList(1,2,3,4,5,6,7,8);
      expect(sl).to.be.an.instanceOf(index.SwappableList);
    });
    it("swap", ()=>{
      expect(sl.swap(9,15)).to.equal(false);
      expect(sl.swap(3,15)).to.equal(false);
      expect(sl.swap(9,5)).to.equal(false);
      expect(sl.swap(2,5)).to.equal(true);
      expect(sl.toArray()).to.deep.equal([1,2,6,4,5,3,7,8]);
    });
    it("rise, fall", ()=>{
      expect(sl.rise(9)).to.equal(false);
      expect(sl.rise(0)).to.equal(false);
      expect(sl.rise(3)).to.equal(true);
      expect(sl.toArray()).to.deep.equal([1,2,4,6,5,3,7,8]);

      expect(sl.fall(7)).to.equal(false);
      expect(sl.fall(5)).to.equal(true);
      expect(sl.toArray()).to.deep.equal([1,2,4,6,5,7,3,8]);
    });
    it("rotate", ()=>{
      sl.rotate(-1);
      expect(sl.toArray()).to.deep.equal([2,4,6,5,7,3,8,1]);
      sl.rotate(0);
      expect(sl.toArray()).to.deep.equal([1,2,4,6,5,7,3,8]);
      sl.rotate(1);
      expect(sl.toArray()).to.deep.equal([8,1,2,4,6,5,7,3]);
      let s2 = new index.SwappableList();
      s2.rotate(-1);
      s2.rotate(1);
    });
    it("clone", ()=>{
      expect(sl.clone()).to.deep.equal(sl);
      expect(sl.clone()).to.not.equal(sl);
    });
    it("toString", ()=> {
      expect(sl.toString((x)=>(x.toString()))).to.equal("[8,1,2,4,6,5,7,3]");
    });
    it("fromString", ()=> {
      let spl = new index.SwappableList().fromString("[8,1,2,4,6,5,7,3]", (x)=>(parseFloat(x)));
      expect(spl).to.deep.equal(sl);
    });
  });
  //ArrayMap
  describe("ArrayMap", ()=>{
    let am;
    it("constructor", ()=>{
      expect(index.ArrayMap).to.not.equal(undefined);
      am = new index.ArrayMap(5,{key:"a", value:1},{key:"b", value:2},{key:"c", value:3},{key:"d", value:4});
      expect(am).to.be.an.instanceOf(index.ArrayMap);
      expect(am.entrySet().toArray()).to.deep.equal([{key:"a", value:1},{key:"b", value:2},{key:"c", value:3},{key:"d", value:4}]);
    });
    it("put", ()=>{
      expect(am.put("e",5)).to.equal(undefined);
      expect(am.values().toArray()).to.deep.equal([1,2,3,4,5]);
      expect(am.keySet().toArray()).to.deep.equal(["a","b","c","d","e"]);
      expect(()=>{am.put("f",6)}).to.throw();
    });
    it("ensureCapacity", ()=>{
      am.ensureCapacity(10);
      expect(am.put("f",6)).to.equal(undefined);
    });
    it("clone", ()=>{
      expect(am.clone()).to.deep.equal(am);
      expect(am.clone()).to.not.equal(am);
    });
    it("trimToSize", ()=>{
      am.trimToSize();
      expect(()=>{am.put("g",7)}).to.throw();
    });
  });
  //Dictionary
  describe("Dictionary", ()=>{
    let dict;
    it("constructor", () => {
      expect(index.Dictionary).to.not.equal(undefined);
      dict = new index.Dictionary({key:"a", value:1},{key:"b", value:2},{key:"c", value:2},{key:"d", value:4});
      expect(dict).to.be.an.instanceOf(index.Dictionary);
      expect(dict.entrySet().toArray()).to.deep.equal([{key:"a", value:1},{key:"b", value:2},{key:"c", value:2},{key:"d", value:4}]);
    });
    it("count", () => {
      expect(dict.count(2)).to.equal(2);
      expect(dict.count(1)).to.equal(1);
      expect(dict.count(4)).to.equal(1);
      expect(dict.count(10)).to.equal(0);
    });
    it("getKeys", () => {
      expect(dict.getKeys(2).toArray()).to.deep.equal(["b","c"]);
      expect(dict.getKeys(1).toArray()).to.deep.equal(["a"]);
      expect(dict.getKeys(4).toArray()).to.deep.equal(["d"]);
      expect(dict.getKeys(10).toArray()).to.deep.equal([]);
    });
    it("clone", ()=>{
      expect(dict.clone()).to.deep.equal(dict);
      expect(dict.clone()).to.not.equal(dict);
    });
    it("toString", ()=>{
      expect(dict.toString(x => x.toString())).to.equal(`{"a":1,"b":2,"c":2,"d":4}`);
    });
    it("fromString", ()=>{
      let jsonS = `{"a":1,"b":2,"c":2,"d":4}`;
      expect(dict.fromString(jsonS,x=>parseFloat(x))).to.deep.equal(dict);
    });
  });
  //HistoryList
  describe("HistoryList", ()=>{
    let hl;
    it("constructor", ()=>{
      expect(index.HistoryList).to.not.equal(undefined);
      hl = new index.HistoryList(5,1,2,3,4,5,6);
      expect(hl).to.be.an.instanceOf(index.HistoryList);
      expect(hl.toArray()).to.deep.equal([1,2,3,4,5]);
    });
    it("add", ()=>{
      expect(hl.add(6)).to.equal(true);
      expect(hl.toArray()).to.deep.equal([2,3,4,5,6]);
      expect(hl.add(7,3)).to.equal(true);
      expect(hl.toArray()).to.deep.equal([3,4,5,6,7]);
    });
    it("addAll", ()=>{
      expect(hl.addAll([8,9])).to.equal(true);
      expect(hl.toArray()).to.deep.equal([5,6,7,8,9]);
      expect(hl.addAll([10,11],3)).to.equal(true);
      expect(hl.toArray()).to.deep.equal([7,8,9,10,11]);
    });
    it("recent", ()=>{
      expect(hl.recent(4)).to.deep.equal([8,9,10,11]);
      expect(hl.recent(11)).to.deep.equal([7,8,9,10,11]);
    });
    it("clearUntill", ()=>{
      hl.clearUntill(3);
      expect(hl.toArray()).to.deep.equal([9,10,11]);
    });
  });
  //AbstractGraph
  describe("AbstractGraph, Edge, Vertex", ()=>{
    let ag;
    it("constructor", ()=>{
      expect(index.AbstractGraph).to.not.equal(undefined);
      expect(index.Vertex).to.not.equal(undefined);
      expect(index.Edge).to.not.equal(undefined);
      ag = new index.AbstractGraph();
      expect(ag).to.be.an.instanceOf(index.AbstractGraph);
      expect(new index.Vertex(2)).to.be.an.instanceOf(index.Vertex);
      expect(new index.Edge(new index.Vertex(1), new index.Vertex(2))).to.be.an.instanceOf(index.Edge);
    });
    it("add, addVertex, vertexSet", () => {
      ag.add(25);
      expect(ag.vertexSet().toArray()).to.deep.equal([{label: 25}]);
    });
    it("addAll, addVertices", ()=>{
      ag.addAll([26,27,28]);
      expect(ag.vertexSet().toArray().map(x=>x.label)).to.deep.equal([25,26,27,28]);
    });
    it("createEdge, addEdge", ()=>{
      ag.createEdge(29,30);
      let v = ag.vertexSet().toArray()[4];
      expect(ag.vertexSet().toArray().map(x=>x.label)).to.deep.equal([25,26,27,28,29,30]);
      expect(ag.edgeSet().toArray()).to.deep.equal([{start:{label:29},end:{label:30}}]);
      expect(ag.adjacentEdges(v).toArray()).to.deep.equal([{start:{label:29},end:{label:30}}]);
      expect(ag.edgeSet().toArray()[0].start).to.equal(v);
    });
    it("remove, removeVertex, removeEdge", ()=>{
      expect(ag.remove(30)).to.equal(true);
      expect(ag.remove(65)).to.equal(false);
      expect(ag.removeVertex(new index.Vertex(26))).to.equal(false);
      expect(ag.vertexSet().toArray().map(x=>x.label)).to.deep.equal([25,26,27,28,29]);
      let vers = ag.vertexSet().toArray();
      expect(ag.removeEdge(new index.Edge(vers[0],vers[1]))).to.equal(false);
      expect(ag.removeEdge(new index.Edge(new index.Vertex(20), vers[1]))).to.equal(false);
      expect(ag.edgeSet().toArray()).to.deep.equal([]);
    });
    it("adjacentEdges", ()=>{
      expect(ag.adjacentEdges(new index.Vertex(30))).to.equal(undefined);
      expect(ag.adjacentEdges(ag.vertexSet().toArray()[4]).toArray()).to.deep.equal([]);
    });
  });

});
