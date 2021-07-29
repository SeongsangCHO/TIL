const handShake = 59;

const solution = (handShake) => {

  let answer = 0;
  let sum = 0;
  let n = 1;
  let tmp = 0;
  while(sum <= handShake){
    sum = ((n-1) * n) / 2;
    if (sum >= handShake)
      break;
    n++;
    tmp = sum;
  }
  console.log(tmp, n);
  return [handShake - tmp, n];
}

console.log(solution(handShake));
