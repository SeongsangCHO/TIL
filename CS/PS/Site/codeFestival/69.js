const solution = (n) => {
  let prime = [];
  for(let i = 3; i <= n; i++){//n까지의 소수를 구하는 것
    let cnt = 0;
    for(let n=1; n <= i / 2; n++){
      if (i % n == 0) { cnt++; }
      if (cnt > 2) { break; }
    }
    if (cnt == 1) prime.push(i);
  }
  let idx = 0;
  let answer = [];
  for (let i of prime){
    if (prime.includes(n - i)){
      answer.push([i, n - i]);
    }
    if (idx > Math.floor(prime.length / 2)){break;}
    idx++;
  }
  return [answer[0], answer.pop()];
}

console.log(solution(10000));
