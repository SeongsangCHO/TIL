function solution(n, k) {
  let answer = 0;
  while (n !== 1) {
    if (n % k === 0) {
      n /= k;
      answer++;
    } else {
      let nmg = n % k;
      n -= nmg;
      if (n === 0) {
        answer += nmg - 1;
        break;0.
      }
      answer += nmg;
    }
  }
  return answer;
}

console.log(solution(28, 5));
console.log(solution(25, 5));
console.log(solution(17, 4));
