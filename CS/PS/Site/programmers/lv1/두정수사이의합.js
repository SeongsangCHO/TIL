function solution(a, b) {
  var answer = 0;
  const length = Math.abs(a - b) + 1;
  let tmp;
  if (a === b){
    return a;
  }
  if(a > b){
    tmp = a;
    a = b;
    b = tmp;
  }
  for (let i = 0; i < length; i++) {
    answer += a;
    a+=1;
  }

  return answer;
}

console.log(solution(1,10));
