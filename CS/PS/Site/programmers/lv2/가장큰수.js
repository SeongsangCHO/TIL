function solution(numbers) {
  var answer = "";
  //제일 앞자리 순으로 정렬
  numbers = numbers.sort((a, b) => {
    a = a.toString();
    b = b.toString();
    return b + a - (a + b);
  });
  return numbers.join("").replace(/^0+/,'0');
}

console.log(solution([0, 0, 0, 0, 0]));
console.log(solution([6, 10, 2]));
console.log(solution([3, 30, 34, 5, 9]));
