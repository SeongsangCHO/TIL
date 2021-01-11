/*
(this)호출할 때 결정되는 것과 
(클로져)위치에 따라 결정되는 것이 있음
호출할 때 결정되는 this.
호출한 객체가 바로 this가 됨.
호출과 무관하게 고정할 수 있는 것이 bind 메소드
*/

let sometwo = {
  name : "kukim",
  whoAmI : function(){
    console.log(this);
  }
}

let someone = {
  name : "secho",
  whoAmI : function (){
    console.log(this);
  }
}

let arrow = {
  name : "arrow",
  whoAmI :  () => {
    console.log(this);
    setTimeout(function() {
      console.log(this);
    }, 1000);
  }
}

function Person() {
  this.age = 0;
  setInterval(() => {
    this.age++;
    console.log(this.age);
  },1000);
}
// someone. <-함수가 호출한 직접적인 부분이므로 this = 자신이 됨
// someone.whoAmI();
arrow.whoAmI();

let p = new Person();

let myWhoAmI = someone.whoAmI;
// myWhoAmI는 window에 있어서 this -> window가 됨
// myWhoAmI(); // window가 나옴 : 호출하는 방법이 달라졌기 때문



//바인드시키면 누가 호출했든 고정되어버림
let bindedWhoAmI = myWhoAmI.bind(someone);


/* <- 바인드 되었기 때문에 btn객체가 함수를 호출해도 이 함수의 this는 someone.
btn.addEventListener('click', bindedWhoAmI);
-> someone객체가 this가 됨. 
bind는 호출하는 방법이 어떻게 되었든 bind로 묶인 애가 this가 됨
*/ 
/*
btn.addEventListener('click', someone.whoAmI);
이를 호출했을 때 버튼객체를 반환함.
누가 호출했는지가 중요함. whoAmI함수를 btn에게 전달한 것.
btn이 실행 주체
*/