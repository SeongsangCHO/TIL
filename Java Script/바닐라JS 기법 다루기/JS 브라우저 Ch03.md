## JS 브라우저 Ch03

<br>

### 3.1 마우스 이벤트

## 마우스 이벤트 종류

- `mousedown·mouseup`

  요소 위에서 마우스 왼쪽 버튼을 누를 때, 마우스 버튼 누르고 있다가 뗄 때 발생합니다.

- `mouseover·mouseout`

  마우스 커서가 요소 바깥에 있다가 요소 안으로 움직일 때, 커서가 요소 위에 있다가 요소 밖으로 움직일 때 발생합니다.

- `mousemove`

  마우스를 움직일 때 발생합니다.

- `click`

  마우스 왼쪽 버튼을 사용해 동일한 요소 위에서 `mousedown` 이벤트와 `mouseup` 이벤트를 연달아 발생시킬 때 실행됩니다.

- `dblclick`

  동일한 요소 위에서 마우스 왼쪽 버튼을 빠르게 클릭할 때 발생합니다. 요즘엔 잘 쓰이지 않습니다.

- `contextmenu`

  마우스 오른쪽 버튼을 눌렀을 때 발생합니다. 참고로 특별한 단축키를 눌러도 마우스 오른쪽 버튼을 눌렀을 때처럼 컨텍스트 메뉴가 나타나게 할 수는 있지만 `contextmenu`라는 마우스 이벤트와 동일하진 않습니다.



<br>

### 마우스 이벤트 순서

마우스 클릭하면 `mousedown`, `mouseuup`, `click`이벤트가 발생한다.

<br>

## [clientX, clientY와 pageX, pageY](https://ko.javascript.info/mouse-events-basics#ref-544)

- `clientX, Y` : 웹 문서 기준 왼쪽, 위에서 얼마나 떨어져있는지를 나타냄. 스크롤되어도 변하지 않음
- `pageX, Y` 창 왼쪽 위 기준으로 스크롤하면 값이 변함
- 

<br>

---