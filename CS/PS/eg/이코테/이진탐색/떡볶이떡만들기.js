const sliceCake = (arr, standard) => {
  arr = arr.filter((value) => value - standard > 0);
  return arr.reduce((prev, curr) => {
    return prev + curr - standard;
  }, 0);
};

const solve = (arr, n, k) => {
  let max = Math.max(...arr);
  let start = 0;
  let end = max;
  let mid;
  while (start <= end) {
    mid = Math.floor((start + end) / 2);
    if (k === sliceCake(arr, mid)) return mid;
    else if (k > sliceCake(arr, mid))
    end = mid - 1;
    else 
    start = mid + 1;
  }
  return mid;
};
let arr = [19, 15, 10, 15];
console.log(solve(arr, 4, 6));
