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
    var q = new index.Queue(1,2,3);
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
      expect(q.front).to.equal(2);
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

  //Queue
  describe("Queue", () => {
    var q = new index.Queue(1,2,3);
    it("constructor", () => {
      expect(index.Queue).to.not.equal(undefined);
      expect(q).to.be.an.instanceOf(index.Queue);
      expect(q.front).to.equal(1);
      expect(q.rear).to.equal(3);
      expect(q.length).to.equal(3);
    });
    it("enqueue", () => {
      q.enqueue(5);
      expect(q.rear).to.equal(5);
    });
    it("dequeue", () => {
      expect(q.dequeue()).to.equal(1);
    });
    it("iterator", () => {
      expect(q.iterator()).to.be.an.instanceOf(index.Iterator);
    });
    it("forEach", () => {
      let a = [2,3,5];
      q.forEach((item,index) => {
        expect(item).to.equal(a[index]);
      });
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
    it("listIterator", () => {
      expect(l.listIterator()).to.be.an.instanceOf(index.ListIterator);
    });
  });
});
