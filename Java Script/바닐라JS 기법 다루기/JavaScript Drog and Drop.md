# JavaScript Drog and Drop

---

- 드래그앤 드롭을 구현한다.

- 다른 부모로 이동시킬 수 있도록 한다.



### 1. draggable

태그의 속성에는 `draggable`이 있다. 이를 `true`로 하여 드래그할 수 있다.

```html
<div draggable='true'>
	sayhi
</div>
```



### 2. 드래그앤 드롭 핸들러 3가지

드래그앤 드롭을 구현하기 위해 다음 3가지 핸들러를 알아야한다.

1. `ondragstart` : 드래그된 아이템에 id부여, 드래그 상태에서 일어날 변화를 지정할 수 있다.
2. `ondragover` : 드롭 액션을 지정
3. `ondrop` : 드롭 행위가 일어남. **드래그된 아이템은 새로운 부모의 자식이 된다.**



```js
  <div class="drag-wrapper">
    <div class="drag-zone">
      <span id="item-1" class="item" draggable="true">드래그 아이템</span>
    </div>
    <div draggable="true" class="drop-zone">
      드랍 존
    </div>
  </div>    

const item = document.querySelector('span.item');
    const dropZone = document.querySelector('.dropZone');
    const dropWrapper = document.querySelector('.drag-wrapper');  

	dropWrapper.addEventListener('drop', e=>{
      console.log('ondrop')
      let data = e.dataTransfer.getData("Text");
      e.target.appendChild(document.getElementById(data));
    });

    dropWrapper.addEventListener('dragover', e=>{
      console.log('ondragOver')
      e.preventDefault();
    });

    item.addEventListener('dragstart', e=>{
      console.log('drag start')
      e.dataTransfer.setData("Text", e.target.id);
    });
```



- 기존에 `dropZone`에 개별적으로 이벤트를 등록했는데 이를 감싸는 래퍼에 하나의 이벤트만 등록해서 사용할 수 있도록 함.
- 드래그를 시작할 때 `dragStart`가 발생하며, 드래그를 내려놓기전 드래그존에 접근하면 `dragOver`가 계속 중첩되서 발생한다.
- 요소를 영역에 `drop`하면 해당 이벤트가 발생한다.



### 생각해야할 사항

- 드래그한 요소를 같은 위치에 드랍할 경우 

> index.html:38 Uncaught DOMException: Failed to execute 'appendChild' on 'Node': The new child element contains the parent.

해당 에러가 발생되는데, 드랍이벤트에 `append`하기전 `contain`으로 먼저 확인해야할 듯.



- `dragover`가 계속해서 발생하는 상황

  - 쓰로틀링 또는 디바운싱을 적용해야 할듯하다.

  