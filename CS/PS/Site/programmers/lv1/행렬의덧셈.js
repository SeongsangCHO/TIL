function solution(arr1, arr2) {
  var answer = [[]];
  answer = arr1;
  const length = arr1.length;
  const colLength = arr1[0].length;

  for(let i = 0; i < length; i++){
    for(let k = 0; k < colLength; k++){
      answer[i][k] = arr1[i][k] + arr2[i][k];
    }
  }
  return answer;
}


console.log(solution([[1,2],[2,3]], [[3,4],[5,6]]));
console.log(solution([[1],[2]], [[3],[4]]));
