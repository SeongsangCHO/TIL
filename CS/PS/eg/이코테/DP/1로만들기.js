const solution = (n) => {
  let dp = new Array(30001).fill(0);

  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + 1;
    if (i % 2 == 0) dp[i] = Math.min(dp[i], dp[Math.floor(i / 2)] + 1);
    if (i % 3 == 0) dp[i] = Math.min(dp[i], dp[Math.floor(i / 3)] + 1);
    if (i % 5 == 0) dp[i] = Math.min(dp[i], dp[Math.floor(i / 5)] + 1);
  }
  return dp[n];
};

console.log(solution(15));
