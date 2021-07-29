function solution(d, budget) {
  var answer = 0;
  let sum = 0;
  d = d.sort((a, b) => a - b);
  const len = d.length;
  for (let i = 0; i < len; i++) {
    if (sum < budget) {
      sum += d[i];
      if (sum > budget) {
        return answer;
      }
      answer++;
    }
  }
  return answer;
}

console.log(solution([1, 3, 2, 5, 4], 9));
