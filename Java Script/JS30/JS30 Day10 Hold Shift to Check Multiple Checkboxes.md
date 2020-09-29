## Day10 Hold Shift to Check Multiple Checkboxes



## 요구사항

- shift 키를 눌러서 체크박스를 지정한 범위까지 체크한다



## 코드

```javascript
const checkboxes = document.querySelectorAll('.inbox input[type="checkbox"');

let lastCheck;

function handleCheck(e) {
  let inBetween = false;
  if (e.shiftKey && this.checked) {
    //현재 shiftkey눌린상태이고
    //현재 이벤트발생구간이 체크되어있는 상태라면
    checkboxes.forEach(checkbox => {
      console.log(checkbox);
      if (checkbox === this || checkbox === lastCheck) {
        inBetween = !inBetween;
      }
      if (inBetween) {
        checkbox.checked = true;
      }
    });
  }
  lastCheck = this;
}

checkboxes.forEach(checkbox =>
  checkbox.addEventListener("click", handleCheck)
);

```

