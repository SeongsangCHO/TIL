function getCombine(arr, selectedNumber) {
  if (selectedNumber === 1) {
    return arr.map((v) => [v]);
  }
  const result = [];
  arr.forEach((fixed, index, origin) => {
    const rest = origin.slice(0, index);
    const combines = getCombine(rest, selectedNumber - 1);
    const attachment = combines.map((combine) => [fixed, ...combine]);
    result.push(...attachment);
  });
  return result;
}

/**
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 */
var combine = function (n, k) {
  let arr = Array(n).fill(0).map((_, idx) => idx + 1);
  console.log(arr);
  const answer = getCombine(arr, k);
  return answer;
};

console.log(combine(4, 2));
