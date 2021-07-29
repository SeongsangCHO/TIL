Linked List

- 연결리스트의 맨 첫번째 노드를 head노드라고 한다.
- 단일 연결리스트를 구현하는데 **필수적**
- 값이 없는 더미노드를 생성해, 간편성을 높인다. 
- 마지막 노드는 꼬리노드
- 마지막 노드의 next는 반드시 NULL을 가리키도록해야한다.
- 연결리스트의 사전데이터(메타)는 head, tail, size가 있다.

연결리스트에서 2중포인터를 사용하는 이유???

- 단일 연결리스트에서 삽입, 삭제를 통해 head 포인터 값을 변화시킬 수 있다.

- t_list  **lst는, *lst의 주소를 가리키는 포인터다.

- ```c
  new->next = *head;
  *head = new; // 이처럼 *head시작포인터를 새로 생성한 new 주소로 변경할 수 있기 때문에 이중포인터로 선언
  ```

  

- **lst는가 가리키는 *lst의 주소는 lst의 첫번째 주소

- *lst는 head의 주소

*lst == NULL, lst == NULL

- *lst는 첫번째 주소, 헤드가 NULL이면, 빈 리스트!
- lst는 리스트 자체가 존재하지 않는다.

## 삽입

### add_node 처음 또는 맨 끝에 추가.

```c
t_list **lst;
t_list *curr;
if (lst == 0 || !(new = create_node(data))) // 리스트가 없거나, 노드생성에 실패했을때.
return ;
if (*lst == 0) // 빈 리스트이면, 새로 생성한 노드가 head노드.
{
	*lst = new;
	return ;
}
// 빈리스트가 아니라면,
curr = *lst; // curr의 주소를 맨 끝, tail로 이동 (curr->next가 NULL일때까지)
while (curr->next)
	curr = curr->next;
*lst->next = new; //tail의 다음주소를 new주소로. 맨끝에 노드 추가.
```

#### add_node_n n번째에 추가.

```c
t_list **head;
t_list *new;
t_list *curr;
int 	idx;

if (head == 0 || !(new = malloc(sizeof(t_list))))
	return ;
if (*head == 0)
{
	new->next = *head;
    *head = new;
}
curr = *head;
idx = 0;
while (curr->next && idx < n - 1)
{
    curr = curr->next;
    idx++;
}
new->next = curr->next;
curr->next = new;
```

## 삭제

head를 삭제할때, tail을 삭제할때, 그외를 삭제할때 3가지 분기를 나누어서 생각한다.

- head를 삭제할 때,

```c
void delete_node(t_node **head, int n)
{
	t_node *p;
	if (n == 1) //head일때,
	{
		p = *head;//임시노드의 주소를 head로 설정.
		*head = p->next; // 현재 head의 주소를 head 다음의 주소로 지정
		free(p);// 원래 head 삭제
		return ;
	}
}
```

- 중간, tail을 삭제할 때,

```c
t_node *q;
t_node *p;
int	   idx;
idx = 0;

...
    else
    {
        while (p != NULL && idx < n - 1)
        {
            q = p;
            p = p->next;
            idx++;
        }
        if (p == NULL)
        {
            prev->next = NULL;
            return ;
        }
        else // 중간 노드 삭제.
        {
            q->next = p->next;
            free(p);
            return ;
        }
    }

```

**04/20 15:20 ~ 16:00 단일연결리스트 수정 및 검색에 대한 내용 정리 및 구현**

- 검색 구현 및 내용정리

**04/20 16:00 ~ 17:00  검색기능에서 반복문 조건에 맞지않아 제대로 수행되지않음 -> 수정필요 단일연결리스트 검색, 사이즈, 역순 구현 및 테스트**

- 검색 반복문 조건 변경 -> 검색 기능 구현완료
- 수정기능 구현 -> 이중리스트에서는 데이터를 문자열로 할 것. 
- 해당 값을 갖는 모든 데이터 수정->구현완료
- 사이즈 구하기 -> 구현완료
- 역순 -> 구현완료

**04/20 17:10 ~ 17:30 수정 역순 검색 기능 재 구현 및 md정리**

- 코드 md에 재 작성

## 수정

- 데이터 수정

- 수정하려는 노드 순서번호 및 데이터를 매개변수로 받는다. edit(리스트, 수정할 노드, 수정할 데이터) 노드 번호가 현재 노드보다 많거나 적으면 해당노드가 없다고 출력하기.

  ```c
  t_node *edit;
  edit = *head;
  while (edit != NULL)
  {
      if (edit->data == edit_data)
          edit->data = edit_data;
      edit = edit->next;
  }
  ```

  

## 검색

- 데이터 검색.
- 중복에 대한 처리
- 데이터를 찾고, 그 위치(주소)를 반환. =>  데이터 수정에 이용가능 edit(list, search(list, "data"), "수정할데이터"); 

```c
t_node *find;
find = *head;
while (find != NULL && find->data != find_data)
{
    find = find->next;
}
return (find);
```



## 크기구하기

- head노드부터 null일떄까지 size++하면서 return  int하도록.

## 역순

- https://hyerios.tistory.com/47

- head를 꼬리의 주소로하고, 이전 노드 next가 head를 가리키게 그 이전노드가 그 다음노드를 가리키게.

  ```c
  t_node *prev;
  t_node *next;
  t_node *curr;
  
  curr = *head;
  next = NULL;
  prev = NULL;
  while (curr != NULL)
  {
      next = curr->next;
      curr->next = prev;
      prev = curr;
      curr = curr->next;
  }
  *head = prev;
  return ;
  ```

  



