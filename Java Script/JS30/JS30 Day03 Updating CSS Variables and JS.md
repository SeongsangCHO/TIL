## JS30 Day03 Updating CSS Variables and JS



### 요구사항

- sass
- 자바스크립트를 이용해서 CSS를 변경한다.
- sass을 사용한다 -> CSS 변수
- input으로 통해 선택된 value값을 px가 붙은 값으로 CSS스타일을 지정해주어야 하므로 `suffix`를 추가해주어야한다.
- RGB값은 px가 필요없으므로 `data-sizing`을 지정해주지 않음. 값이 없다면 undefined가 되므로 ' '공백으로 처리하도록해야함

---

### 선수지식

- `this.dataset`=>`data-*`으로 지정된 속성들을 보여줌

- CSS에도 scope가 있음. 전역으로 선언해도 자식은 부모 -> 상위로 올라가면서 style이 먹음

<br>



#### CSS에서 변수사용법

**HTML 어디에서나 변수에 접근하도록 선언**

- `:root`는 가상 선택자. `html`보다도 우선순위가 높다.
  - **전역스코프의 CSS변수**를 선언할 때 사용
  - 변수는 `var(변수명)`으로 접근할 수 있다.

```css
:root{
	--main-color : brown;
}
p {
    color : var(--main-color); 
}
```



#### Sass (SCSS)

Syntactically Awesome Style Sheet

전처리기(Sass)로 작성해 CSS로 컴파일해서 동작시키는 것

선택자의 중첩, 조건, 반복, 단위연산 등 CSS보다 많은 기능을 편리하게 작성할 수 있다.

CSS의 Superset





```javascript
function handleUpdate() {
  //data-으로 정해진 것들의 집합 = dataset
  const suffix = this.dataset.sizing || '';
  //:root의 값을 변경해주면, 그를 따르는 img의 값들도 변함
  document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix);
  
    
    inputList.forEach((input) => {
  input.addEventListener("change", handleUpdate);
  input.addEventListener("mousemove", handleUpdate);
});

```

- `document.documentElement` : document의 루트요소인 element를 리턴 => `<html>` 
- `setProperty()` : css속성을 재할당 시키는데 사용
- `change, mousemove` : change는 최종 변화만 기록함. 마우스를 따라가면서 값이 변해야하기 떄문에 `mousemove` 이벤트리스너도 추가함.

