//서로다른 3개 뽑기 => how? 조합
function isPrime(num){
  const sqrt = Math.sqrt(num);
  for (let i = 2; i <= sqrt; i++){
    if(num % i == 0){
      return false;
    }
  }
  return true;
}

function solution(nums) {
  var answer = 0;
  const len = nums.length;
  for(let i = 0; i < len; i++){
    for(let k = i+1; k < len; k++){
      for(let j = k + 1; j < len; j++){
        const sum = nums[i] + nums[k] + nums[j];
        if (isPrime(sum)){
          answer += 1;
        }
      }
    }
  }
  
  return answer;
}

console.log(solution([1,2,3,4]));
console.log(solution([1,2,7,6,4]));
