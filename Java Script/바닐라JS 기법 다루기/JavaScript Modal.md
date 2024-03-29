# 바닐라 JS 모달 작성

---

> 모달창 생성구현



모달은 팝업이랑 다르게 현재 페이지 위에 새로운 **레이어**이다.



흔히 보듯 어떤 이미지 클릭하면 뒤로 흐리게 표시되고 그 이미지가 페이지 이동없이 확대되는 그런 창을 뜻한다.



구현에는 여러 방법이 있겠지만 나는 `display none <->block`으로 생겼다 없어졌다하는 방법과 `z-index`로 구현해보았다.





### display none <-> block

모달창을 미리 화면에 그려넣고 해당 속성을 none으로 주게되면 해당 요소가 랜더트리에 포함되지 않는다. 따라서 none에서 다른 속성으로 바꾸게 되면 (또는 그 반대의 경우에도) 요소의 위치 및 크기를 계산하는 리 플로우,  요소를 화면에 그리는 리페인트과정이 수행된다.

##### 트랜지션 적용 불가

`transition`은 어떤 속성값이 변경될 때, 그 값의 변화가 일정 시간동안 일어나게 해주는 속성이다.

none은 랜더트리에 포함되지 않으므로 block이 되도 랜더트리에 추가되어 다시 그려주는 것 뿐이라서 none에서 block이 되어봤자 새로 생성되는 것일 뿐 어떤 속성의 변화가 생기는 시작점이 존재하지 않는다. 따라서 none->block할 때 트랜지션은 적용할 수 없다.

따라서 이 구현방법으로는 트랜지션을 사용할 수 없으므로, 단순히 모달창을 껐다 켜는 기능만 구현했다.

```js
class Modal {
  $target = null;
  constructor($target) {
    this.$target = $target;

    console.log($target);
    this.$modalBtn = document.createElement("button");
    this.$modalBg = document.createElement("div");
    this.$modalWindow = document.createElement("div");
    this.$modalClose = document.createElement("div");

    this.$modalBtn.innerText = "Modal Open";
    this.$modalBtn.className = "btn-modal-open";
    this.$modalBg.className = "modal-bg";
    this.$modalWindow.className = "modal-window";
    this.$modalClose.innerText = "X";

    this.render();
    this.hide();
  }

  show() {
    this.$modalBg.style.display = "block";
    this.$modalWindow.style.display = "block";
    console.log("hi");
  }
  hide() {
    this.$modalBg.style.display = "none";
    this.$modalWindow.style.display = "none";
  }
  bindEvent() {
    this.$modalBtn.addEventListener("click", (e) => {
      this.show();
    });
    this.$modalClose.addEventListener("click", (e)=>{
      this.hide();
    })
    window.addEventListener("click", (e) => {
      if (e.target == this.$modalBg) {
        this.hide();
      }
    });
    window.addEventListener("keydown", (e) => {
      if (e.keyCode == 27 && this.$modalBg.style.display === "block") {
        this.hide();
      }
    });
  }
  render() {
    this.$target.appendChild(this.$modalBtn);
    this.$target.appendChild(this.$modalBg);
    this.$modalBg.appendChild(this.$modalWindow);
    this.$modalWindow.appendChild(this.$modalClose);
    this.bindEvent();
  }
}

new Modal(document.querySelector("#App"));

```



```css
 #App {
        max-width: 1200px;
      }
      .modal-bg {
        position: fixed;
        width: 100%;
        left: 0;
        top: 0;
        height: 100vh;
        background-color: rgba(0, 0, 0, 0.5);
        transition: opacity .5s;
      }
      .modal-window {
        position: absolute;
        width: 50%;
        height: 50%;
        left: 50%;
        top: 50%;
        background-color: #ffffff;
        transform: translate(-50%, -50%);
        transition: opacity .5s;
      }
      .modal-bg.unstaged {
        top: -100%;
      }
      .modal-bg.open {
        opacity: 1;
        z-index: 0;
      }
      .modal-window.open{
        opacity: 1;
      }
      .testbox{
        width: 100px;
        height: 100px;
        opacity: 0;
        background-color: rgba(0, 0, 0, 0.5);
        transition: opacity .5s;;
      }
      .test-open{
        opacity: 1;
      }
```





### none을 애니메이션으로 fade in ,out 구현

```js
show() {
    this.$modalBg.style.display = "block";
    this.$modalWindow.style.display = "block";
    this.$modalBg.classList.add("appear");
    this.$modalBg.classList.remove("disappear");
  }
  hide() {
    this.$modalBg.style.display = "none";
    this.$modalWindow.style.display = "none";
  }
  bindEvent() {
    this.$modalBtn.addEventListener("click", (e) => {
      this.show();
    });
    this.$modalClose.addEventListener("click", (e) => {
      let thisScope = this;
      this.$modalBg.classList.add("disappear");

      setTimeout(function () {
        thisScope.$modalBg.classList.remove("appear");
        thisScope.hide();
      }, 1001);
    });
    window.addEventListener("click", (e) => {
      if (e.target == this.$modalBg) {
        let thisScope = this;

        this.$modalBg.classList.add("disappear");
        setTimeout(function () {
          thisScope.$modalBg.classList.remove("appear");
          thisScope.hide();
        }, 1001);
      }
    });
    window.addEventListener("keydown", (e) => {
      if (e.keyCode == 27 && this.$modalBg.style.display === "block") {
        this.$modalBg.classList.add("disappear");
        setTimeout(function () {
          thisScope.$modalBg.classList.remove("appear");
          thisScope.hide();
        }, 1001);
      }
    });
  }
```

