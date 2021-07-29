function solution(n, m, k, arr) {
  arr = arr.sort((a, b) => b - a);
  let first = arr[0];
  let second = arr[1];
  let answer = 0;
  let idx = 0;
  let i = 0;
  while (idx < m) {
    for (let j = 0; j < k; j++) {
      if (idx < m) {
        if (i % 2 === 0) {
          answer += arr[0];
        }
        if (i % 2 === 1) {
          answer += arr[1];
          idx++;
          break;
        }
      }
      idx++;
    }
    i++;
  }
  return answer;
}

console.log(solution(5, 7, 2, [3,4,3,4,3]));
