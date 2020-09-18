const secondHand = document.querySelector(".second-hand");
const minHand = document.querySelector(".min-hand");
const hourHand = document.querySelector(".hour-hand");

const clockHour = document.querySelector(".hour");
const clockMin = document.querySelector(".min");
const clockSecond = document.querySelector(".second");

function setTime() {
  const now = new Date();
  let second = now.getSeconds();
  let min = now.getMinutes();
  let hour = now.getHours();
  //각도계산
  //초기 위치에서 90도 이미 이동했으니 offset을 맞춰주기 위해 90추가
  let secondDegree = (second / 60) * 360 + 90;
  secondHand.style.transform = `rotate(${secondDegree}deg)`;

  let minDegree = (min / 60) * 360 + 90;
  minHand.style.transform = `rotate(${minDegree}deg)`;

  let hourDegree = (hour / 60) * 360 + 90;
  hourHand.style.transform = `rotate(${hourDegree}deg)`;

  clockHour.innerHTML = `${hour}` + ":";

  clockMin.innerHTML = `${min}` + ":";
  clockSecond.innerHTML = `${second}`;
}

setInterval(setTime, 1000);
