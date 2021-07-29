function solution(number, k) {
  var answer = "";
  const stack = [];
  for (let i = 0; i < number.length; i++) {
      while (k > 0 && stack[stack.length - 1] < number[i]) {
        stack.pop();
        k--;
      }
    stack.push(number[i]);
  }

  return stack.slice(0, number.length - k + 1).join("");
}

console.log(solution("987654321", 8));