애니메이션으로 1초간 opacity 0 => 1로 하고

fade-out시엔 1초 딜레이(1 -> 0으로 될 때까지)시킨 후 appear클래스를 제거하는 방식으로 구현





### z- index, opacity



요소가 겹칠 때 그 순서를 정해주는 속성과 opacity를 이용해 모달창을 표시하거나 가린다.

위 방법과는 다르게 랜더트리에 없는 것이 아닌 **숨김처리**해서 트랜지션을 적용할 수 있도록 한다.

열지않았을 땐 z-index로 배치순서를 맨 뒤로, 열었을 때 맨 앞으로 가져오는 방법을 사용하며 opacity를 0에서 1로, 트랜지션을 적용해서 fadein, out으로 표현한다.



**position 속성이 적용된 요소에서만 작동**

기본적으로 부모위에 자식이 쌓이지만 `z-index`를 사용하면 그 순서를 변경할 수 있다.



현재 모달 배경은 fixed, 윈도우는 absolute로 설정되어 있으므로 둘 다 z-index를 적용해 배치순서를 정할 수 있다.

fixed는 브라우저 대상 상대위치, absolute는 가장 가까운 상위요소 기준으로 위치가 결정된다(position의 static제외), 상위요소가 없으면 html기준.



##### 구현

```js
class Modal {
  $target = null;
  constructor($target) {
    this.$target = $target;

    console.log($target);
    this.$modalBtn = document.createElement("button");
    this.$modalBg = document.createElement("div");
    this.$modalWindow = document.createElement("div");
    this.$modalClose = document.createElement("div");
    this.$contentBtn = document.querySelector(".box-content");
    this.$modalBtn.innerText = "Modal Open";
    this.$modalBtn.className = "btn-modal-open";
    this.$modalBg.className = "modal-bg";
    this.$modalWindow.className = "modal-window";
    this.$modalClose.innerText = "X";
    this.render();
  }
  render() {
    this.$target.appendChild(this.$modalBtn);
    this.$target.appendChild(this.$modalBg);
    this.$modalBg.appendChild(this.$modalWindow);
    this.$modalWindow.appendChild(this.$modalClose);
    this.bindEvent();
  }
  toggling(e) {
    console.log("toggling", e.target);
    this.$modalBg.classList.toggle("open");
    this.$modalWindow.classList.toggle("open");
  }
  bindEvent() {
    this.$contentBtn.addEventListener("click", (e) => {
      console.log("click content button");
    });
    this.$modalBtn.addEventListener("click", (e) => {
      if (e.target == this.$modalBtn) this.toggling(e);
    });

    window.addEventListener("click", (e) => {
      if (
        e.target == this.$modalBg &&
        this.$modalBg.classList.contains("open")
      ) {
        this.toggling(e);
      }
    });

    window.addEventListener("keydown", (e) => {
      if (e.keyCode == 27 && this.$modalBg.classList.contains("open")) {
        this.toggling(e);
      }
    });
    this.$modalClose.addEventListener("click", (e) => {
      this.toggling(e);
    });
  }
}

new Modal(document.querySelector("#App"));

```

```css
.modal-bg {
        position: fixed;
        width: 100%;
        left: 0;
        top: 0;
        height: 100vh;
        background-color: rgba(0, 0, 0, 0.5);
        opacity: 0;
        transition:  1s;
        z-index: -9999;
      }
      .modal-window {
        position: absolute;
        opacity: 0;
        width: 50%;
        height: 50%;
        left: 50%;
        top: 50%;
        background-color: #ffffff;
        transform: translate(-50%, -50%);
        transition: 1s;
      }
      .modal-bg.open {
        opacity: 1;
        z-index: 9999;
      }
      .modal-window.open {
        opacity: 1;
      }
      .testbox {
        width: 100px;
        height: 100px;
        opacity: 0;
        background-color: rgba(0, 0, 0, 0.5);
        transition: 3s;
      }
      .test-open {
        opacity: 1;
      }
      .box {
        width: 100%;
        height: 500px;
        background-color: royalblue;
      }
      .box-content {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 200px;
        height: 200px;
        background-color: salmon;
      }
```



##### 참고

- [display none이 transition이 안되는 이유](https://velog.io/@dev-tinkerbell/display-none%EC%9D%B4-transition%EC%9D%B4-%EC%95%88%EB%A8%B9%ED%9E%88%EB%8A%94-%EC%9D%B4%EC%9C%A0)

- [position 요소](https://electronic-moongchi.tistory.com/26)
- 





