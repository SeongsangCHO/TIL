function calMove(name) {
  let arr = name.split("").map((v) => {
    return v.charCodeAt(0) - "A".charCodeAt(0);
  });
  return arr;
}

function sumArr(arr) {
  return arr.reduce((prev, curr) => prev + curr);
}
function solution(name) {
  var answer = 0;
  //움직여야하는 숫자 배열
  let moveArr = calMove(name);
  return answer;
}

console.log(solution("JEROEN"));
