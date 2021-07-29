function solution(numbers) {
  var answer = [];
  let answerSet = new Set();

  const numbersLength = numbers.length;

  for(let i = 0; i < numbersLength; i++){
    for(let j = i + 1; j < numbersLength; j++){
      if(!answerSet.has(numbers[i] + numbers[j])){
        answerSet.add(numbers[i] + numbers[j]);
      }
    }
  }
  answer = Array.from(answerSet);
  
  return answer.sort((a,b) => a - b);
}



console.log(solution([2,1,3,4,1]));
