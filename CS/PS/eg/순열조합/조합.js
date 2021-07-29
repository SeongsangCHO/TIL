function solution(arr, selectNumber){
  let result = [];
  //재귀로 선택숫자가 1일때 
  if (selectNumber == 1){
    return arr.map((v) => [v]);
  }
  arr.forEach((fixed, index, origin) => {
    const rest = origin.slice(index + 1);
    const combinations = solution(rest, selectNumber - 1);
    const attached = combinations.map((combination) => [fixed, ...combination]);
    result.push(...attached);
  });
  return result;
}

const example = [1,2,3,4];
//4개중에서 3개의 조합을 찾도록.
console.log(solution(example, 2));
