## JS30 Day08 Fun with HTML5 Canvas



### 요구사항

- `canvas` 요소를 사용해 그림판을 만듦

### 선수지식

- `canvas`요소 사용



### Canvas

- `width, height`요소만 존재
- 고정크기의 드로잉 영역을 생성하고 하나 이상의 **랜더링 컨텍스트**를 노출해 컨텐츠를 생성, 출력함
- `getContext()`를 이용해 그리기 함수를 사용할 수 있음





#### 코드



```javascript
const canvas = document.querySelector('#draw');
const ctx = canvas.getContext('2d');
//canvas 고정영역 설정
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
//그리는 색상설정
ctx.strokeStyle = '#BADA55';
//둥근 모서리
ctx.lineJoin ='round';
//끝 부분이 둥글도록 설정
ctx.lineCap ='round';
ctx.lineWidth = 100;

//그려지고 있는지 확인하는 플래그
let isDrawing = false;

//그리기를 종료했을 때의 지점을 갖는 변수
let lastX = 0;
let lastY = 0;
let hue = 0;
let direction = true;

function draw(e){
    //mouseDown이 아닐 때 그리기 종료-> mouseDown일 때만 그리기
    if(!isDrawing) return;
    ctx.strokeStyle = `hsl(${hue},100%, 50%)`;
    ctx.beginPath();
    //lastX, lastY시작점으로 부터 offset까지 선을 그린다.
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    [lastX, lastY] = [e.offsetX, e.offsetY];
    hue += 1;
    if(hue >= 360){
        hue = 0;
    }
    if (ctx.lineWidth >= 100 || ctx.lineWidth <= 1){
        direction = !direction;
    }
    if(direction)
        ctx.lineWidth++;
    else
        ctx.lineWidth--;
}

canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    //마우스 가 눌렸을 때  last위치를 현재 클릭 위치로 업데이트
    [lastX, lastY] = [e.offsetX, e.offsetY];
});
canvas.addEventListener('mousemove', draw);
//click 이벤트가 발생할 때 함께 호출되는 이벤트들
canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('click', () => isDrawing = false);

```

