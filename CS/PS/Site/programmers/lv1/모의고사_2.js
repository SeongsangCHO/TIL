function solution(answers) {
  var result = new Array(3).fill(0);
  const a = [1,2,3,4,5]
  const b = [2,1,2,3,2,4,2,5];
  const c = [3,3,1,1,2,2,4,4,5,5];

  let length = answers.length;
  for(let i = 0; i < length; i ++){
    if (answers[i] === a[i % 5]){
      result[0]++;
    }
    if (answers[i] === b[i % 8]){
      result[1]++;
    }
    if (answers[i] === c[i % 10]){
      result[2]++;
    }
  }
  let maxValue = Math.max.apply(null, result)
  let answer = [];
  for(let [index,value] of result.entries()){
    if (value === maxValue){
      answer.push(index + 1);
    }
  }
  return answer;
}


console.log(solution([1,3,2,4,2]));

