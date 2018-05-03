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
      expect(al.toString()).to.equal("[2,4,5,6,8,14,16,18,20,10,12]");
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
      expect(pq.toString()).to.equal("[2,3,4,5,6,6.5,7,8,9]");
    });
  })
});
