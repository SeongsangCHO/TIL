/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum = function (candidates, target) {
  const result = [];
  function dfs(tmp, csum) {
    if (csum < 0) {
      return;
    }
    if (csum === 0) {
      let sorted = [...tmp];
      sorted = sorted.sort();
      for (let i of result) {
        i = i.sort()
        if (sorted.join(",") === i.join(",")) {
          return;
        }
      }
      result.push([...tmp]);
      return;
    }
    for (let i = 0; i < candidates.length; i++) {
      tmp.push(candidates[i]);
      dfs(tmp, csum - candidates[i]);
      tmp.pop();
    }
  }
  dfs([], target);
  return result;
};

// console.log(combinationSum([2, 3, 6, 7], 7));
console.log(combinationSum([2, 3, 5], 8));
console.log(combinationSum([2, 7, 6, 3, 5, 1], 9));
