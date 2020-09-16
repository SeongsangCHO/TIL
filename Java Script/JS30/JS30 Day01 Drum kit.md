## JS30 Day01 Drum kit



**keyCode는 deprecated. 대신 key를 사용함**



### 요구사항

- 9개의 키를 눌렀을 때 각 키에서 드럼 소리를 나도록 이벤트를 작성해라
- 연속으로 눌렀을 때 한번만 실행되지 않고 누른 숫자만큼 끊김없이 실행되도록해라
- 키 클릭시 눌른 키가 무엇인지 확인할 수 있도록 애니메이션추가
- 특정시간 이후 애니메이션이 사라지도록 작성



바닐라 JS로 각 키 버튼을 누를시 해당하는 사운드가 나오도록 작성한다.





keycode.info에서 해당하는 키코드를 확인한다.

`data-key` 65가 클릭되었을때 해당하는 audio가 출력되도록.

## 선수지식

[트랜지션에도 생명주기와 비슷한것이 존재](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/transitionend_event)

#### ---

### 1. dataset 속성

<br>

dataset속성은 비표준속성이다.

이런 비표준속성은 사용자가 지정한 데이터를 HTML to JS로 넘기거나, JS로 조작할 HTML요소를 표시하기 위해 사용한다.

```html
<div show-info="age"> //이렇게 사용.
```

그런데 이런 비표준이 나중에 속성으로 등록될 수 있음.

그래서 이런걸 방지하기 위한 `data-*`속성이 존재.

```html
<div data-key="65">
```

`data-*`속성은 커스텀데이터를 안전, 유효하게 전달해주는 역할을 한다.

---



### 2.querySelector

웹 페이지내에 원하는 요소 노드에 접근하는 방법.

#### 2. 1 요소에 id속성이 있을 때

- `document.getElementById(id)`를 이용해 접근

#### 2.2 CSS로 접근 id, class => querySelectorAll(css) ,querySelector

```html
<li class="chapter">2장</li>
  let chapter = document.querySelector('.chapter'); // LI

```

- CSS선택자에 대응하는 모든 요소를 배열로 반환 => forEach로 반복문적용
- selector은 주어진 CSS선택자중 첫 요소를 반환 == querySelectorAll()[0]

### 3. className, classList

<br>

class 같은 예약어는 객체의 프로퍼티가 될 수 없어서

`className`이 도입됨.

className에 무언가 대입하면 문자열 전체가 바뀌게 된다.

그런데 교집합과 같이 클래스를 추가하거나 제거해줄 수 있는 메소드가 `classList`에 존재한다.

```html
<div class="main">
...
<script>
  document.body.classList.add('article');
  
  alert(document.body.className)//main article
```

