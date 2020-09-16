//이벤트 등록하기
window.addEventListener("keydown", function (e) {
  //keydown이벤트가 발생했을 때, e를 인자로 전달
  // console.log(e.keyCode); //keyCode를 출력
  //audio의 data-key가 ${e.keyCode}에 해당하는 요소 반환
  //백틱으로 ES6부터 새로운 문자열 표기법인 템플릿 리터럴
  const audio = document.querySelector(`audio[data-key="${e.key}"]`);

  //style을 입히기 위해 key 반환
  const key = document.querySelector(`div[data-key="${e.key}"]`);
  if (!audio) return; //해당하는 audio가 없다면 return;
  audio.play(); //audio실행
  audio.currentTime = 0; // 음악이 끝나고가 아닌, 음악의 재생지점 0초부터 시작

  key.classList.add("playing"); //입력된 key에 해당하는 div의 classList에 playing추가
  //다시 이전으로 돌리려면 해당하는 key의 playing을 삭제하면됨
});

//transition이 종료되었을때 호출되는 콜백함수.
function removeTransition(e) {
  //입력된 이벤트의 propertyName이 변경된것이 아니면 return
  if (e.propertyName !== "transform") return;
  //변경된 것들만 처리하도록.
  //해당하는 key객체는 입력된 key의 div
  this.classList.remove("playing");
}

//key라는 클래스를 가진 태그들을 반환해 keys배열에 반환함
const keys = document.querySelectorAll(".key");
//각 태그마다 이벤트리스너 removeTransition을 등록함
//
keys.forEach((key) => key.addEventListener("transitionend", removeTransition));
