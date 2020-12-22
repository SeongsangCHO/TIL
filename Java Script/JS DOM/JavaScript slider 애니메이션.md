# JavaScript slider 애니메이션

---

버튼 클릭시 내용을 접거나, 펼칠 수 있게 한다.



### 구현

버튼이벤트를 등록하고, `classList`에  애니매이션을 추가한다.

`height`를 0px ~ 특정 px까지 늘렸다가 줄일 것이므로 요소를 감싸고있는 태그에서 0px로 줄였을 시 컨테이너 범위를 초과해 그리는 것을 방지하기 위해 `overflow: hidden`속성을 추가한다.





```html
<body>
  <div id = "box" class="slider">Show / Hide</div>
  <button onclick="slideToggle('box');">Slide</button>

  <script>
    function slideToggle(el) {
      var elem = document.getElementById(el);
      elem.classList.toggle("open");
    }
  </script>
</body>
```

```css
body{
  background:grey;
}
#box{
  width:400px;
  background:orange;
  margin:0 auto;
  margin-top:3%;
  overflow:hidden;
}
.slider {
    transition:all 2s ease-in-out;
    height:0px;
}
.slider.open {
    height:400px;
}
```

