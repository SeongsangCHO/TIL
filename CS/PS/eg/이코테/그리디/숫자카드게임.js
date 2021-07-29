function solution(arr) {
  let row = arr.length;
  let col = arr[0].length;
  let min = 0;
  for (let i = 0; i < row; i++) {
    let rowMin = Math.min(...arr[i]);
    if (rowMin > min) {
      min = rowMin;
    }
  }
  return min;
}

console.log(
  solution([
    [3, 1, 2],
    [4, 1, 4],
    [2, 2, 2],
  ])
);
console.log(
  solution([
    [7,3,1,8],
    [3,3,3,4],
  ])
);
