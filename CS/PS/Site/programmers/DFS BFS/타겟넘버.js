function solution(numbers, target) {
  let answer = 0;
  
  const dfs = (numbers, target, sum, index) => {
    if (numbers.length <= index){
      if (sum === target) answer++;
      return;
    }
    dfs(numbers, target, sum + numbers[index], index + 1);
    dfs(numbers, target, sum - numbers[index], index + 1);

  }
  dfs(numbers, target, 0, 0);
  return answer;
}


console.log(solution([1,1,1,1,1], 3));
