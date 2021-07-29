function solution(numbers) {
  let numberSet = new Set();
  for (let i = 0; i < numbers.length; i++){
    for(let j = i + 1; j < numbers.length; j++){
      numberSet.add(numbers[i] + numbers[j]);
    }
  }
  return Array.from(numberSet).sort((a,b) => a-b);
}

console.log(solution([2,1,3,4,1]));
