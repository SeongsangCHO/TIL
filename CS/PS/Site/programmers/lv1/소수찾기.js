function solution(n) {
  let array = new Array(n + 1).fill(true);
  let last = Math.floor(Math.sqrt(n));
  console.log(last);

  for (let i = 2; i <= last; i++) {
    if (array[i]) {
      for (let k = i + i; k <= n; k += i) {
        array[k] = false;
      }
    }
  }
  return array.slice(2).filter((prime) => prime === true).length;
}
console.log(solution(10));
