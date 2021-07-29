function getPermu(arr, selectedNumber) {
  const result = []
  if (selectedNumber === 1) {
    return arr.map((v) => [v]);
  }

  arr.forEach((fixed, index, origin) => {
    const rest = [...origin.slice(0, index), ...origin.slice(index + 1)]
    const permu = getPermu(rest, selectedNumber - 1);
    const attachment = permu.map((per) => [fixed, ...per]);
    console.log(attachment);
    
    result.push(...attachment);
  });
  return result
}

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function (nums) {
  let answer = getPermu(nums, nums.length);
  console.log('sliced', nums.slice(0,0), nums.slice(0,1));
  
  return answer
};

console.log(permute([1, 2, 3]));
