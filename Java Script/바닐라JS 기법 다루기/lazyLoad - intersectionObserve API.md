# IntersectionObserver API

---

> 무한 스크롤, 레이지로드할 때 사용하는 API

뷰포트 또는 특정 요소사이에 교차를 감지하기 위해 사용한다.

### IntersectionObserver

> JS API
>
> [docs](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)

무한 스크롤을 구현할 때 많이 쓰는 것 같음.

element가 viewport, 다른 엘리먼트와의 관계에서 보일지, 안보일지를 정하는 API

- callback : 관측 대상이

   

  ```
  threshold
  ```

   

  만큼 보일 때 호출되는 함수

  - 관측대상을 ref로 정함

- root : 대상이 보임을 확인하기 위한 뷰포트로 사용되는 요소. 관측대상의 조상이어야함

  - 문서 내 스크롤이 가능한 요소 내에 관측대상이 있으면 root가 그 요소로 가게됨 => 관측대상이 스크롤가능한 조상에 있는지, 그 조상이 root인지 정함

- rootMargin : root요소를 감싸는 마진이 들어감

- threshold : 관측 대상이 root와 몇 % 교차했을 때 `callback` 실행할지를 결정하는 값. 요소가 10%보일때 콜백을 수행한다면 해당 값은 0.1

### 사용방법

1. 먼저 관찰자를 생성한다

2. 관찰자 생성자에 콜백과 옵션을 담는다.

3. 관찰할 요소를 타겟으로 지정한다(관찰 시작)

4. 관찰 대상에 대해 교차점을 확인하고 액션을 수행한다.

5. 액션수행 후 옵저버 해제

   



### 관찰자 생성

```js
function createObserver() {
  let observer;

  let options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.0 ~ 1.0(교차 비율)
  };

  observer = new IntersectionObserver(handleIntersect, options);
  observer.observe(boxElement);
}

// 교차 핸들러
function handleIntersect(entries, observer) {
  entries.forEach((entry) => {
    //DOM = entry.target으로 지정하면 해당 요소 관찰
    if (entry.intersectionRatio > prevRatio) {
      entry.target.style.backgroundColor = increasingColor.replace("ratio", entry.intersectionRatio);
    } else {
      entry.target.style.backgroundColor = decreasingColor.replace("ratio", entry.intersectionRatio);
    }

    prevRatio = entry.intersectionRatio;
  });
}
```





## 구현

```js
  observerHandler(entries, observer) {
    entries.forEach((entry) => {
      console.log(this);
      
      if (entry.isIntersecting) {
        console.log("print");
        const image = entry.target;
        const src = image.dataset.src; // img 태그의 data-lazy에 저장해둔 이미지 경로를 붙여준다.
        image.setAttribute("src", src);
        image.removeAttribute("data-src");
        observer.unobserve(entry.target);
      }
    }, {
      rootMargin: '1px 1px 1px 1px',
      thresholds: [0.7],
    });
  }

lazyLoadHandler() {
    this.lazyImages = Array.prototype.slice.call(
      document.body.querySelectorAll(".image")
    );

    this.intersectionObserver = new IntersectionObserver(this.observerHandler.bind(this), this.options);

    this.lazyImages.forEach((item) => this.intersectionObserver.observe(item));
  }
```

- 옵저버 객체를 생성한다. 인자로는 콜백, 옵션을 지정한다.
  - 콜백을 바로 작성하면 옵션이 등록되지 않는다.? => WHY?
- 관찰할 대상을 `.observe()`로 등록한다
- 콜백을 작성한다. `entries`는 옵저버로 등록된 각 영역의 정보들을 갖고 있는 배열로서, 뷰포트를 계산해 해당 영역이 안에 들어왔는지는 isIntersection, is...Ratio 등으로 확인할 수 있다.
- 영역안에 들어왔는지에 대한 조건문으로 들어오면 `data-*`로 지정한 값을 `src`로 할당하여 이미지를 로드시킨다.
- 그 후 옵저버를 제거한다.



> 이슈 : 콜백을 바로 작성했을 때 옵션도 안들어가고 entry에 대한 교차가 전부 true라서 전혀 작동하지 않았었음.
>
> 콜백을 따로 나누고 인자로 전달해줘서 해결함.
>
> 왜 안되는지는 ..?



### 참고

- [인터섹션옵저버 설명 주로 참고](https://heropy.blog/2019/10/27/intersection-observer/)

- [인터섹션옵저버 설명2](http://blog.hyeyoonjung.com/2019/01/09/intersectionobserver-tutorial/)
- 