class Stack { 
  constructor() { 
    this.head = null;
    this.tail = null;
  }

  add(data) { 
    let newNode = new Node(data);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    }
    else { 
      let tail = this.tail;
      let head = this.head;
      tail.next = newNode;
      newNode.prev = tail;
      this.tail = newNode;
      newNode.next = head;
    }
    return newNode;

  }
  pop() { 
    let tail = this.tail;
    
    if (tail) { 
      this.tail = tail.prev;
      tail.prev.next = null;
      tail = null;
      return this.tail;
    }
  }
  print() { 
    let curr = this.head;
      // console.log(curr.data);
    // while (curr) { 
    //   console.log(curr.data);
    //   curr = curr.next;
    // }
    console.log('tail is : '+ this.tail.data);
    
  }
}
class Node { 
  constructor(data) { 
    this.data = data;
    this.next = null;
    this.prev = null;
  }
}

let stk = new Stack();

stk.add(1);
stk.add(2);
stk.add(3);
stk.add(4);
stk.add(5);
stk.add(6);


console.log(stk.pop());
stk.print();

console.log(stk);
