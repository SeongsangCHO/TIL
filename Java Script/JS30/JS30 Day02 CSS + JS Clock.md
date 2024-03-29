## JS30 Day02 CSS + JS Clock



### 요구사항

- 시, 분, 초를 갖는 시계를 만들 것
- JS와 CSS만으로!

---

### 선수지식

<br>

#### CSS

- transform, rotate degree
- transform-origin ->
- transition 속성
- transition-timing-function

#### JS

- setInterval
- 현재시간을 반환할 Date 객체의 메소드들

<br>



### 1. transform?

- CSS animate하는데 많이 사용되는 속성
- 웹 요소의 위치를 이동하거나 크기 조절, 회전시킬 수있음.

- scale, rotate, translate, skew에 대해서 정리하겠음

<br>

#### 1.1 scale() X, Y축으로 확대 / 축소

- ```css
  transform:scaleX(x축 비율);
  tranform:scaleY(y축 비율);
  transform:scale(x, y축 비율);
  ```

  

<br>

#### 1.2 rotate() - 지정요소 회전

- 지정한 각도만큼 회전

- 양수는 시계, 음수는 반시계로 회전

- ```css
  transform:rotateX()
  transform:rotateY()
  transform:rotate(deg) //deg만큼 회전
  ```

<br>

#### 1.3 translate() 지정 요소 x, y축 이동

- 요소를 지정한 위치로 이동시킨다.

- ```css
  transform:translateX(px);
  transform:translateY(px);
  transform:translate(x, y px);
  ```

  

<br>

#### 1.4 skew() 지정 요소 x, y축으로 기울이기

- 요소를 기울이기

- ```css
  transform:skewX(deg);
  transform:skewY(deg);
  transform:skew(x deg, y deg);
  ```

  <br>

#### 1.5 transform-origin

- 지정 요소의 중심 기준점을 변경

- ```css
  tranform-origin: x축 y축;
  // px, %, left, center, right 중에서 사용가능
  ```

<br>

#### 1.6 transition 속성

- 한가지 상태에서 다른 상태로 변화하는 것을 부드럽게 표시
- 글꼴이 14px => 200px로 변화하는 것을 다음 네가지 속성으로 표현가능
- transition-property : 효과를 적용할 대상 지정 (none, all)
  - `transition-property: background-color;`
- transition-duration
  - `transition-duration : 3s;`
- transition-timing-function
  - 9가지 패턴존재[링크](https://m.blog.naver.com/PostView.nhn?blogId=skydoor2014&logNo=221149834262&proxyReferer=https:%2F%2Fwww.google.com%2F)
- transition-delay
  - 지연시켜 시작시킬 때 사용

<br>

#### 1.6 transition-time-function

- 트랜지션 효과가 진행되는 동안 속도 변화를 지정
- [참고링크](https://aboooks.tistory.com/383)

