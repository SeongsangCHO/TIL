# Drag n Drop 기능 구현하기 + 애니메이션

---



# Drag Event



HTML Tag에 `draggable` 속성을 주면 해당 요소를 드래깅할 수 있다.

```html
<div draggable>농담곰</div>
```



웹 API에서 지원되는 Events는 다음과 같다.

| Drag Event  | 이벤트 설명                                              |
| ----------- | -------------------------------------------------------- |
| onDrag      | Item을 잡았을 때 발생                                    |
| onDragEnter | 잡은 Item이 다른 Item이랑 겹쳤을 때 발생<겹쳐졌을 때>    |
| onDragLeave | 잡은 Item이 다른 Item을 떠났을 때 발생<겹쳐짐 풀림>      |
| onDragOver  | 잡은 Item이 다른 Item과 겹쳐졌을 때 milli sec마다 발생함 |
| onDragStart | Item을 잡기 시작했을 때 발생                             |
| onDrop      | 잡은 Item을 적절한 곳에 놓았을 때 발생                   |
| onDragEnd   | 잡은 Item을 놓았을 때 발생                               |

이 중에서 내가 DnD를 구현하기 위해 사용했던 이벤트는 다음과 같다.

- onDragStart
- onDragEnter
- onDragEnd
- onDragOver - prevent로 발생 막음
- onDragLeave







## 1. 기능 구현

먼저 나는 Drag데이터를 "어디에" 놓을 것인지 시각적으로 보여주고 싶었다.

예를들어 Drag한 데이터를 Target(겹친데이터)과 1:1로 바꾸는게 아니라 Target의 위 또는 아래 영역으로 놓는 기능을 구현하기로 했다.

따라서 Target과 단순히 자리를 바꾸는 것이 아니라 위, 또는 아래를 확인해 그 자리에 끼워 넣어야한다.

내가 생각한 아이디어는 다음과 같다.

