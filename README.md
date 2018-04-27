# NodeJS Data Structure

NodeJS library with lot of Data Structures to help Back-End Developors

[![Build Status](https://travis-ci.org/ArjunAtlast/js-datastructure.svg?branch=master)](https://travis-ci.org/ArjunAtlast/js-datastructure)
[![Coverage Status](https://coveralls.io/repos/github/ArjunAtlast/js-datastructure/badge.svg?branch=master)](https://coveralls.io/github/ArjunAtlast/js-datastructure?branch=master)

##Docs

* [Stack](#stackt-class)
* [Iterable](#iterablet-interface)
* [Queue](#queuet-class)
* [Iterator](#iteratore-class)

## Stack\<T\> <sup>Class</sup>

Creates a Stack datastructure.

### Syntax

```javascript
import {Stack} from 'js-datastructure';

var s = new Stack<number>(1,2,3,...); //number stack
```

### Properties

* **height**  - Number of elements in stack.

### Operations

* **push(item:\<T\>):void**   - Push item to the top of the stack.
* **pop():\<T\>**             - Pop top of the stack and return.
* **peek():\<T\>**            - Return top of the stack (does not pop).
* **search(item:T):number** - Return first index (from top of the stack) of an item in stack.*-1 is returned in case the item doesn't exist on stack*

*Note: an empty stack returns undefined for a pop or peek operation.*

## Iterable\<T\> <sup>Interface</sup>

Implementing this interface allows an object to have forEach functionality.

## Methods

* **forEach(action:Function):void** - Loop over each element and execute an action.
* **iterator():Iterator\<T\>**        - Returns an iterator over elements of type T.

## Queue\<T\> <sup>Class</sup>

Creates a queue datastructure.*(Implements Iterable)*

### Syntax
```javascript
import {Queue} from 'js-datastructure';

var q = new Queue<number>(1,2,3,...); //number stack
```

### Properties

* **front**   - Item at the beginning of the queue.
* **rear**    - Item at the end of the queue.
* **length**  - Number of elements in queue.

*Note: Both front and rear are immutable*

### Operations

* **enqueue(item:T):void**  - Add item to the end of the queue.
* **dequeue():T|undefined** - Remove item from the beginning of the queue and return.
* *Implements [Iterable Methods](#iterable)*

*Note: an empty queue returns undefined for a dequeue operation*

---
## Iterator\<E\> <sup>Class</sup>

Used to iterate over element of type E.

### Operations

* **forEachRemaining(action:Function):void** - Performs the given action for each remaining element until all elements have been processed or the action throws an exception.
* **hasNext():boolean**      - Returns true if the iteration has more elements.
* **next():E**               - Returns the next element in the iteration.
* **remove():void**          - Removes from the underlying Iterable the last element returned by this iterator.
