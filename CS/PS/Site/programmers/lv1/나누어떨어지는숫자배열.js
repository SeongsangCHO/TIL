function solution(arr, divisor) {
  var answer = [];
  answer = arr.filter((number )=>{
    return number % divisor === 0;
  }).sort((a,b)=>a-b);
  return answer.length === 0 ? [-1] : answer;
}

console.log(solution([5,9,7,10],5));
console.log(solution([2,36,1,3],1));
console.log(solution([3,2,6],10));
