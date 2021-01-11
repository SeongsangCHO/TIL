# LazyLoad, 디바운싱, 쓰로틀링

---



웹 페이지를 열 때 `img`태그의 src속성은 현재 뷰 포트가 어디있건간에 이미지소스를 다운로드받는다.

만약 몇천 몇만의 이미지태그가 있으면 이를 다 다운받을 때까지 엄청난 시간이 들 것이다.(사용자가 보고있지 않아도.)

따라서 이런 리소스낭비를 줄이기 위해 등장한 것이 레이지로드이다.



예시로는 

유투브에서 스크롤링할 때  썸네일에 해당하는 부분이 회색으로 가려져있다.

무한스크롤이 적용된 사이트에서 스크롤할 때 로딩창이 생기면서 이미지를 불러온다.

모든 리소스를 받지않고 그때그때 받아오는 것 이 때 사용되는 것이 이 개념이다.



레이지로딩은 스크롤 애니메이션을 통해 구현한다.

이 때 스크롤 이벤트는 모든 이미지가 로딩이되면 종료되어야한다.

스크롤이벤트는 리소스를 매우 많이 잡아먹으므로 [디바운싱, 쓰로틀링](https://webclub.tistory.com/607)기법으로 이 낭비를 줄일 수 있다.

그리고 src속성을 사용하지 않고 다른 속성`data-src`에 경로를 저장해두고 해당 뷰포트에 진입하면 src속성에 해당 경로를 부여함으로써 로딩시킬 수 있다.



##### 구현 방법에는 3가지. 이번엔 이벤트 핸들러로 구현해볼 것.

- [IntersectionObserver API](https://krpeppermint100.medium.com/js-%EB%A0%88%EC%9D%B4%EC%A7%80-%EB%A1%9C%EB%94%A9-%EA%B8%B0%EB%B2%95-5e3d5dfcb4c1)

- [라이브러리](https://www.codingfactory.net/11943) 
- [이벤트핸들러](https://blog.naver.com/dilrong/221544559266)





### 이미지 API 사이트, 이미지 불러오기

레이지로딩을 구현하기 위해서 먼저 이미지소스가 필요하다.

이미지 소스 및 여러 더미데이터 api제공하는 [예제사이트](https://dummyapi.io/documentation/static-data-api)에서 데이터를 불러온다

```js
class Lazyload {
  API_URL = "https://dummyapi.io/data/api";
  APP_KEY = "5ff574fb2b98d0966946eb3a";
  // https://img.dummyapi.io/photo-1564694202779-bc908c327862.jpg
  constructor($target) {
    this.$target = $target;
    this.$imageWrapper = document.createElement("div");
    this.$imageWrapper.className = "wrapper";
    this.data = [];
    this.imageAPI();
    // this.bindEvent();
  }
  }
  async imageAPI() {
    const response = await fetch(this.API_URL + "/post", {
      headers: { "app-id": this.APP_KEY },
      method: "GET",
    }).then((result) => result.json());
    await this.render(response.data);
  }
 
}
new Lazyload(document.querySelector("#App"));

```





### 이미지 표시 및 스크롤이벤트 등록

```js
class Lazyload {
  API_URL = "https://dummyapi.io/data/api";
  APP_KEY = "5ff574fb2b98d0966946eb3a";
  // https://img.dummyapi.io/photo-1564694202779-bc908c327862.jpg
  constructor($target) {
    this.$target = $target;
    this.$imageWrapper = document.createElement("div");
    this.$imageWrapper.className = "wrapper";
    this.data = [];
    this.imageAPI();
    // this.bindEvent();
  }

  lazyLoadHandler() {
      let lazyImages = Array.prototype.slice.call(document.body.querySelectorAll('.image'));

      const lazyLoad = () =>{
        lazyImages.forEach((image,index)=> {
          console.log(index, image.getBoundingClientRect().top);
          
        });
      }
      document.addEventListener("scroll", lazyLoad);
      window.addEventListener("resize", lazyLoad);
      window.addEventListener("orientationchange", lazyLoad);
  }
  async imageAPI() {
    const response = await fetch(this.API_URL + "/post", {
      headers: { "app-id": this.APP_KEY },
      method: "GET",
    }).then((result) => result.json());
    await this.render(response.data);
    this.lazyLoadHandler();
  }
  render(response) {
    this.$target.appendChild(this.$imageWrapper);
    this.$target.innerHTML = response.map((data) => {
      return `
      <img class="image" src=${data.image}></img>
      <img class="image" src=${data.image}></img>`;
    });
    this.data = document.querySelectorAll(".image");
  }
}
new Lazyload(document.querySelector("#App"));

```

이미지를 불러오고 이미지 로딩이 완료되었으면 `lazyLoadHandler` 를 호출해 레이지로드를 처리한다.

`getBoundingClientRect().top`는 브라우저의 꼭대기 지점기준으로 각 요소의 맨윗지점을 나타낸다. 예를들어 높이 100짜리요소 10개가 있으면 각 요소의 top값은 맨 위부터

0, 100, 200, 300..이 되고 스크롤을 해서 두번째 요소를 현재 브라우저의 꼭대기에 위치시켰으면 -100, 0, 100, 200, 300으로 계산된다.

내가 필요한 구간은 각 요소들이 현재 브라우저상에 위치하는지를 확인해야한다.

top이 툴바 높이를 제외한 순수 윈도우크기(window.innerHeight)내에 있는지 체크해서 안에 있다면 이미지 src에 값을 주는 방식으로 진행한다. => **(top <= window.innerHeight)**





### 구현

```js
class Lazyload {
  API_URL = "https://dummyapi.io/data/api";
  APP_KEY = "5ff574fb2b98d0966946eb3a";
  // https://img.dummyapi.io/photo-1564694202779-bc908c327862.jpg
  constructor($target) {
    this.$target = $target;
    this.$imageWrapper = document.createElement("div");
    this.$imageWrapper.className = "wrapper";
    this.data = [];
    this.imageAPI();
    // this.bindEvent();
  }

  lazyLoadHandler() {
    let lazyImages = Array.prototype.slice.call(
      document.body.querySelectorAll(".image")
    );

    const lazyLoad = () => {
      console.log("load");

      lazyImages.forEach((image, index) => {
        let imageTop = image.getBoundingClientRect().top;
        let windowHeight = window.innerHeight;
        if (
          imageTop <= windowHeight &&
          image.getAttribute("data-src")
        ) {
          const src = image.dataset.src; // img 태그의 data-lazy에 저장해둔 이미지 경로를 붙여준다.
          image.setAttribute("src", src);
          image.removeAttribute("data-src");
        }
      });
    };
    lazyLoad();
    document.addEventListener("scroll", lazyLoad);
    window.addEventListener("resize", lazyLoad);
    window.addEventListener("orientationchange", lazyLoad);
  }
  async imageAPI() {
    const response = await fetch(this.API_URL + "/post", {
      headers: { "app-id": this.APP_KEY },
      method: "GET",
    }).then((result) => result.json());
    await this.render(response.data);
    this.lazyLoadHandler();
  }
  render(response) {
    this.$target.appendChild(this.$imageWrapper);
    this.$target.innerHTML = response
      .map((data) => {
        return `<img class="image" data-src=${data.image}></img>`;
      })
      .join("");
    this.data = document.querySelectorAll(".image");
  }
}
new Lazyload(document.querySelector("#App"));

```

- 현재 `lazyLoad`함수를 스크롤 또는 이벤트마다 호출하고 있는데 쓰로틀링 및 디바운싱을 배우고 적용해봐야겠다.



### 이슈..였던 것

- 이미지를 출력하는데 이미지 사이사이에 ","값이 같이 나왔었다.

- ```js
      this.$target.innerHTML = response
        .map((data) => {
          return `<img class="image" data-src=${data.image}></img>`;
        })
        .join("");
  ```

  `map`의 반환을 문자열로 하면 구분되는 지점마다 ","이 같이 출력되는 경우였기에 join으로 묶음!

- 카카오 검색 API 써보려고 했다가 ajax로 하길래 fetch로 시도했지만 음,, 계속 헤매가지고 나중에 다시 해보기로 결정. => 검색기능이 사실 필요가 없어서..

  





![화면 기록 2021-01-06 오후 11 11 02-1](https://user-images.githubusercontent.com/55486644/103778315-6b81da80-5075-11eb-94db-7cf87d48a3b5.gif)

##### 참고

- [쉼표출력](https://velog.io/@takeknowledge/map%EC%9D%84-%EC%82%AC%EC%9A%A9%ED%96%88%EB%8A%94%EB%8D%B0-%EC%9D%98%EB%8F%84%ED%95%98%EC%A7%80-%EC%95%8A%EC%9D%80-%EC%89%BC%ED%91%9C%EA%B0%80-%EC%B6%9C%EB%A0%A5%EB%90%9C%EB%8B%A4%EB%A9%B4)
- [레이지로딩기법](https://krpeppermint100.medium.com/js-%EB%A0%88%EC%9D%B4%EC%A7%80-%EB%A1%9C%EB%94%A9-%EA%B8%B0%EB%B2%95-5e3d5dfcb4c1)
- [참고코드](https://blog.naver.com/dilrong/221544559266)
- [디바운싱, 쓰로틀링](https://webclub.tistory.com/607)

