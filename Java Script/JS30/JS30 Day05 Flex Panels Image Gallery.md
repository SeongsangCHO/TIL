## JS30 Day05 Flex Panels Image Gallery



## 요구사항

- flexbox.io
- `display:flex`에 대해 학습
  - flex로 grid형태로 만들고 각 영역을 조정함으로써 애니메이션 추가
- `translateY` 로 애니메이션을 만듦
- JS로 각 패널을 클릭했을 때 toggle로 on, off

---

## 선수지식

- classList.toggle
- flex, justify-content, align-item

#### flex box

[참고](https://d2.naver.com/helloworld/8540176)

뷰포트, 요소의 크기가 불명확하거나 동적으로 변할 때 효율적으로 배치, 분산하는 레이아웃 방식

- flex container, item으로 구성된다.
- 정렬하려는 요소의 부모요소에 `display:flex`
- flex container 속성: `flex-direction`, `flex-wrap`, `justify-content`, `align-items`, `align-content`
- flex item 속성: `flex`, `flex-grow`, `flex-shrink`, `flex-basis`, `order`

- propetyName으로 transitionend 상태확인
- flex-grow

