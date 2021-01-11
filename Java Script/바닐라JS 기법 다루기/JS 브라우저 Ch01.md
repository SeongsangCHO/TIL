## JS 브라우저

<br>

## 1장

<br>

## 1-8 스타일과 클래스



<br>

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

<br>

## [scrollWidth와 scrollHeight](https://ko.javascript.info/size-and-scroll#ref-378)

`scrollWidth`와 `scrollHeight` 프로퍼티는 `clientWidth`와 `clientHeight` 유사한데, 스크롤바에 의해 감춰져 있는 숨겨진 영역도 포함한다는 점에서 차이가 있습니다.

<br>

## [scrollLeft와 scrollTop](https://ko.javascript.info/size-and-scroll#ref-379)

`scrollLeft`와 `scrollTop` 프로퍼티는 수평 스크롤이 오른쪽, 수직 스크롤이 아래로 움직임에 따라 가려진 영역의 너비와 높이를 나타냅니다.

<br>

#### CSS로 너비, 높이를 얻지마세요

- width, height가 auto, box-sizing이 되어있는 상태이면 얻어진 값이 부정확할 수 있기 때문에 `clientWidth, Height`로 크기를 잰다!

<br>

##### 과제 1

- scrollTop는 스크롤을 했을 때 넘겨진 윗 부분에 해당하는 높이이다. 그럼 scrollBottom은 어떻게 계산할까?

- ```javascript
  let scrollBottom = elem.scrollHeight - elem.scrollTop - elem.clientHeight;
  ```

- 전체길이 - (스크롤된 윗 부분 + 본문 내용)

<br>

---

## 1-10 Window sizes and scrolling

<br>

##### 스크롤된 부분을 포함한 전체 너비와 높이를 얻기 위한 방법

- `document.documentElement.clienHeight, Width` - 현재  브라우저의 높이, 너비를 구한다.

- `window.innerWidth ` vs `document.documentElement.clientWidth`
  - 전자는 스크롤바까지 포함한 너비,높이이다.
  - 전자는 브라우저 창(검색바, 탭바를 제외한)의 크기를 리턴한다
  - 전체 브라우저창(검색, 탭을 포함한)의 크기를 리턴할 땐, `outerWidth, Height`를 사용한다.



<br>

#### 요소의 Height, Width 



<br>

##### offsetHeight, Width

- padding +  border  + scrollBar 사이즈들을 포함한 값들을 리턴한다. 
- ![image](https://user-images.githubusercontent.com/55486644/93551745-9acae980-f9a9-11ea-88b6-dbb7c9ff0282.png)



<br>



##### clientHeight, Width

- 실제 보여지는 컨텐츠의 얼만큼의 공간을 차지하고 있는지 확인하기 위해서 사용한다.
- border + scrollBar 를 제외한 실제 요소 크기를 리턴(패딩 포함)

![image](https://user-images.githubusercontent.com/55486644/93551826-c8179780-f9a9-11ea-9038-462c5900edf0.png)

<br>



##### scrollHeight, Width

- 보여지는 것과 상관없이 실제 컨텐츠의 영역크기를 리턴한다.
- 숨겨진 영역까지 포함한 크기를 반환

![image](https://user-images.githubusercontent.com/55486644/93551791-b59d5e00-f9a9-11ea-9372-94257688d5ad.png)

<br>



##### 현재 scroll위치를 얻고 싶어!

- `window.pageXOffset/ pageYOffset`으로 X, Y축 스크롤 위치를 얻을 수 있음



##### 스크롤 위치를 옮기고 싶어

- `window.scrollBy(x, y)` : x, y은 현 위치에서 스크롤을 x, y 픽셀만큼 이동시킨다.
- `window.scrollTo(0, 0)` : 스크롤을 맨 처음으로 이동시킨다.
- `elem.scrollIntoView(top)` :  스크롤하여 `elem`을 표시하는 방법
  - top가 true이면, 해당 `elem`을 맨 상단에 위치하도록 스크롤을 내린다.
  - false면 해당 `elem`을 맨 아래에 위치시키도록 스크롤을 올린다.

---

## 1-11 Coordinates

<br>

---

<br>