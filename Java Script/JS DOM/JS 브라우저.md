## JS 브라우저



## 1장

## 1-8 스타일과 클래스



### getComputedStyle로 계산된 스타일 얻기

- 요소의 크기, 마진, 색을 알고싶을 때 사용

- ```
  getComputedStyle(element, [pseudo])
  ```

- element : 값을 읽을 요소

- pseudo : `::before`와 같이 필요한 경우 명시, 빈칸은 요소 자체를 의미

- ```html
   <style> body { color: red; margin: 5px } </style>
   <script>
   	let computedStyle = getComputedStyle(document.body);
   	alert(computedStyle.marginTop); //5px
  ```

- `paddingLeft, marginTop`등과 같이 프로퍼티 이름 전체를 정확히 작성해주어야함.

<br>



---



## 1-.9 요소 사이즈와 스크롤

## [scrollWidth와 scrollHeight](https://ko.javascript.info/size-and-scroll#ref-378)

`scrollWidth`와 `scrollHeight` 프로퍼티는 `clientWidth`와 `clientHeight` 유사한데, 스크롤바에 의해 감춰져 있는 숨겨진 영역도 포함한다는 점에서 차이가 있습니다.

## [scrollLeft와 scrollTop](https://ko.javascript.info/size-and-scroll#ref-379)

`scrollLeft`와 `scrollTop` 프로퍼티는 수평 스크롤이 오른쪽, 수직 스크롤이 아래로 움직임에 따라 가려진 영역의 너비와 높이를 나타냅니다.



#### CSS로 너비, 높이를 얻지마세요

- width, height가 auto, box-sizing이 되어있는 상태이면 얻어진 값이 부정확할 수 있기 때문에 `clientWidth, Height`로 크기를 잰다!



##### 과제 1

- scrollTop는 스크롤을 했을 때 넘겨진 윗 부분에 해당하는 높이이다. 그럼 scrollBottom은 어떻게 계산할까?

- ```javascript
  let scrollBottom = elem.scrollHeight - elem.scrollTop - elem.clientHeight;
  ```

- 전체길이 - (스크롤된 윗 부분 + 본문 내용)

---

## 1-10 Window sizes and scrolling

---

## 1-11 Coordinates

---



## 2장

