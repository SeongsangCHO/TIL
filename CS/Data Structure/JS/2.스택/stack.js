class Stack { 
  constructor() { 
    this.store = [];
    this.size = 0;
  }

  push(item) { 
    this.store.push(item);
    this.size++;
  }

  pop() { 
    this.size--;
    return this.store.pop();
  }
  isEmpty() { 
    return this.size > 0 ? true : false;
  }
}

const stack = new Stack();
stack.push(1);
stack.push(2);
stack.push(3);
stack.push(4);
console.log(stack.size);
console.log(stack.isEmpty());
console.log(stack.pop());
console.log(stack.pop());
console.log(stack.pop());
console.log(stack.pop());
console.log(stack.isEmpty());
