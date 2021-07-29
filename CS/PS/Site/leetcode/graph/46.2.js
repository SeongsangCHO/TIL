/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function (nums) {
  let visited = Array(nums.length).fill(false);
  let result = [];
  let tmp = [];
  function dfs() {
    if (tmp.length === nums.length) {
      result.push([...tmp]);
      return;
    }
    for (let i = 0; i < nums.length; i++) {
      if (visited[i] === true) continue;
      visited[i] = true;
      tmp.push(nums[i]);
      dfs();
      tmp.pop();
      visited[i] = false;
    }
  }
  dfs()
  return result;
};
console.log(permute([1, 2, 3]));
console.log(permute([0, 1]));
