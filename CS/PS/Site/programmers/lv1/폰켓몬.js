//중복제거, 가질 수 있는 갯수 nums.length / 2
//If 중복제거된 배열 길이가 가질수있는 갯수보다 작거나 같을 때 배열 길이 리턴
//배열길이가 가질수있는 갯수보다 크면, 가질수있는 갯수 리턴
function solution(nums) {
  var answer = 0;
  let numsLength = nums.length;
  const maxHavingPocketMon = Math.floor(numsLength / 2);

  let set = new Set();
  nums.forEach((num) => {
    set.add(num);
  });
  if(set.size <= maxHavingPocketMon){
    return set.size;
  } else{
    return maxHavingPocketMon;
  }
}

console.log(solution([3,1,2,3]));
console.log(solution([3,3,3,2,2,4]));
console.log(solution([3,3,3,2,2,2]));
