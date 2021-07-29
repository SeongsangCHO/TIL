function getPermutation(arr, selectedNumber) {
  const result = [];
  if (selectedNumber === 1) {
    return arr.map((v) => [v]);
  }

  arr.forEach((fixed, index, origin) => {
    const rest = [...origin.slice(0, index), ...origin.slice(index + 1)];
    const permu = getPermutation(rest, selectedNumber - 1);
    const attachment = permu.map((permutation) => [fixed, ...permutation]);
    result.push(...attachment);
  });
  return result;
}
function solution(expression) {
  var answer = 0;
  let prior = ["-", "+", "*"];
  let priorPermutation = getPermutation(prior, 3);
  let arr = expression.split("");
  console.log(priorPermutation);

  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 3; j++) {
      let calIdx = arr.indexOf(priorPermutation[i][j]);
  }
  return answer;
}

console.log(solution("100"));
