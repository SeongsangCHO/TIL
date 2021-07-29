/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var topKFrequent = function (nums, k) {
  let obj = {}
  let answer = []
  for (let i = 0; i < nums.length; i++) {
    if (!(nums[i] in obj)) {
      obj[nums[i]] = 1
    }
    else {
      obj[nums[i]] += 1;
    }
  }
  let arr = Object.entries(obj)
  arr = arr.sort((a, b) => b[1] - a[1]);
  for (let i = 0; i < k; i++) {
    answer.push(parseInt(arr[i][0]))
  }
  return answer
};

console.log(topKFrequent([1, 1, 1, 1, 2, 2, 2, 3, 3, 3, 3, 3, 3], 2));
console.log(topKFrequent([1, 2], 2));