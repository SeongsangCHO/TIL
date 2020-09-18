## 큐

[https://velog.io/@pa324/%EC%9E%90%EB%A3%8C%EA%B5%AC%EC%A1%B0-Queue%ED%81%90-udjxr0hb3x](https://velog.io/@pa324/자료구조-Queue큐-udjxr0hb3x)

### 개념

- 스택과 마찬가지로 일종의 리스트
- 삽입은 한쪽 끝에서, 삭제는 반대 끝에서
- 삽입이 일어나는 부분을 rear, 삭제쪽은 front라고 부른다.
- FIFO. 스택은 LIFO임.

#### 용도

- 컴퓨터 버퍼에서 주로 사용 -> 마구 입력이 되었으나, 처리를 하지 못할 때 버퍼(큐)를 만들어 대기시킨다.

#### 단점

- 일반 배열 큐- > 큐에 빈 메모리가 있어도 꽉 차 있는 것으로 판단할 수 있다. => 원형 큐가 해당 단점 보완
- 원형 큐의 단점 -> 메모리 공간은 잘 활용하나 배열로 구현되어있기에 큐의 크기가 제한되는 단점 존재 -> 연결리스트로 큐 해당 단점 보완
- 연결리스트 큐 -> 크기제한X 삽입,삭제 편리

### 연산

- insert, enqueue, offer, push : queue의 rear에 새로운 원소를 삽입하는 연산
  - enqueue : 큐 맨 뒤에 노드 추가.
  - rear : 큐 맨 뒤의 인덱스.
- remove, dequeue, poll, pop : queue의 front에 있는 원소를 queue로부터 삭제하고 반환하는 연산
  - dequeue : 큐 맨 앞쪽의 요소 삭제
  - front : 큐의 맨 앞의 인덱스
- peek, element, front : 큐의 front에 있는 원소를 제거하지 않고 반환하는 연산
  - peek : front에 위치한 데이터를 읽음
- is_empty : 큐가 비었는지 검사

### 응용

- cpu 스케쥴링: 프로세스들은 큐에서 CPU가 할당되기를 기다린다.
- 데이터 버퍼: 네트워크를 통해 전송된 패킷은 순서대로 버퍼에 저장됨
- 자원을 공유하는 대부분의 경우에 큐가 사용.

### 구현

### https://monsieursongsong.tistory.com/5

- 링크드리스트
  - 삭제- front, 삽입 rear이므로 , 연결리스트의 앞쪽을 front, 뒤쪽을 rear로 하는 것이 유리
  - 삽입을 하기 위해서 마지막 노드의 주소를 기억해야함.
- 배열
- 위의 두가지 모두 장, 단점을 가지므로 상황에 맞게 정하면 됨.
- 두가지의 문제점을 해결할 수 있는 원형-큐







- 노드, 큐를 만든다

```c
typedef struct s_node
{
	int data;
	t_node *next;
}t_node;

typedef struct s_queue
{
    t_node *rear;
    t_node *front;
    int size;
}t_queue;
```

큐를 초기화한다.

- 메모리 동적할당

- rear,front에 NULL값 삽입.

- size 초기화

  ​		 front ...........rear

삭제연산 0->0->0->0->0->0 삽입연산

삭제연산시

**0**->0->0->0->0->0

​     **0**->0->0->0->0



데이터 삽입연산- enQueue

- 큐가 비어있을때, rear,front가 새로운 노드를 가리킨다.
- 그 외의 경우, rear의 next는 해당 노드를 가리키고, rear는 해당 노드의 주소를 갖는다.

데이터 삭제연산- deQueue

- 큐가 비어있을때, 아무연산도 하지않게 한다.
- 그 외의 경우, front는 삭제할 노드가 되고, front는 front의 next의 주소를 갖게한다.

### 