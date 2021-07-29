const solution = (array, n) => {

  let dp = new Array(100).fill(0);

  dp[0] = array[0];
  dp[1] = Math.max(array[0], array[1]);
  for (let i = 2; i < 100; i++){
    dp[i] = Math.max(dp[i - 1], dp[i - 2] + array[i]);
  }
  return dp[n - 1];
}



console.log(solution([4,0,1,5], 4));
