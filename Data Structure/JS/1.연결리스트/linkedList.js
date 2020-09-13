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
  }

  prepend(data) {//맨 앞에 데이터 추가 

  }
  append(data) { //마지막에 데이터 추가 

  }
  deleteFirst() { //맨앞 데이터 제거
  }
  deleteTail() { //맨 뒤 데이터 제거
  }
  delete(pos) { //pos 위치 요소 제거
  }
  reverse() { //요소 거꾸로 연결
  }
  find(pos) { //pos위치요소 반환
  }
  isEmpty() { //리스트 비었는지 확인
  }
  printList() { //리스트 전체요소 출력
  }
}