![IMG_E71D899AB022-1](https://user-images.githubusercontent.com/55486644/131205645-b6deded4-3f32-4eb1-bce9-597e06575d0c.jpeg)

다음과 같은 데이터가 있다고 하자.

[할일작성, 바게뜨사기, gif만들기 , 파스타 만들어먹기 ,,,]

여기서 할일 데이터를 잡아다가 바게뜨 "아래에" 넣는다.

그렇다면 데이터는 바뀐 다음과 같을 것이다.

[ 바게뜨사기, gif만들기, 할일작성, 파스타 만들어먹기,  ,,,]

단순히 자리를 바꾸는 것이 아닌, 놓인 곳 사이에 껴있어야 했다.

따라서 위의 형태로 만들기 위해 겹쳐진 대상의 index를 사용해 데이터의 위치를 변경하는 함수를 작성해야했다.



### 1.0 Drag된 Item의 Index, 겹쳐진 Item의 Index 구하기

위 사진대로 구현하기 위해서 먼저 Drag item의 index 그리고 현재 Drag Item과 겹쳐진 Item의 index를 구해야했다.

사진으로 보자면 초록색 표시의 할일(drag), gif(겹쳐진)이 이 대상이다.

이 두가지의 Index는 `useRef`와 `Drag Event`를 사용하면 쉽게 구할 수 있다.

(코드에 저장한 값은 id로, 배열형태에서 해당하는 index를 찾기위해 findIndex함수를 사용해서 index구했음)

```js
const onDragStart = (e: React.DragEvent<HTMLElement>): void => {
  e.dataTransfer.effectAllowed = 'move';
  setDragItemId.grabItem(todo.id);
};
```

- `onDragStart`에서 Drag Item index를 잡았다.

```js
const onDragEnter = (e: React.DragEvent<HTMLElement>): void => {
...
 	setDragItemId.interSectItem(todo.id);
...
};
```

- `onDragEnter`에서 겹쳐진 Item Index를 잡았다.



이제 이 둘을 사용해 데이터 위치를 변경하는 함수를 작성해보자.



### 1.1 데이터 변경함수 작성

우리가 만들 TodoList의 데이터 형식은 Index형태로 순서대로 출력되기에 Index를 사용해 데이터를 변경하였다.

[할일작성, **바게뜨사기**, gif만들기 , 파스타 만들어먹기 ,,,]

해당 데이터에서 바게뜨사기를 "뽑아서" 파스타 만들어먹기의 뒤에 "삽입"하는 기능을 작성해야한다.

그러기 위해서 index를 알아야하는데 우리가 저장한 값은 데이터의 id값이다.

따라서 id값을 사용해 데이터의 index를 얻기 위해 해당 함수를 통해 index를 구했다.

```js
export const getElementIndex = (todoData: ITodo[], id: number): number => {
  return todoData.findIndex((todo) => todo.id === id);
};
const setDragItemId = {
    grabItem: (id: number): void => {
      clickElId.current = getElementIndex(data, id);
    },
    interSectItem: (id: number): void => {
      interSectElId.current = getElementIndex(data, id);
    },
  };
```

반환된 index를 사용해 데이터를 변경하는 함수를 작성했다.

```js
const sortStateData = (): ITodo[] => {
  const updateData = [...data];
  const clickedItemData = updateData[clickElId.current];
  updateData.splice(clickElId.current, 1);
  updateData.splice(interSectElId.current, 0, clickedItemData);
  return updateData;
};
const switchData = (): void => {
  dispatch(setTodos(sortStateData()));
};
```

- `clickedItemData` : Drag한 Item의 값
- `updateData` : 변경될 데이터
- `interSectElId.current` : Drag Item과 겹쳐진 Index



첫번째 splice를 통해 Drag한 데이터가 뽑히고

- [할일작성,**(뽑힘)**, gif만들기 , 파스타 만들어먹기,]

두번째 splice를 통해  updateData에 Drag한 Item이 배열에 추가된다.

- [할일작성,  gif만들기 , 파스타 만들어먹기 , **바게뜨사기 (추가)**]

결과는 다음과 같다.

![1](https://user-images.githubusercontent.com/55486644/131205928-f82554da-a313-4e5a-b08e-f9a332697b1b.gif)





> 이렇게 할 필요없이 `map` 돌릴 때 index를 props로 넘겨주었으면 되,,지않나 ?

## 2. 애니메이션

밀리는 느낌을 주어야했다.

고려해야할 사항은 두가지였다.

1. 위쪽에서 데이터를 잡아 아래쪽으로 넣을 때 아래쪽의 데이터들은 아래로 밀려야한다.
2. 아래쪽에서 위로 넣을 때 위쪽 데이터는 위로 밀려야한다.



원하는 효과를 주기위해선 먼저, Drag데이터보다 넣어질 곳의 Index가 큰지, 작은지를 비교해야했다.

![IMG_F0CDFC908CD1-1](https://user-images.githubusercontent.com/55486644/131206339-c8489482-e5a6-4d60-87fc-2e520a900b3b.jpeg)

- Clicked(Drag) < interSect라면 겹쳐진 대상아래의 영역을 공백으로 넓혀서 들어갈 공간을 시각적으로 보여준다.

- Clicked(Drag) > interSect라면 겹쳐진 대상의 위 영역을 공백으로 넓혀서 들어갈 공간을 시각적으로 보여준다.



코드로 보자

```js
const moveUpAndDownClassName = (): string => {
  if (clickElId.current! < interSectElId.current!) {
    return 'move_up';
  } else if (clickElId.current! > interSectElId.current!) return 'move_down';
  return '';
};
```

- 인덱스를 비교해서 들어갈 className을 반환하는 함수

```js
const onDragEnter = (e: React.DragEvent<HTMLElement>): void => {
  const moveClassName = moveUpAndDownClassName();
  if (lastLeaveTarget.current)
    lastLeaveTarget.current!.classList.remove('move_down');
  const $target = e.target as HTMLElement;
  setDragItemId.interSectItem(todo.id);
  if (clickElId.current !== interSectElId.current && moveClassName)
    $target.classList.add(moveClassName);
  lastLeaveTarget.current = $target;
};
```

- 대상과 겹쳐졌을 때 들어갈 공간을 보여주기 위한 class를 적용하는 기능

```js
const onDragEnd = (e: React.DragEvent<HTMLElement>): void => {
  const $target = e.target as HTMLElement;
  $target.classList.remove('move_up');
  $target.classList.remove('move_down');
  if (lastLeaveTarget.current) {
    lastLeaveTarget.current!.classList.remove('move_up');
    lastLeaveTarget.current!.classList.remove('move_down');
  }
  switchData();
};
const onDragLeave = (e: React.DragEvent<HTMLElement>): void => {
  const $target = e.target as HTMLElement;
  $target.classList.remove('move_up');
};
```

- 드래그를 놓았을 때 class를 정리하는 함수



여기서 주의해야할 것은 `lastLeaveTarget`다.

이를 추가한 이유는 요소와 겹쳐질 때마다 classname을 주어서 다음 이벤트때에 이전에 className이 남아있어서 애니메이션이 뒤엉켜 발생해 마지막으로 겹쳐진 tag의 class를 초기화해주기 위해서 넣었다.

따라서 맨 밑에서 맨위로, 맨위에서 맨 밑으로 drag Item이 이동되면서, move_up, down class가 선택적으로 들어가게 되는데 intersect가 종료된 item의 classname을 지워준다라고 생각하면 된다.



### 결과



![2](https://user-images.githubusercontent.com/55486644/131208148-b477c95b-c98f-4161-b106-aa0660fc38bf.gif)









