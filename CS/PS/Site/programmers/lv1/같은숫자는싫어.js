function solution(arr)
{
    var answer = [];
    
    for(let value of arr){
      if(answer[answer.length - 1] !== value){
        answer.push(value);
      } else{
        continue;
      }
    }
    
    return answer;
}

console.log(solution([1,1,3,3,0,1,1]));
console.log(solution([4,4,4,3,3]));
