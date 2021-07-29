// head -> 1`-> 2 -> 3 -> 4  ,, <- 4를 가리키는 tail 포인터

class Node {
  //next 인자가 들어오지 않으면 null
  constructor(data, next = null) {
    this.data = data;
    this.next = next;
  }
}

class LinkedList{
  constructor() { 
    //첫번째 노드를 가리킬 포인터
    this.head = null;
    //마지막 노드를 가리킬 포인터
    this.tail = null;
    this.size = 0;
  }

  prepend(data) {//맨 앞에 데이터 추가 

    //newNode.next는 현재 맨 앞 노드를 가리킴.
    //this.head는 new Node를 가리킴.
    let newNode = new Node(data, this.head);
    this.head = newNode;

    //tail이 없다면, 맨 끝을 가리키는 tail -> newNode;
    if (!this.tail) { 
      this.tail = newNode;
    }
    this.size++;
    return this;
  }
  append(data) { //마지막에 데이터 추가 
    let newNode = new Node(data);

    if (!this.head) {//리스트가 비어있을 경우
      return this.prepend(data);
    }
    else { 
      let tail = this.tail;
      tail.next = newNode;
      this.tail = newNode;
    }
    this.size++;
    return newNode;
  }
  deleteFirst() { //맨앞 데이터 제거
    let head = this.head;
    if (head) {
      this.head = head.next;
      head = null;
      this.size--;
    }
    else { 
      return '리스트가 비었어요';
    }
    return this.head;
  }
  deleteTail() { //맨 뒤 데이터 제거
    let prev = this.head;
    let curr = prev.next;
    if (!curr) { //현재가 다음을 가리키는게 없다면 ->사이즈가 1이라면
      this.size--;
      this.tail = null;
      this.head = null;
      
      return '리스트를 비웠습니다';
    }
    else {
      while (curr.next) { //삭제할 노드가 다음을 가리키는지 확인
        prev = curr;
        curr = curr.next;
      }
    }
    this.tail = prev;
    prev.next = null;
    this.size--;
    return prev;
  }
  reverse() { //요소 거꾸로 연결
    let curr = this.head;
    let prev = null;
    let next = null;

    while (curr) { 
      //next 노드 저장
      next = curr.next;
      //현재의 다음 노드를 이전노드로
      curr.next = prev;
      //prev를 현재위치로
      prev = curr;
      //curr을 next로
      curr = next;
    }
    //head를 tail로
    this.tail = this.head;
    //마지막노드인 prev를 tail이 가리키게
    this.head = prev;
  }
  find(pos) { //pos위치요소 반환
    let count = 0;
    let curr = this.head;
    while (count < pos) {
      curr = curr.next;
      count++;
    }
    return curr.data;
  }
  isEmpty() { //리스트 비었는지 확인
    return this.size == 0 ? '비었음' : '안비었음';
  }
  printList() { //리스트 전체요소 출력
    let head = this.head;
    let idx = 0;
    while (head) { 
      console.log(idx++ +"번째 : "+head.data);
      head = head.next;
    }
    console.log('리스트 사이즈 :'+this.size);
    
  }
}


let list = new LinkedList();


console.log(list.isEmpty());

console.log(list.prepend(123));

console.log(list.append(456));
console.log(list.append(789));


list.append(1);
list.append(2);
list.append(3);
list.append(4);

list.deleteFirst();
list.deleteFirst();
list.deleteFirst();

list.append(10);
list.prepend(0);
list.deleteTail();
list.deleteTail();
list.deleteTail();
list.deleteTail();
list.deleteTail();
list.deleteTail();

list.append(1);
list.append(2);
list.append(3);
list.append(4);
list.append(5);
list.deleteTail();
list.deleteTail();
list.deleteTail();
list.deleteTail();
list.deleteTail();


list.append(5);
list.append(4);
list.append(3);
list.append(2);
list.append(1);

list.reverse();
console.log('0번째요소의 값 '+list.find(0)); // 2
console.log('1번째요소의 값 '+list.find(1)); // 2
console.log('2번째요소의 값 '+list.find(2)); // 2
console.log('3번째요소의 값 '+list.find(3)); // 2
console.log('4번째요소의 값 '+list.find(4)); // 2
list.printList();
console.log(list.isEmpty());