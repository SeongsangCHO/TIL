function solution(numbers, target) {
  var answer = 0;
  const dfs = (n, t, s, i) => {
    if (n.length <= i) {
      if (s === t) {
        answer++;
      }
      return;
    }
    dfs(n, t, s + n[i], i+1);
    dfs(n, t, s - n[i], i+1);
  };
  dfs(numbers, target, 0, 0);
  return answer;
}

console.log(solution([1, 1, 1, 1, 1]), 3);
