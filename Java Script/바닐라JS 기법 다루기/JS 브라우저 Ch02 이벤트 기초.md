## JS 브라우저 Ch02

<br>

### 2.1 브라우저 이벤트 소개

**마우스 이벤트:**

- `click` – 요소 위에서 마우스 왼쪽 버튼을 눌렀을 때(터치스크린이 있는 장치에선 탭 했을 때) 발생합니다.
- `contextmenu` – 요소 위에서 마우스 오른쪽 버튼을 눌렀을 때 발생합니다.
- `mouseover`와 `mouseout` – 마우스 커서를 요소 위로 움직였을 때, 커서가 요소 밖으로 움직였을 때 발생합니다.
- `mousedown`과 `mouseup` – 요소 위에서 마우스 왼쪽 버튼을 누르고 있을 때, 마우스 버튼을 뗄 때 발생합니다.
- `mousemove` – 마우스를 움직일 때 발생합니다.

**폼 요소 이벤트:**

- `submit` – 사용자가 `<form>`을 제출할 때 발생합니다.
- `focus` – 사용자가 `<input>`과 같은 요소에 포커스 할 때 발생합니다.

**키보드 이벤트:**

- `keydown`과 `keyup` – 사용자가 키보드 버튼을 누르거나 뗄 때 발생합니다.

**문서 이벤트:**

- `DOMContentLoaded` – HTML이 전부 로드 및 처리되어 DOM 생성이 완료되었을 때 발생합니다.

**CSS 이벤트:**

- `transitionend` – CSS 애니메이션이 종료되었을 때 발생합니다.





#### 이벤트 핸들러

이벤트가 발생했을 때 실행되는 **함수**인 **핸들러**를 할당해야 이벤트에 반응할 수 있음

- HTML에서 핸들러 할당
  - `<input id="elem" onclick="alert(this.innerHTML)">`
  - `this`는 `input`이므로 해당 콘텐츠가 얼럿창에 출력됨.
- DOM 프로퍼티
  - `<script> elem.onclick = function() {...};`
- `setAttribute`로 핸들러 할당하지 말것. 속성은 항상 문자열이기 때문에, 함수가 문자열이 됨

<br>

#### addEventListener

복수의 핸들러를 할당하기 위한 메소드

`element.addEventListener(event, handler, [options]);`

`removeEventListener`으로 핸들러 삭제

<br>

#### 이벤트 객체

이벤트가 발생한 객체

```
elem.onclick = function(e){
	e.type -> click이 된 객체 타입
	e.currentTarget -> 발생한 위치
	e.clientX -> 좌표
	e.clientY -> 좌표
}
```

```javascript
<script>
  let obj = {
    handleEvent(event) {
      alert(event.type + " 이벤트가 " + event.currentTarget + "에서 발생했습니다.");
    }
  };

  elem.addEventListener('click', obj);
</script>
```

- `addEventListener` -> 인수를 객체로 받거나 클래스로 받을 수 있음.

---

<br>

### 2.2 버블링과 캡쳐링



- 이벤트는 `document`부터 시작해 `DOM`트리를 따라 `event.target`까지 내려감. 이벤트는 트리를 따라 내려가면서 `addEventListenter`로 할당한 핸들러를 동작시킴.
  - 핸들러가 호출되고 `event.target`부터 시작해 최상위 노드까지 전달되며ㅕ `on<event`, `addEventListenter`로 할당한 핸들러를 동작시킴.

- `이벤트 버블링` : 특정 화면요소에서 이벤트 발생시 상위 요소들로 전달되어가는 특성
- `이벤트 캡쳐링` : 상위에서 하위로 탐색하며 이벤트 전파
- `event.target`: 이벤트가 발생한 요소
- `event.currentTarget` : 이벤트가 버블링되어진 상위 요소

<br>

#### 버블링 중단

- `event.stopPropagagtion()`을 사용하면 버블링이 중단되나 버블링을 막아야하는 경우는 거의없음. -=> 커스텀 이벤트 등을 통해 문제해결할 수 있음

---

<br>

### 2.3 이벤트 위임(event delegation)

캡쳐링과 버블링을 활용한 이벤트 핸들링 패턴

To-do를 만들 때 아래와 같이 구현한다면 이벤트 리슨를 각각 item에 대해 등록해야한다.

```html
<ul id ="todo-app">
    <li class="item"> 밥</li>
	<li class="item"> 잠</li>
</ul>
```



`item.forEach('click', function({...}))` 이런 형태로 각 `li`마다 하나의 이벤트를 붙인다. 

그런데 이 `li`가 10000000개 이상되면 이벤트도 그 갯수에 맞춰서 붙이면 매우 비효율적이다.

따라서 모든 리스트에 대해 하나의 이벤트 리스너를 생성해 `전체 영역`에 등록하는 것이 효율적임. 이것이 `이벤트 위`

<br>

#### 이벤트 위임 구현

이벤트 버블링

```javascript
let app = document.getElementById('todo-app');

app.addEventListener('click', function(e){
    if (e.target && e.target.nodeName === 'LI'){
        let item = e.target;
        //동작
    }
});
```

<br>

#### 이벤트 위임 활용

저장 ,불러오기, 검색하기 등의 버튼을 구현할 때 각 버튼의 메서드를 연결하는것보다 메뉴 전체의 하나의 핸들러를 추가하고 각 버튼에 `data-action`속성에 호출할 메서드를 할당해 주는 방법이 있음!

`<button data-action="save"> 저장하기</button>`



---

<br>

### 2.4 브라우저 기본동작

상당수의 이벤트는 발생 즉시 브라우저에 의한 동작을 자동으로 수행함

`onclick="return false"` 를 통해 막을수있거나

`onclick="event.preventDefault"`로 막을 수 있음



<br>

##### addEventListener의 passive 옵션

- `passive : true`옵션은 브라우저에게 `preventDefault()`를 호출하지 않겠다고 하는 역할
  - 모바일에서 손가락을 대는 `touchmove`이벤트를 `preventDefault()`로 막을 수 있음
  - `preventDefault()`로 스크롤링을 더이상 막지않는 단계로 들어서면 스크롤링을 풀어줌으로써 자연스럽게 스크롤링할 수 있게만듬

## [event.defaultPrevented](https://ko.javascript.info/default-browser-action#ref-445)

기본 동작을 막은 경우는 `event.defaultPrevented` 값이 `true` 이고, 그렇지 않은 경우는 `false` 입니다.

버블링을 `stopPropagation()`으로 막으면 안되는 이유는 통계 자료수집등과같은 코드가 동작할 수 없기 때문임.

 `stopPropagation()`으로 의도치않은 문제를 발생시키는 것보다 기본동작을 막고,`document`핸들러에서 기본 동작이 막혔는지 확인하는 코드를 작성하면 됨.



----

<br>

### 2.5 커스텀 이벤트 디스패치

event 이벤트를 생성할 수 있다.

```javascript
let event = new Event(type[, options]);
```

- `type` : `click`이나 커스텀이벤트를 작성할 수 있음
- `option` : 버블링, 기본동작의 실행여부를 명시



##### dispatchEvent

- 생성한 `event`객체를 실행시켜줌
- `elem.dispatchEvent(event)`

---

