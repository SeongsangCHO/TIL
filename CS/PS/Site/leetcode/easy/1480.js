/**
 * @param {number[]} nums
 * @return {number[]}
 */
var runningSum = function (nums) {
  let answer = [];
  answer.push(nums[0]);
  nums.forEach((value, index) => { 
    
    if (index != 0)
      answer.push(value + answer[index - 1]);
  });
  return answer;
};



console.log(runningSum([1,2,3,4,5]));
