class Node {
  constructor(data, next = null, prev = null) {
    this.data = data;
    this.next = next;
    this.prev = prev;
  }
}

class LinkedList {
  constructor() {
    this.size = 0;
    this.head = null;
    this.tail = null;
  }
  prepend(data) {
    let head = this.head;
    let newNode = new Node(data, this.head); //맨 앞에올 newNode의 next는 이전 head를 가리킴
    if (head) {
      // head가 존재하면
      head.prev = newNode; // head의 이전은 newNode
    }
    this.head = newNode; // 새로운 head는 newNode
    if (!this.tail)
      // tail이 null이면 = 맨 첫 노드면,tail set.
      this.tail = newNode;
    this.size++;
    return newNode;
  }
  append(data) {
    //tail의 next를 newNode로,
    //newNode의 prev를 tail로,
    //tail은 newNode
    let tail = this.tail;
    if (!this.tail) this.prepend(data);
    else {
      let newNode = new Node(data, null, tail);
      tail.next = newNode;
      this.tail = newNode;
      this.size++;
      return newNode;
    }
    return;
  }
  deleteFirst() {
    let head = this.head;
    let curr;
    if (this.head == this.tail) {
      this.head = null;
      this.tail = null;
      this.size--;
    } else {
      curr = head.next;
      this.head = curr;
      curr.prev = null;
      head.next = null;
      this.size--;
    }
    return this;
  }
  deleteTail() {
    let tail = this.tail;
    let prev;
    if (this.head == this.tail) {
      this.head = null;
      this.tail = null;
    } else {
      prev = tail.prev;
      prev.next = null;
      this.tail = prev;
    }
    this.size--;
    return this;
  }
  delete(pos) {
    let count = 0;
    let curr = this.head;
    let deleted = curr;
    if (!curr) {
      this.deleteFirst();
      return this;
    } else {
      while (count < pos) {
        deleted = curr;
        curr = curr.next;
        count++;
      }
      if (deleted == this.head) {
        //삭제노드가 처음노드.
        this.deleteFirst();
        return this;
      }
      if (deleted == this.tail) {
        //삭제노드가 끝 노드
        this.deleteTail();
        return this;
      } else {
        //삭제노드가 중간노드
        deleted.prev.next = curr;
        curr.prev = deleted.prev;
        deleted = null;
        this.size--;
      }
      return this;
    }
  }
  reverse() {
    let curr = this.head;
    let prev = null;
    let next = null;
    while (curr) {
      next = curr.next;
      prev = curr.prev;

      curr.next = prev;
      curr.prev = next;
      prev = curr;
      curr = next;
    }
    this.tail = this.head;
    this.head = prev;
  }

  find(pos) {}

  isEmpty() {}

  printList() {
    let curr = this.head;
    let i = 0;
    while (curr) {
      console.log(i + "번째 데이터 : " + curr.data);
      i++;
      curr = curr.next;
    }
    return;
  }
  listSize() {
    return "리스트 사이즈 : " + this.size;
  }
}

let list = new LinkedList();

list.append(1);
list.append(2);
list.append(3);
list.append(4);
list.append(5);
list.deleteFirst();
list.deleteFirst();
list.deleteFirst();
list.deleteFirst();
list.append(4);
list.append(3);
list.deleteTail();
list.deleteTail();
list.deleteTail();
list.append(1);
list.append(2);
list.append(3);
list.append(4);
list.delete(0);
list.delete(1);
list.delete(0);
list.delete(0);

list.append(1);
list.append(2);
list.append(3);
list.append(4);
list.append(5);
console.log(list.listSize());
list.printList();

list.reverse();
list.printList();
