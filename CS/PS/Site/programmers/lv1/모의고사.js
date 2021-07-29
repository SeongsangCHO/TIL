function solution(answers) {
  var answer = [];
  const a1 = [1, 2, 3, 4, 5];
  const a2 = [2, 1, 2, 3, 2, 4, 2, 5];
  const a3 = [3, 3, 1, 1, 2, 2, 4, 4, 5, 5];

  let countAnswer = Array(3).fill(0);
  let index = 0;
  for (let answer of answers){
    if(answer == a1[index % 5]){ countAnswer[0]++;}
    if(answer == a2[index % 8]){ countAnswer[1]++;}
    if(answer == a3[index % 10]){ countAnswer[2]++;}
    index++;
  }
  let maxValue = Math.max(...countAnswer);
  countAnswer.forEach((value, idx) => {
    if(value == maxValue)
    answer.push(idx + 1);
  });
    
  return answer;
}

console.log(solution([1,3,2,4,2]));
