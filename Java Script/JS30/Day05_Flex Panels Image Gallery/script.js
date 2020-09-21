const panels = document.querySelectorAll('.panel');


function toggleOpen(){
    this.classList.toggle('open');
}

function toggleActive(e){
    //panel의 변화(트랜지션, 폰트 사이즈 및 flex값 변화)가 끝난 뒤
    //발생하는 이벤트
    if(e.propertyName.includes('flex'))
        this.classList.toggle('open-active');
}

panels.forEach(panel => panel.addEventListener('click',toggleOpen));
panels.forEach(panel => panel.addEventListener('transitionend',`toggleActive));`