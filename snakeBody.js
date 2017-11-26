
class SnakeBody {
    constructor() {
        this.head = [0, 0];
        this.tail = [0, 0];
        this.body = new Array();
        this.forRemove = new Array();
    }

    popback() {
        //todo set tail
        let oldTail = this.body.pop();
        this.forRemove.push(oldTail);
        return oldTail;
    }

    pushback(item) {
        //todo set tail        
        this.body.push(item);
    }

    popfront() {
        this.head = this.body[this.body.length - 2];
        return this.body.shift();
    }

    pushfront(item) {
        this.head = item;
        this.body.unshift(item);
    }

    [Symbol.iterator]() {
        return new ArrayIterator(this.body);
    }
}

class ArrayIterator {
    constructor(arr) {
        this.arr = arr;
        this.i = 0;
    }
    next() {
        let result = { value: undefined, done: true };
        if (this.i < this.arr.length) {
            result.value = this.arr[this.i];
            result.done = false;
            this.i += 1;
        }
        return result;
    }
}