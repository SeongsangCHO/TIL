## JS 브라우저 Ch04 Form, controls



### 4-2Focusing: focus / blur

클릭 또는 탭키를 했을 때 요소에 대한 포커스가 올라간다.

포커스를 잃을 때 `BLUR`하는 방법에 대해 알아본다

<br>

#### Events focus / blur

`element.onblur = function(){...}` : 포커스를 잃었을 때

`element.onfocus = function(){...}` : 포커스가 올라갔을 때 수행 

`element.focus()` : 포커스 설정

`element.blur()` : 포커스 설정 해제



`tabindex="0"` : tab했을 때 포커스 우선순위

#### 포커스 위임

`<form onfocus="this.className='focused'">`

- `.focused { css }` : 포커스되었을때 css

<br>

### 4-3 Event: change, input, cut, copy, paste

데이터가 변경될 때 실행되는 다양한 이벤트

<br>

#### Change

요소 변경이 **끝나면** 실행되는 이벤트

텍스트 입력요소에는 포커스를 잃을 때 이벤트 발생.

<br>

#### input

사용자가 값을 수정할 때마다 발생

`input.oninput = function(){...}` :입력할 때마다 실행됨

그 무엇도 막을 수 없는 함수..

<br>

#### cut, copy, paste

`잘라내기, 복사, 붙여넣기를 할 때 수행되는 이벤트`





### 4-4 Forms: event and method submit



