/**
 * @param {number[]} nums
 * @param {number} n
 * @return {number[]}
 */

 /*배열의 길이는 짝수
 주어진 n만큼 섞어라 짝, 홀수
 length만큼 반복문을 돌리고,
 0~ n까지, n ~ length - 1까지 
 push
 0 3 1 4 2 5
 */
var shuffle = function(nums, n) {
  let answer = [];
  let cot = nums.slice(n);
  
  for (let i = 0; i < nums.length - n; i++) {
    answer.push(nums[i], cot[i]);
  }
  return answer;
};

console.log(shuffle([2,5,1,3,4,7], 3));
