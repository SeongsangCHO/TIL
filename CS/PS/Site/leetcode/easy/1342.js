/**
 * @param {number} num
 * @return {number}
 */

 //짝수면 2로나누고 홀수면 !빼셈
 //0이될때까지 그 단계수를 return
var numberOfSteps = function (num) {
  let answer = 0;

  while (num != 0) {
    num % 2 == 0 ? num = num / 2 : num--;
    answer++;
  }
  return answer;
};

console.log(numberOfSteps(123));
