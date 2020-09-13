class LinkedList {
  constructor() {
    this.head = null;
    this.size = 0;
  }

  add(data) {
    let node = new Node(data);
    let curr = this.head;
    this.size++;
    if (!curr) {
      //head가 null일때 = 비었을때
      this.head = node;
      return node;
    } else {
      while (curr.next) {
        curr = curr.next;
      }
      curr.next = node;
      return node;
    }
  }
  search(data) {
    let curr = this.head;

    while (curr) {
      if (curr.data == data) return curr;
      else curr = curr.next;
    }
    return "찾는 값이 없어요..";
  }
  deleteFirst() {
    let curr = this.head;
    this.head = curr.next;
    curr = null;
    return ' 삭제';
  }

  delete(position) { 
    let prev;
    let count = 0;
    let curr = this.head;
    if (position == 0) {
      this.deleteFirst();
    }
    else { 
      while (count < position) { 
        prev = curr;
        curr = curr.next;
        count++;
      }
      let removeNode = curr;
      return prev.next = removeNode ? removeNode.next : null;
    }
  }
  print() { 
    let curr = this.head;
    while (curr) { 
      console.log(curr.data);
      curr = curr.next;
    }
  }
}

class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}
let list = new LinkedList();

console.log(list.add(12));
console.log(list.add(14));
console.log(list.add(15));

// console.log(list.search(15));
// console.log(list.search(1));
// console.log(list.deleteFirst());
// console.log(list.deleteFirst());
list.delete(2);
list.print();
