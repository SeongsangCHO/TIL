class Node {
  constructor(data, next = null) {
    this.data = data;
    this.next = next;
  }
}

class Queue {
  constructor() {
    this.rear = null; //맨 앞을 가리키는 포인터
    this.front = null; // 맨 뒤를 가리키는 포인터
  }
  enqueue(data) {
    let newNode = new Node(data);
    let rear = this.rear;
    if (!rear) {
      this.rear = newNode;
      this.front = newNode;
    } else {
      newNode.next = rear;
      this.rear = newNode;
    }
    return this;
  }
  dequeue() {
    let front = this.front;
    let curr = this.rear;
    let prev = null;
    if (!curr.next) {
      this.front = null;
      this.rear = null;
      console.log("리스트가 비었어요");
      return;
    } else {
      while (curr.next) {
        prev = curr;
        curr = curr.next;
      }
      curr = null;
      prev.next = null;
      this.front = prev;
    }
    return this;
  }
  printQueue() {
    let rear = this.rear;
    while (rear) {
      console.log(rear.data);
      rear = rear.next;
    }
  }
}

let q = new Queue();

q.enqueue(1);
q.enqueue(2);
q.enqueue(3);
q.dequeue();
q.dequeue();
q.dequeue();
q.enqueue(3);
q.enqueue(2);
q.enqueue(1);
q.printQueue();
